<template>
  <div :class="['drawer', { open: drawerOpen, hidden: !isLoggedIn || isLoginRoute }]">
    <button @click="toggleDrawer" class="close-btn">&times;</button>
    <ul>
      <li><router-link to="/" class="button">Volver a Login</router-link></li>
      <li><router-link to="/inicio" class="button">Inicio</router-link></li>
      <li><router-link to="/facturas" class="button">Facturas</router-link></li>
      <li><router-link to="/clientes" class="button">clientess</router-link></li>
      <li><router-link to="/productos" class="button">productos</router-link></li>
    </ul>
  </div>
  <div id="main-content">
    <button v-if="isLoggedIn && !isLoginRoute" @click="toggleDrawer" class="open-btn">☰</button>
    <router-view></router-view>
  </div>
  <div class="contenedor-gif">
    <img src="https://i.pinimg.com/originals/e5/93/ab/e593ab0589d5f1b389e4dfbcce2bce20.gif" alt="Cargando..." />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router'; 
const drawerOpen = ref(false);
const isLoggedIn = ref(false); 
const route = useRoute();
const isLoginRoute = computed(() => route.name === 'login');
function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
}
function login() {
  isLoggedIn.value = true;
}
function logout() {
  isLoggedIn.value = false; 
}
</script>

<style scoped>
body {
  font-family: 'Montserrat', sans-serif;
  color: #333;
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0;
  overflow: hidden;
}

.drawer {
  height: 100%;
  width: 300px;
  position: fixed;
  top: 0;
  left: -300px;
  background-color: #4a148c;
  color: white;
  transition: left 0.3s ease;
  padding-top: 60px;
  z-index: 1000;
}

.drawer.open {
  left: 0;
}

.drawer.hidden {
  display: none;
}

.drawer ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.drawer li {
  width: 100%;
}

.drawer a.button {
  display: block;
  width: 100%;
  padding: 20px 15px;
  text-align: center;
  border-bottom: 1px solid #9c4dcc;
  color: white;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.drawer a.button:hover {
  background-color: #9c4dcc;
}

#main-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.open-btn {
  font-size: 30px;
  background-color: #fff;
  border: 2px solid #4a148c;
  color: #4a148c;
  padding: 12px 20px;
  cursor: pointer;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1001;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.open-btn:hover {
  background-color: #f1f1f1;
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.close-btn {
  font-size: 30px;
  background-color: transparent;
  border: none;
  color: white;
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;
}

.close-btn:hover {
  color: #9c4dcc;
  transform: rotate(90deg);
}

.contenedor-gif {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  height: 300px;
  z-index: 9999;
}

.contenedor-gif img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
