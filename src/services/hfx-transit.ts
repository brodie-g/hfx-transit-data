import http from 'axios';
import {TransitSystem, TransitRoutePassengerData} from '../models/TransitSystem';

const dataEndpoints = {
    ROUTES: 'https://opendata.arcgis.com/datasets/69adb7a88a4e4343bf5ae7c381f2d9af_0.geojson',
    PASSENGERS: 'https://opendata.arcgis.com/datasets/a0ece3efdc7144d69cb1881b90cd93fe_0.geojson',
};

export async function getTransitRoutes() {
    // get route data from the API
    const geojsonRes = await http.get(dataEndpoints.ROUTES);

    return geojsonRes.data;
}

export async function getTransitRoutePassengers() {
    // get the passenger data from the API
    const passengersRes = await http.get(dataEndpoints.PASSENGERS);

    return passengersRes.data;
}

export async function getTransitSystem() {
    // run API calls in parallel. TODO: error handling
    const [geoJSON, passengerData] = await Promise.all([getTransitRoutes(), getTransitRoutePassengers()]);

    const system = new TransitSystem(geoJSON);
    system.addPassengerData(passengerData.features.map((datum) => new TransitRoutePassengerData(
        datum.properties.Route_Number,
        datum.properties.Route_Name,
        datum.properties.Week_Range,
        datum.properties.Ridership_Total,
    )));

    return system;
}
