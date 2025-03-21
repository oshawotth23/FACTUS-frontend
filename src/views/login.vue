<template>
  <div class="contenedor-login">
    <div class="estrellas-fondo">
      <div v-for="n in 20" :key="n" class="estrella" :style="posicionEstrella(n)"></div>
    </div>
    <div class="tarjeta-login">
      <div class="imagen-container">
        <img src="https://www.factus.com.co/_astro/logo-white.ywiieubc.png" alt="Logo Factus" class="logo-inicio">
      </div>
      <div class="formulario-container">
        <h2>Hola! Buenos Días! <br><span>Inicia Sesión.</span></h2>
        
        <form @submit.prevent="enviarFormulario">
          <div class="grupo-entrada">
            <label for="email">Usuario</label>
            <input type="text" id="email" v-model="email" placeholder="Introduce tu usuario" />
          </div>
          <div class="grupo-entrada">
            <label for="password">Contraseña</label>
            <div class="password-container">
              <input :type="mostrarContraseña ? 'text' : 'password'" id="password" v-model="password" placeholder="Introduce tu contraseña" />
              <button type="button" @click="toggleMostrarContraseña" class="btn-ver-contraseña">
                <span v-if="mostrarContraseña">👁️</span>
                <span v-else>👁️‍🗨️</span>
              </button>
            </div>
          </div>
          <div class="olvidaste-contraseña">
            <a href="#" @click.prevent="recuperarContraseña">Olvidaste tu contraseña?</a>
          </div>
          <button type="submit" class="btn-enviar" :disabled="loading">
            <span v-if="loading">Loading...</span>
            <span v-else>Iniciar</span>
          </button>
          <div class="registro">
            <p>Registrarse</p>
          </div>
          <div v-if="mensajeError" class="alerta-error">
            {{ mensajeError }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { postData } from '../services/apiClient'
import { useStore } from '../stores/administrador'
const store = useStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const mostrarContraseña = ref(false)
const mensajeError = ref('') 
const toggleMostrarContraseña = () => {
  mostrarContraseña.value = !mostrarContraseña.value
}
const enviarFormulario = async () => {
  if (!email.value || !password.value) {
    mensajeError.value = 'Escribe tus credenciales'
    return
  }
  loading.value = true
  mensajeError.value = '' 
  const credentials = {
    username: email.value,
    password: password.value,
    grant_type: 'password',
    client_id: import.meta.env.VITE_VUE_APP_CLIENT_ID,
    client_secret: import.meta.env.VITE_VUE_APP_CLIENT_SECRET,
  }
  try {
    const response = await postData('/oauth/token', credentials)
    if (response.access_token) {
      store.set_Token_RefreshToken(response.access_token, response.refresh_token)
      router.replace('/inicio')
    }
  } catch (error) {
    mensajeError.value = 'Credenciales incorrectas'
  }

  loading.value = false
}
const recuperarContraseña = () => {
  alert('Lógica para recuperar la contraseña aquí.')
}
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

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background: linear-gradient(to right, #1e3a8a, #2563eb);
  font-family: 'Arial', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.contenedor-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: relative;
}

.estrellas-fondo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
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

.tarjeta-login {
  display: flex;
  max-width: 900px;
  width: 90%;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  z-index: 10;
}

.imagen-container {
  width: 50%;
  background: linear-gradient(to bottom, #1e3a8a, #2563eb);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.logo-inicio {
  max-width: 80%;
  height: auto;
}

.formulario-container {
  width: 50%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h2 {
  font-size: 26px;
  margin-bottom: 20px;
  font-weight: bold;
  color: #333;
}

h2 span {
  color: #2563eb;
}

.grupo-entrada {
  margin-bottom: 20px;
}

.grupo-entrada label {
  display: block;
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
}

.grupo-entrada input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-top: 6px;
  outline: none;
}

.grupo-entrada input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 5px rgba(37, 99, 235, 0.5);
}

.password-container {
  position: relative;
}

.password-container button {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
}

.btn-ver-contraseña {
  font-size: 24px; 
  color: #2563eb;
  cursor: pointer;
}

.olvidaste-contraseña {
  margin-top: 10px;
  text-align: right;
}

.olvidaste-contraseña a {
  font-size: 14px;
  color: #2563eb;
  text-decoration: none;
}

.olvidaste-contraseña a:hover {
  text-decoration: underline;
}

.btn-enviar {
  width: 100%;
  padding: 12px;
  background-color: #2563eb;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  color: white;
  cursor: pointer;
  font-weight: bold;
}

.btn-enviar:hover {
  background-color: #1e3a8a;
}

.alerta-error {
  width: 100%;
  padding: 12px;
  background-color: #f44336; 
  color: white;
  text-align: center;
  border-radius: 8px;
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
}

.registro {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #2563eb;
}

.registro p {
  cursor: pointer;
  text-decoration: underline;
}

.registro p:hover {
  color: #1e3a8a;
}
</style>
