<template>
    <div id="bus-route-map-container">
        <h3>Bus Route Map</h3>
        <div id="bus-route-map"></div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { map } from 'leaflet';
    import 'proj4leaflet';
    import { getBusRoutes } from "../services/hfx-transit";

    @Component
    export default class BusRouteMap extends Vue {
        @Prop() private msg!: string;

        public async mounted() {
            console.log('route map mounted');
            const ourMap = map('bus-route-map');

            // create the tile layer with correct attribution
            const osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            const osmAttrib='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
            const osm = new L.TileLayer(osmUrl, {attribution: osmAttrib});

            // start the map in South-East England
            ourMap.setView(new L.LatLng(44.650346, -63.599141),12);
            ourMap.addLayer(osm);

            const busRoutes = await this.loadBusRoutes();
            console.log('something');

            // const geoJson = L.geoJSON(busRoutes);
            //
            // geoJson.addTo(ourMap);
            const geoJson = L.Proj.geoJson(busRoutes.geojson);
            geoJson.bindPopup((layer) => {
                console.log(layer);
                return `${layer.feature.properties.ROUTE_NUM} ${layer.feature.properties.TITLE}`;
            });

            geoJson.addTo(ourMap);
        }

        private async loadBusRoutes() {
            const busRoutes = await getBusRoutes();
            console.log('got bus routes');
            return busRoutes;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    #bus-route-map {
        height: 680px;
    }
</style>
