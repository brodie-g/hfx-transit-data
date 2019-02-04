import http from 'axios';
import {TransitSystem} from '../models/TransitSystem';

export async function getTransitRoutes() {
    const geojsonRes = await http.get('/data/halifax-transit-routes.geojson');
    return geojsonRes.data;
}

export async function getTransitRoutePassengers() {
    const passengersRes = await http.get('/data/halifax-transit-route-passengers.geojson');
    return passengersRes.data;
}

export async function getTransitSystem() {
    const geoJSON = await getTransitRoutes();
    const passengerData = await getTransitRoutePassengers();

    const system = new TransitSystem(geoJSON);
    system.addPassengerData(passengerData);

    return system;
}
