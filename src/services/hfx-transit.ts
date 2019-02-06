import http from 'axios';
import {TransitSystem} from '../models/TransitSystem';

const dataEndpoints = {
    ROUTES: 'https://opendata.arcgis.com/datasets/e3b2bfdd61154176822c00602504c950_0.geojson',
    PASSENGERS: 'https://opendata.arcgis.com/datasets/913b0ec9a2994df7ac6ae58357ce8117_0.geojson',
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
    system.addPassengerData(passengerData);

    return system;
}
