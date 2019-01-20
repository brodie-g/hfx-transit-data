<template>
    <div id="bus-route-map-container">
        <h3>Bus Route Map</h3>
        <div id="bus-route-map"></div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { getBusRoutePassengers } from "../services/hfx-transit";

    @Component
    export default class BusRoutePassengers extends Vue {
        @Prop() private msg!: string;

        public async mounted() {
            console.log('passengers boarded mounted');

            // get the passenger data

            // load it into a table

            const busRoutes = await this.loadBusRoutes();
        }

        private async loadBusPassengers() {
            const busPassengerData = await getBusRoutePassengers();
            console.log('got bus routes');
            return busPassengerData;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    #bus-route-map {
        height: 680px;
    }
</style>
