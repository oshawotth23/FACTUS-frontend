<template>
  <q-page class="q-pa-md">
    <div class="orbes-fondo">
      <div v-for="n in 30" :key="n" class="orbe" :style="posicionOrbe(n)"></div>
    </div>

    <div class="logo-container">
      <img src="https://www.factus.com.co/_astro/logo-white.ywiieubc.png" alt="Logo" class="logo" />
    </div>
    <div class="q-table-container">
      <div class="q-mb-md q-flex justify-start">
        <q-btn 
          label=" Crear factura" 
          icon="add" 
          color="primary" 
          @click="openCreateFacturaDialog"
        />
      </div>
      <q-table
        flat
        bordered
        :rows="rows"
        :columns="columns"
        row-key="number"
        class="custom-table"
        :loading="cargando"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              flat
              color="primary"
              icon="visibility"
              @click="verFactura(props.row)"
            />
            <q-btn
              flat
              color="negative"
              icon="delete"
              @click="eliminarFactura(props.row)"
              class="q-ml-xs"
            />
            <q-btn
              flat
              color="secondary"
              icon="download"
              @click="descargarFactura(props.row)"
              class="q-ml-xs"
            />
          </q-td>
        </template>
      </q-table>
    </div>
    <div class="q-btn-container">
      <q-btn 
        icon="home" 
        to="/inicio" 
        label="Inicio" 
        class="q-btn-left"
      />
    </div>
    <q-dialog v-model="createFacturaDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Crear Factura</div>
        </q-card-section>
        <q-card-section>
          <form @submit.prevent="submitFactura">
            <div class="q-mb-md">
              <q-input v-model="newFactura.client" label="Cliente" required />
            </div>
            <div class="q-mb-md">
              <q-input v-model="newFactura.total" label="Total" type="number" required />
            </div>
            <div class="q-mb-md">
              <q-input v-model="newFactura.email" label="Correo Electrónico" type="email" required />
            </div>
            <div class="q-mb-md">
              <q-input v-model="newFactura.reference_code" label="Código de Referencia" required />
            </div>
            <div class="q-mb-md">
              <q-input v-model="newFactura.identification" label="Identificación" required />
            </div>
            <q-card-actions align="right">
              <q-btn flat label="Cancelar" color="primary" @click="closeCreateFacturaDialog" />
              <q-btn flat label="Crear" color="primary" type="submit" />
            </q-card-actions>
          </form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="facturaDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Factura Detalle</div>
        </q-card-section>
        <q-card-section>
          <pre>{{ facturaSeleccionada }}</pre>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useQuasar } from 'quasar';
const $q = useQuasar();
const columns = ref([
  { name: 'number', align: 'center', label: 'Número', field: 'number', sortable: true },
  { name: 'api_client_name', align: 'center', label: 'Cliente', field: 'api_client_name', sortable: true },
  { name: 'reference_code', align: 'center', label: 'Código de Referencia', field: 'reference_code', sortable: true },
  { name: 'identification', align: 'center', label: 'Identificación', field: 'identification', sortable: true },
  { name: 'names', align: 'center', label: 'Nombre', field: 'names', sortable: true },
  { name: 'email', align: 'center', label: 'Correo Electrónico', field: 'email', sortable: true },
  { name: 'total', align: 'center', label: 'Total', field: 'total', sortable: true },
  { name: 'actions', align: 'center', label: 'Acciones', field: 'actions' }
]);
const rows = ref([]);
const cargando = ref(false);
const facturaSeleccionada = ref(null);
const facturaDialog = ref(false);
const createFacturaDialog = ref(false);
const newFactura = ref({
  client: '',
  total: '',
  email: '',
  reference_code: '',
  identification: ''
});

async function obtenerFacturas() {
  cargando.value = true;
  const store = JSON.parse(localStorage.getItem("tienda"));
  const token = store?.token || "";
  try {
    const response = await axios.get(
      "https://api-sandbox.factus.com.co/v1/bills",
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    if (response.data) {
      rows.value = response.data.data.data;
    }
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Error al obtener facturas",
      position: "top",
      timeout: 3000
    });
    console.error(error);
  } finally {
    cargando.value = false;
  }
}

function verFactura(factura) {
  facturaSeleccionada.value = factura;
  facturaDialog.value = true;
}

function eliminarFactura(factura) {
  $q.dialog({
    title: 'Confirmar Eliminación',
    message: `¿Estás seguro de que deseas eliminar la factura ${factura.number}?`,
    cancel: true,
    persistent: true
  }).onOk(() => {
    console.log("Factura eliminada:", factura);
  });
}

function descargarFactura(factura) {
  // Lógica para descargar la factura, por ejemplo, generando un enlace de descarga:
  console.log("Descargando factura:", factura);
  // Aquí puedes agregar la lógica para generar el archivo PDF o documento correspondiente:
  // window.location.href = `API_URL/descargar/${factura.id}`;
}

function openCreateFacturaDialog() {
  createFacturaDialog.value = true;
}

function closeCreateFacturaDialog() {
  createFacturaDialog.value = false;
}

function submitFactura() {
  console.log("Factura creada", newFactura.value);
  closeCreateFacturaDialog(); 
}

onMounted(() => {
  obtenerFacturas();
});

const posicionOrbe = (n) => {
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
  };
}
</script>

<style scoped>
.q-page {
  background: linear-gradient(45deg, #9c27b0, #1976d2);
  font-family: 'Roboto', sans-serif;
  color: white;
  position: relative;
}

.orbes-fondo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0; 
}

.orbe {
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
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1; 
}

.logo {
  max-width: 600px;
  height: auto;
}

.q-table-container {
  max-width: 100%;
  overflow-x: auto;
  margin-top: 250px;
  z-index: 2;
}

.custom-table {
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.q-btn-container {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 2; 
}

.q-btn-left {
  background-color: #1976d2;
  color: white;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.q-btn-left:hover {
  background-color: #1565c0;
}

.q-table .q-th, .q-table .q-td {
  padding: 16px;
  text-align: center;
  transition: all 0.2s ease;
  border-bottom: 1px solid #e0e0e0;
}

.q-table .q-td {
  background-color: #fff;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.q-table .q-tr:hover .q-td {
  background-color: #f2f7ff;
  transform: scale(1.02);
}

.q-table .q-th {
  background-color: #1976d2;
  color: white;
  font-weight: bold;
}

.q-table .q-td .q-btn {
  color: #1976d2;
  font-size: 14px;
}

.q-table .q-td .q-btn:hover {
  color: #1565c0;
}

.q-table .q-th, .q-table .q-td {
  border-radius: 6px;
}

.q-table .q-tr:nth-child(odd) .q-td {
  background-color: #e9f0fe;
}

.q-table .q-tr:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.q-mb-md {
  margin-bottom: 20px;
}

.q-flex {
  display: flex;
}

.q-btn {
  color: white;
  font-weight: bold;
}
</style>
