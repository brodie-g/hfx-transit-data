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
        private map: Map;
        private LGeoJSON: any;

        @Watch('routes')
        onRoutesUpdated(routes: object) {
            routes && this.updateRouteMap(routes);
        }

        public async mounted() {
            L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);
            const ourMap = map('transit-route-map', {
                center: new L.LatLng(44.650346, -63.599141),
                zoom: 11,
                scrollWheelZoom: false,
                gestureHandling: true,
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
            if (this.LGeoJSON && this.map) {
                this.map.removeLayer(this.LGeoJSON);
            }

            const LGeoJSON: GeoJSON = L.geoJSON(routes);
            LGeoJSON.bindPopup((layer: LayerGroup<geojson.Feature>) => {
                console.log(layer);
                return `${layer.feature.properties.ROUTE_NUM} ${layer.feature.properties.TITLE}`;
            });
            LGeoJSON.addTo(this.map);

            this.LGeoJSON = LGeoJSON;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    #transit-route-map {
        height: 680px;
    }
</style>
