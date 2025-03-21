<template>
  <q-page class="q-pa-md">
    <div class="logo-container">
      <img src="https://www.factus.com.co/_astro/logo-white.ywiieubc.png" alt="Logo" class="logo" />
    </div>
    <div class="q-table-container">
      <div class="q-mb-md q-flex justify-start">
        <q-btn 
          label="Crear Producto" 
          icon="add" 
          color="primary" 
          @click="openCreateProductDialog"
        />
      </div>
      <q-table
        flat
        bordered
        :rows="rows"
        :columns="columns"
        row-key="product_id"
        class="custom-table"
      >
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
    <q-dialog v-model="createProductDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Crear Producto</div>
        </q-card-section>
        <q-card-section>
          <form @submit.prevent="submitProduct">
            <div class="q-mb-md">
              <q-input v-model="newProduct.product_code" label="Código de Producto" required />
            </div>
            <div class="q-mb-md">
              <q-input v-model="newProduct.product_name" label="Nombre de Producto" required />
            </div>
            <div class="q-mb-md">
              <q-input v-model="newProduct.tax_rate" label="Tasa de Impuesto (%)" type="number" required />
            </div>
            <div class="q-mb-md">
              <q-input v-model="newProduct.price" label="Precio" type="number" required />
            </div>
            <div class="q-mb-md">
              <q-input v-model="newProduct.quantity" label="Cantidad" type="number" required />
            </div>
            <q-card-actions align="right">
              <q-btn flat label="Cancelar" color="primary" @click="closeCreateProductDialog" />
              <q-btn flat label="Guardar Producto" color="primary" type="submit" />
            </q-card-actions>
          </form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <div class="orb-container">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
      <div class="orb orb-4"></div>
      <div class="orb orb-5"></div>
      <div class="orb orb-6"></div>
      <div class="orb orb-7"></div>
      <div class="orb orb-8"></div>
      <div class="orb orb-9"></div>
      <div class="orb orb-10"></div>
      <div class="orb orb-11"></div>
      <div class="orb orb-12"></div>
      <div class="orb orb-13"></div>
      <div class="orb orb-14"></div>
      <div class="orb orb-15"></div>
    </div>
  </q-page>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { getData, postData } from '../services/apiclient.js';  
const columns = ref([
  { name: 'product_code', align: 'center', label: 'Código de Producto', field: 'product_code', sortable: true },
  { name: 'product_name', align: 'center', label: 'Nombre de Producto', field: 'product_name', sortable: true },
  { name: 'tax_rate', align: 'center', label: 'Tasa de Impuesto (%)', field: 'tax_rate', sortable: true },
  { name: 'price', align: 'center', label: 'Precio', field: 'price', sortable: true },
  { name: 'quantity', align: 'center', label: 'Cantidad', field: 'quantity', sortable: true }
]);
let rows = ref([]);
const createProductDialog = ref(false);
const newProduct = ref({
  product_code: '',
  product_name: '',
  tax_rate: '',
  price: '',
  quantity: ''
});
async function dataProductos() {
  try {
    const response = await getData("/v1/products"); 
    if (response.data) {
      rows.value = response.data.data;
      console.log(response.data.data);
    }
  } catch (error) {
    console.log(error);
  }
}
function openCreateProductDialog() {
  createProductDialog.value = true;
}
function closeCreateProductDialog() {
  createProductDialog.value = false;
}
async function submitProduct() {
  try {
    const response = await postData("/v1/products", newProduct.value);  
    if (response.data) {
      rows.value.push({
        product_code: response.data.data.product_code,
        product_name: response.data.data.product_name,
        tax_rate: response.data.data.tax_rate,
        price: response.data.data.price,
        quantity: response.data.data.quantity
      });
      closeCreateProductDialog();  
      console.log("Producto creado:", response.data.data);
    }
  } catch (error) {
    console.log(error);
  }
}
onMounted(() => {
  dataProductos();
});
</script>

<style scoped>
.q-page {
  background: linear-gradient(45deg, #9c27b0, #1976d2);
  font-family: 'Roboto', sans-serif;
  color: white;
  position: relative; 
}

.logo-container {
  position: absolute;
  top: 20px; 
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.logo {
  max-width: 600px; 
  height: auto;
}

.q-table-container {
  max-width: 100%;
  overflow-x: auto;
  margin-top: 250px; 
}

.custom-table {
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.q-btn-container {
  position: absolute;
  top: 20px; 
  left: 20px; 
  z-index: 3; 
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

.q-table .q-tr:nth-child(even) .q-td {
  background-color: #f9f9f9;
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

.orb-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  pointer-events: none;
}

.orb {
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  animation: floatOrbs 15s ease-in-out infinite, moveOrbs 20s linear infinite;
}

.orb-1 { width: 250px; height: 250px; top: -100px; left: -300px; animation-delay: 0s; }
.orb-2 { width: 200px; height: 200px; top: -50px; left: 400px; animation-delay: 2s; }
.orb-3 { width: 350px; height: 350px; top: 100px; left: -100px; animation-delay: 4s; }
.orb-4 { width: 180px; height: 180px; top: -200px; left: -200px; animation-delay: 6s; }
.orb-5 { width: 300px; height: 300px; top: 50px; left: 300px; animation-delay: 8s; }
.orb-6 { width: 220px; height: 220px; top: 200px; left: -150px; animation-delay: 10s; }
.orb-7 { width: 270px; height: 270px; top: -150px; left: 200px; animation-delay: 12s; }
.orb-8 { width: 250px; height: 250px; top: 300px; left: -250px; animation-delay: 14s; }
.orb-9 { width: 300px; height: 300px; top: 100px; left: 500px; animation-delay: 16s; }
.orb-10 { width: 190px; height: 190px; top: -250px; left: 600px; animation-delay: 18s; }
.orb-11 { width: 230px; height: 230px; top: 200px; left: -350px; animation-delay: 20s; }
.orb-12 { width: 260px; height: 260px; top: -50px; left: -400px; animation-delay: 22s; }
.orb-13 { width: 280px; height: 280px; top: 100px; left: 700px; animation-delay: 24s; }
.orb-14 { width: 320px; height: 320px; top: -300px; left: 100px; animation-delay: 26s; }
.orb-15 { width: 250px; height: 250px; top: 300px; left: -500px; animation-delay: 28s; }

@keyframes floatOrbs {
  0% { transform: translateY(0); }
  50% { transform: translateY(-40px); }
  100% { transform: translateY(0); }
}

@keyframes moveOrbs {
  0% { transform: translateX(0); }
  25% { transform: translateX(200px); }
  50% { transform: translateX(-200px); }
  75% { transform: translateX(100px); }
  100% { transform: translateX(0); }
}
</style>
