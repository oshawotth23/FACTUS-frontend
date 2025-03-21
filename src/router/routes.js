import Login from "../views/login.vue";
import Home from "../views/home.vue";
import Facturas from "../views/facturas.vue"; 
import Clientes from "../views/clientes.vue"; 
import Productos from "../views/productos.vue";
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Login',
        component: Login
      },
      {
        path: '/inicio',
        name: 'home',
        component: Home
      },
      {
        path: '/facturas',
        name: 'Facturas',
        component: Facturas 
      },
      {
        path: '/clientes',
        name: 'Clientes',
        component: Clientes 
      },
      {
        path: '/productos',
        name: 'Productos',
        component: Productos 
      }
    ]
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
