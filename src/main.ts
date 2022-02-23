import 'xe-utils';
import 'vxe-table/lib/style.css';
import VXETable from 'vxe-table';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'default-passive-events';

createApp(App).use(store).use(router).use(VXETable).mount('#app');
