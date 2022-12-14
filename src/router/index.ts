import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Billing from '@/views/Billing.vue';
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';
import NotFound from '@/views/NotFound.vue';
import EditLabel from '@/views/EditLabel.vue';
import MyChart from '@/views/MyChart.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/billing'
  },
  {
    path: '/billing',
    name: 'Billing',
    component: Billing
  },
  {
    path: '/Labels',
    name: 'Labels',
    component: Labels
  },
  {
    path: '/Statistics',
    name: 'Statistics',
    component: Statistics
  },
  {
    path: '/MyChart',
    name: 'MyChart',
    component: MyChart
  },
  {
    path: '/labels/edit/:id',
    component: EditLabel
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }


];

const router = new VueRouter({
  routes
});

export default router;
