<template>
    <div>
        <div id="transit-route-map-container">
            <div id="transit-route-map"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
    import { map, LayerGroup, GeoJSON, Map } from 'leaflet';
    import * as geojson from 'geojson';

    import * as L from 'leaflet';
    import { GestureHandling } from "leaflet-gesture-handling";

    import "leaflet/dist/leaflet.css";
    import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";

    @Component
    export default class TransitRouteMap extends Vue {
        @Prop() private routes: object;
        @Prop() private vehicles: object;
        private map: Map;
        private routesGeojson: any;
        private vehicleMarkers: any[] = [];

        private vehicleIcon = L.icon({
            iconUrl: 'favicon.ico',

            iconSize:     [16, 16], // size of the icon
            // shadowSize:   [50, 64], // size of the shadow
            // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
            // shadowAnchor: [4, 62],  // the same for the shadow
            // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });

        @Watch('routes')
        onRoutesUpdated(routes: object) {
            routes && this.updateRouteMap(routes);
        }

        @Watch('vehicles')
        onVehiclesUpdated(vehicles: object) {
            vehicles && this.updateVehiclesOnMap(vehicles);
        }

        public async mounted() {
            L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);
            const ourMap = map('transit-route-map', {
                center: new L.LatLng(44.650346, -63.599141),
                zoom: 11,
                scrollWheelZoom: false
            });

            // create the tile layer with correct attribution
            const osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            const osmAttrib='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
            const osm = new L.TileLayer(osmUrl, {attribution: osmAttrib});

            ourMap.addLayer(osm);

            this.map = ourMap;
        }

        private updateRouteMap(routes) {
            // clear out the previous layers;
            if (this.routesGeojson && this.map) {
                this.map.removeLayer(this.routesGeojson);
            }

            const LGeoJSON: GeoJSON = L.geoJSON(routes);
            LGeoJSON.bindPopup((layer: any) => {
                console.log(layer);
                return `${layer.feature.properties.ROUTE_NUM} ${layer.feature.properties.TITLE}`;
            });
            LGeoJSON.addTo(this.map);

            this.routesGeojson = LGeoJSON;
        }

        private updateVehiclesOnMap(vehicles) {
            if (!vehicles) {
                return;
            }
            console.log('updating vehicles on map');

            // clear vehicle markers
            if (this.vehicleMarkers) {
                this.vehicleMarkers.forEach(vehicleMarker => {
                    this.map.removeLayer(vehicleMarker);
                });
            }

            vehicles.forEach(vehicleData => {
                const lat = vehicleData.vehicle.position.latitude;
                const lng = vehicleData.vehicle.position.longitude;
                const routeNumber = vehicleData.vehicle.trip.route_id;
                const speedKph = vehicleData.vehicle.position.speed * 3.6;

                const vehicleMarker = L.marker(
                    [lat, lng],
                    {icon: this.vehicleIcon})
                    .bindPopup(`Route ${routeNumber} going ${speedKph}km/h`)
                    .addTo(this.map);
                this.vehicleMarkers.push(vehicleMarker);
                console.log('added vehicle marker');
            });

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    #transit-route-map {
        height: 400px;
    }
</style>
