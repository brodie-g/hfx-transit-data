import {TransitRoute} from './TransitRoute';
import {TransitStop} from './TransitStop';
import {Feature, FeatureCollection, GeoJSON} from 'geojson';

interface TransitRouteLookup {
    [key: number]: TransitRoute;
}

interface TransitStopLookup {
    [key: number]: TransitStop;
}

export class TransitRoutePassengerData {
    constructor(public routeNumber: string,
                public routeName: string,
                public dates: string,
                public ridership: number,
                ) {
    }
}

export class TransitSystem {
    static getRoutes(geoJSON: FeatureCollection) {
        // go through the geoJSON
        return geoJSON.features.reduce((routes: object, feature: Feature) => {
            const routeNum = feature.properties.ROUTE_NUM;

            routes[routeNum] = new TransitRoute(routeNum.toString(), feature);

            return routes;
        }, {});
    }

    /**
     * Take the route lookup and return a list of `TransitRoutes sorted
     * @param routes
     */
    static getRouteList(routes: TransitRouteLookup): TransitRoute[] {
        return Object.values(routes).sort((a: TransitRoute, b: TransitRoute) => {
            return a.id.localeCompare(b.id, undefined, {numeric: true, sensitivity: 'base'});
        });
    }

    /**
     * Filter a geoJSON representation of transit routes by
     * @param filterRoutes
     * @param routes
     */
    static getFilteredRoutes(routes: TransitRoute[]) {
        return routes.map((route) => route.feature);
    }

    city: string = '';
    geoJSON: object = {};
    routes: TransitRouteLookup = {};
    routeList: TransitRoute[];
    stops: TransitStopLookup = {};
    passengerData: TransitRoutePassengerData[] = [];

    constructor(geoJSON: FeatureCollection) {
        this.geoJSON = geoJSON;

        // do some parsing
        const routes: TransitRouteLookup = TransitSystem.getRoutes(geoJSON);

        this.routeList = TransitSystem.getRouteList(routes);
        this.routes = routes;
    }

    addPassengerData(passengerData: TransitRoutePassengerData[]) {
        const passengerRouteData = passengerData.reduce((passengerRoutes, passengerRouteDatum: TransitRoutePassengerData) => {
            const routeNum = passengerRouteDatum.routeNumber;

            if (!(routeNum in passengerRoutes)) {
                passengerRoutes[routeNum] = [];
            }
            passengerRoutes[routeNum].push(passengerRouteDatum);
            return passengerRoutes;
        }, {});

        // add the ridership data to the routes
        Object.keys(passengerRouteData).forEach((routeNum) => {
            if (routeNum in this.routes) {
                this.routes[routeNum].addRidershipData(passengerRouteData[routeNum]);
            }
        });

        this.passengerData = passengerData;

        return null;
    }
}
