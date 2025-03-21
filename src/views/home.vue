<template>
  <div class="contenedor-login">
    <div class="estrellas-fondo">
      <div v-for="n in 20" :key="n" class="estrella" :style="posicionEstrella(n)"></div>
    </div>

    <div class="logo-container">
      <img src="https://www.factus.com.co/_astro/logo-white.ywiieubc.png" alt="Logo" class="logo" />
    </div>
    <div class="home-container">
      <button class="btn" @click="goToFacturas">
        <img src="https://cdn-icons-png.flaticon.com/512/411/411745.png" alt="Facturas" class="icon"/>
        Facturas
      </button>
      <button class="btn" @click="goToProductos">
        <img src="https://cdn-icons-png.flaticon.com/512/1822/1822045.png" alt="Productos" class="icon"/>
        Productos
      </button>
      <button class="btn" @click="goToClientes">
        <img src="https://cdn-icons-png.freepik.com/256/12073/12073372.png?semt=ais_hybrid" alt="Clientes" class="icon"/>
        Clientes
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToFacturas = () => {
  router.replace("/facturas");
};

const goToCrear = () => {
  router.replace("/crear");
};

const goToProductos = () => {
  router.replace("/productos");
};

const goToClientes = () => {
  router.replace("/clientes");
};

const goToCrearCliente = () => {
  router.replace("/crear-cliente");
};

const goToAgregarProducto = () => {
  router.replace("/agregar-producto");
};

const posicionEstrella = (n) => {
  const size = `${Math.random() * (180 - 120) + 120}px`;
  return {
    top: `${Math.random() * 100}vh`,
    left: `${Math.random() * 100}vw`,
    width: size,
    height: size,
    borderRadius: '50%', 
    opacity: Math.random() * 0.8 + 0.2, 
    animationDuration: `${Math.random() * (15 - 8) + 8}s`,
    animationDelay: `${Math.random() * 2}s`, 
  }
}
</script>

<style>
.contenedor-login {
  position: relative;
  height: 100vh;
  background: linear-gradient(135deg, #6a1b9a, #1976d2); 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.estrellas-fondo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0; 
}

.estrella {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.8); 
  animation: flotar infinite alternate ease-in-out;
}

@keyframes flotar {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-40px); 
  }
}

.logo-container {
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.logo {
  max-width: 600px; 
  height: auto;
}

.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  z-index: 1; 
}

.btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 250px;
  background-color: #1976d2; 
  border-radius: 50%;
  border: none;
  color: white;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
}

.btn:hover {
  background-color: #1565c0;
  transform: scale(1.1); 
}

.icon {
  width: 80px;
  height: 80px;
  margin-bottom: 15px;
}

.btn:focus {
  outline: none;
}

.mensaje-error {
  color: #fff;
  background-color: #f44336;
  border-radius: 5px;
  padding: 12px 20px;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.mensaje-error:hover {
  transform: scale(1.05);
}
</style>
