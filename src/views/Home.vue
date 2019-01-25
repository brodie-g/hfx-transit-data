<template>
  <div class="home">
    <Title msg="Check out this Halifax Transit data!"/>
    <TransitData/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Title from '@/components/Title.vue'; // @ is an alias to /src
import TransitData from '@/components/TransitData.vue';

@Component({
  components: {
    Title, TransitData,
  },
})
export default class Home extends Vue {}
</script>
