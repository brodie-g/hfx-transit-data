<template>
    <div id="transit-route-map-container">
        <h3>Transit Route Map</h3>
        <div id="transit-route-map"></div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { getTransitRoutePassengers } from "../services/hfx-transit";

    @Component
    export default class TransitRoutePassengers extends Vue {
        @Prop() private msg!: string;

        public async mounted() {
            console.log('passengers boarded mounted');

            // get the passenger data

            // load it into a table

            const transitRoutes = await this.loadTransitRoutes();
        }

        private async loadTransitPassengers() {
            const transitPassengerData = await getTransitRoutePassengers();
            console.log('got transit routes');
            return transitPassengerData;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    #transit-route-map {
        height: 680px;
    }
</style>
