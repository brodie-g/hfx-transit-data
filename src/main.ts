import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vSelect from 'vue-select';
import {ClientTable, Event} from 'vue-tables-2';

Vue.config.productionTip = false;
Vue.component('v-select', vSelect);
Vue.use(ClientTable);


new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
