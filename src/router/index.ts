import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Billing from '@/views/Billing.vue';
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';
import NotFound from '@/views/NotFound.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: Billing
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
    path: '*',
    name: 'NotFound',
    component: NotFound
  }


];

const router = new VueRouter({
  routes
});

export default router;
