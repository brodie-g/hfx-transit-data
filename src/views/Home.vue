<template>
  <div class="home">
    <TransitData :transitSystem="this.transitSystem"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Title from '@/components/Title.vue'; // @ is an alias to /src
import TransitData from '@/components/TransitData.vue';
import {getTransitSystem} from '../services/hfx-transit';
import {TransitSystem} from '../models/TransitSystem';

@Component({
  components: {
    Title, TransitData,
  },
})
export default class Home extends Vue {
    transitSystem: TransitSystem = null;

    public async created() {
        console.log('Home mounted');
        this.transitSystem = await this.loadTransitSystem();
    }

    private async loadTransitSystem() {
        const transitRoutes = await getTransitSystem();
        console.log('got transit routes');
        return transitRoutes;
    }

}
</script>
