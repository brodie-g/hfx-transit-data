import http from 'axios';

export async function getTransitRoutes() {
    const geojsonRes = await http.get('/data/halifax-transit-routes.geojson');

    return geojsonRes.data;
}

export function getTransitRoutePassengers() {
    return http.get('/data/halifax-transit-route-passengers.json');
}
