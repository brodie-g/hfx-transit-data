import http from 'axios';
import {TransitSystem} from '../models/TransitSystem';

export async function getTransitRoutes() {
    const geojsonRes = await http.get('/data/halifax-transit-routes.geojson');

    return geojsonRes.data;
}

export function getTransitRoutePassengers() {
    return http.get('/data/halifax-transit-route-passengers.geojson');
}

export async function getTransitSystem() {
    const geoJSON = await getTransitRoutes();

    return new TransitSystem(geoJSON);
}
