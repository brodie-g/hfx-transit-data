<template>
    <div id="transit-data">
        <v-select multiple v-if="transitSystem" label="label" :options="transitSystem.routeList" @input="filterRoutes"></v-select>
        <TransitRouteMap :routes="this.filteredGeoJSON" />
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import TransitRouteMap from './TransitRouteMap.vue';
    import {TransitSystem} from "../models/TransitSystem";
    @Component({
        components: {TransitRouteMap}
    })
    export default class TransitData extends Vue {
        filteredGeoJSON: object = {};
        @Prop() private transitSystem: TransitSystem;

        @Watch('transitSystem')
        onSystemUpdated(system: TransitSystem) {
            this.filteredGeoJSON = system.geoJSON;

            // get the list of routes

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
</style>
