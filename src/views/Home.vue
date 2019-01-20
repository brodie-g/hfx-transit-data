<template>
  <div class="home">
    <Title msg="Check out this Halifax Transit data!"/>
    <BusRouteMap/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Title from '@/components/Title.vue'; // @ is an alias to /src
import BusRouteMap from '@/components/BusRouteMap.vue';

@Component({
  components: {
    Title, BusRouteMap,
  },
})
export default class Home extends Vue {}
</script>
