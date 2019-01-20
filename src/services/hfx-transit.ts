import http from 'axios';

export async function getBusRoutes() {
    const geojsonRes = await http.get('/data/halifax-bus-routes.geojson');
    const geojson = geojsonRes.data;

    return { geojson };
}

export function getBusRoutePassengers() {
    return http.get('/data/halifax-bus-route-passengers.json');
}
