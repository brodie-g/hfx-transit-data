<template>
    <div id="transit-route-map-container">
        <h3>Transit Route Map</h3>
        <div id="transit-route-map"></div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { map } from 'leaflet';
    import 'proj4leaflet';
    import { getTransitRoutes } from "../services/hfx-transit";

    @Component
    export default class TransitRouteMap extends Vue {
        @Prop() private geoJSON!: object;

        public async mounted() {
            console.log('route map mounted');
            const ourMap = map('transit-route-map');

            // create the tile layer with correct attribution
            const osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            const osmAttrib='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
            const osm = new L.TileLayer(osmUrl, {attribution: osmAttrib});

            // start the map in South-East England
            ourMap.setView(new L.LatLng(44.650346, -63.599141),11);
            ourMap.addLayer(osm);

            const transitRoutes = await this.loadTransitRoutes();
            console.log('something');

            // const geoJson = L.geoJSON(transitRoutes);
            //
            // geoJson.addTo(ourMap);
            const geoJson = L.Proj.geoJson(transitRoutes);
            geoJson.bindPopup((layer) => {
                console.log(layer);
                return `${layer.feature.properties.ROUTE_NUM} ${layer.feature.properties.TITLE}`;
            });

            geoJson.addTo(ourMap);

            window.geojson = geoJson;
        }

        private async loadTransitRoutes() {
            const transitRoutes = await getTransitRoutes();
            console.log('got transit routes');
            return transitRoutes;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    #transit-route-map {
        height: 680px;
    }
</style>
