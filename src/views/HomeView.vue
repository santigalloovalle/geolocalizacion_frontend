<template>
  <div class="main">
    <div class="container p-2">
      <div class="row">
        <div class="card col mx-4 shadow" style="width: 18rem;">
          <img src="../assets/icon-add.png" class="card-img-top card-icon" alt="...">
          <div class="card-body">
            <h5 class="card-title">Crear un usuario</h5>
            <p class="card-text">Registre los usuarios dentro de la base de datos.</p>
            <a href="/users/create" class="btn btn-primary">Crear</a>
          </div>
        </div>

        <div class="card col mx-4 shadow" style="width: 18rem;">
          <img src="../assets/users-icon.png" class="card-img-top card-icon" alt="...">
          <div class="card-body">
            <h5 class="card-title">Visualizar usuarios</h5>
            <p class="card-text">Consulte las distancias de los usuarios desde un punto marcado en el mapa.</p>
            <button type="button" class="btn btn-primary" @click="verUsuarios(cordX, cordY)">Ver
            </button>
            <a </a>
          </div>
        </div>

      </div>

    </div>
  </div>
  <div class="container my-3 text-center">
    <MapComponent @distances="handleDistances"></MapComponent>
  </div>
  <router-view></router-view>
</template>

<script setup>
import { useUsersStore } from '../stores/usersStore';
import MapComponent from '@/components/MapComponent.vue';
import { onMounted, ref, watchEffect } from 'vue';
import router from '@/router';

const cordX = ref(4.632368001533859);
const cordY = ref(-74.08087143248079);

const usersStore = useUsersStore();

onMounted(async () => {
});

const verUsuarios = (lat, lng) => {
  console.log('Latitud:', cordX.value, 'Longitud:', cordY.value);
  var cordinates = lng + ',' + lat 
  router.push({ name: 'users', params: { cordinates } });
  usersStore.readUsers(cordinates)
}


const handleDistances = (lat, lng) => {
  cordX.value = lat
  cordY.value = lng
  // console.log('Latitud:', cordX.value, 'Longitud:', cordY.value);
};

watchEffect(() => {
  
})

</script>

<style scoped>
.map-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.card-icon {
  width: 12rem;
  height: 12rem;
  margin: 20px auto;
}
</style>