<template>
    <TransitRouteMap geoJSON={this.transitRoutes} />
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import TransitRouteMap from './TransitRouteMap.vue';
    import { getTransitRoutes } from "../services/hfx-transit";
    @Component({
        components: {TransitRouteMap}
    })
    export default class TransitData extends Vue {
        transitRoutes: object = {};


        public async mounted() {
            const transitRoutes = await this.loadTransitRoutes();

            this.transitRoutes = transitRoutes;

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
</style>
