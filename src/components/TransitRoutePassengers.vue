<template>
    <div id="transit-passengers-container">
        <h3>Passenger Count Data</h3>
        <v-client-table :data="tableData" :columns="tableColumns" :options="tableOptions"></v-client-table>
        <highcharts :options="chartOptions"></highcharts>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import {TransitRoutePassengerData} from '../models/TransitSystem';

    @Component
    export default class TransitRoutePassengers extends Vue {
        @Prop() private passengerData: object;
        tableColumns: string[] = [];
        tableData: object[] = [];
        tableOptions: object = {};
        chartOptions: object = {};

        @Watch("passengerData")
        onPassengersUpdated(passengerData: TransitRoutePassengerData[]) {
            this.tableColumns = ["routeNumber", "routeName", "ridership", "dates"];
            this.tableData = passengerData;

            this.tableOptions = {
                orderBy: {
                    ascending: true,
                    column: "dates",
                },
                multiSorting: {
                    Route_Number: [
                        {
                            column: "dates",
                            matchDir: false
                        },
                    ],
                    Week_Range: [
                        {
                            column: "routeNumber",
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

            this.chartOptions = this.getChartData(passengerData);
        }

        getChartData(passengerData: TransitRoutePassengerData[]) {
            const ridershipDates = passengerData.reduce((obj, val: TransitRoutePassengerData) => {
                obj[val.dates] = val.dates in obj ? obj[val.dates] + val.ridership : val.ridership;
                return obj;
            }, {});

            const categories = Object.keys(ridershipDates).sort();
            const ridershipNumbers = categories.map((date) => [date, ridershipDates[date]]);

            return {
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'Total Bus Ridership By Week'
                },
                subtitle: {
                    text: 'Source: Halifax Open Data'
                },
                xAxis: {
                    categories: categories
                },
                yAxis: {
                    title: {
                        text: 'Number of Passengers'
                    },
                    min: 0,
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: false
                        },
                        enableMouseTracking: true
                    }
                },
                series: [{
                    name: 'All Routes',
                    data: ridershipNumbers
                }]
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
