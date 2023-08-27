import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import RentalView from '../views/RentalView.vue'
import PublisherView from '../views/PublisherView.vue'
import UserView from '../views/UserView.vue'
import BookView from '../views/BookView.vue'

Vue.use(VueRouter)

const routes = [
  {
      path: '/',
      name: 'Dashboard',
      component: DashboardView
  },
  {
      path: '/User',
      name: 'User',
      component: UserView
  },
  {
      path: '/Publisher',
      name: 'Publisher',
      component: PublisherView
  },
  {
      path: '/Book',
      name: 'Book',
      component: BookView
  },
  {
      path: '/Rental',
      name: 'Rental',
      component: RentalView
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
