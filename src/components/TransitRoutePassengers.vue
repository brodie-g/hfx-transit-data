<template>
    <div id="transit-passengers-container">
        <h3>Passenger Count Data</h3>
        <v-client-table :data="tableData" :columns="tableColumns" :options="tableOptions"></v-client-table>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

    @Component
    export default class TransitRoutePassengers extends Vue {
        @Prop() private passengerData: object;
        tableColumns: string[] = [];
        tableData: object[] = [];
        tableOptions: object = {};

        @Watch('passengerData')
        onPassengersUpdated(passengerData: object[]) {
            console.log('passengerDataUpdated');
            this.tableColumns = ["Route_Number", "Route_Name", "Ridership_Total", "Week_Range"];
            console.log(this.tableColumns);
            this.tableData = passengerData;

            this.tableOptions = {
                orderBy: {
                    ascending: true,
                    column: 'Week_Range',
                },
                multiSorting: {
                    Route_Number: [
                        {
                            column: 'Week_Range',
                            matchDir: false
                        },
                    ],
                    Week_Range: [
                        {
                            column: 'Route_Number',
                            matchDir: false
                        },
                    ]
                },
                // customSorting: {
                //     Route_Number: function (ascending) {
                //         return (a, b) => {
                //             return a.Route_Number.localeCompare(b.Route_Number, undefined, {numeric: true, sensitivity: 'base'});
                //         }
                //     }
                // }
            };
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    #transit-passengers-container {
        padding: 0 24px;
    }
</style>
