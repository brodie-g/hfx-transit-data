<template>
    <div id="transit-data">
        <h2>Routes</h2>
        <v-select multiple v-if="transitSystem" label="label" :options="transitSystem.routeList" @input="filterRoutes"></v-select>
        <TransitRouteMap :routes="this.filteredGeoJSON" />
        <TransitRoutePassengers :passengerData="this.passengerData"/>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import TransitRouteMap from './TransitRouteMap.vue';
    import TransitRoutePassengers from './TransitRoutePassengers.vue';
    import {TransitSystem} from "../models/TransitSystem";
    @Component({
        components: {TransitRoutePassengers, TransitRouteMap}
    })
    export default class TransitData extends Vue {
        filteredGeoJSON: object = {};
        passengerData: object = {};
        @Prop() private transitSystem: TransitSystem;

        @Watch('transitSystem')
        onSystemUpdated(system: TransitSystem) {
            console.log('system updated');
            this.filteredGeoJSON = system.geoJSON;
            this.passengerData = system.passengerData;
        }

        filterRoutes(routes) {
            if (routes.length === 0) {
                // show all the routes
                routes = this.transitSystem.routeList;
            }

            console.log('routes filtered');
            this.filteredGeoJSON = TransitSystem.getFilteredRoutes(routes);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .v-select {
        padding: 4px 0px;
    }
</style>
