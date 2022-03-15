import 'xe-utils';
import 'vxe-table/lib/style.css';
import VXETable from 'vxe-table';
import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'default-passive-events';
import 'ant-design-vue/dist/antd.css';

createApp(App).use(store).use(Antd).use(router).use(VXETable).mount('#app');
