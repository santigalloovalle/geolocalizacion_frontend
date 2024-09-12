<template>
    <div v-if="loading" class="container">
        <LoadingComponent></LoadingComponent>
    </div>
    <div v-else class="main">
        <div class="container p-2 shadow">
            <h1 class="text-center">PROYECTO DATOS ESPACIALES</h1>

            <table class="table table-striped mt-5">
                <thead>
                    <tr>
                        <th scope="col">Número de documento</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Dirección</th>
                        <th scope="col">Distancia</th>
                        <th scope="col">Ubicación</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.useDocumento }}</td>
                        <td>{{ user.useNombre + ' ' + user.useApellido }}</td>
                        <td>{{ user.useDireccion }}</td>
                        <td>{{ user.distances }}</td>
                        <td>
                            <a class="btn btn-outline-success px-4"
                                :href="'https://www.google.com/maps?q=' + user.useCoordinates.y + ',' + user.useCoordinates.x"
                                target="_blank">
                                <img class="map-icon" src="../../assets/map-user-icon.png" alt="">
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="button-group text-center">
                <a href="/users/create" class="btn btn-primary px-5 py-2 shadow">
                    Registrar
                </a>
            </div>
        </div>
    </div>
    <h2 class="text-center my-4">USER UBICATION</h2>
    <MapComponent 
        :markers="users"
        :userMarkers="true"
    ></MapComponent> 
</template>

<script setup>
import {useUsersStore} from '../../stores/usersStore';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import LoadingComponent from '../LoadingComponent.vue';
import MapComponent from '../MapComponent.vue';

const usersStore = useUsersStore();
const route = useRoute(); 
const users = ref([]);

const loading = ref(false);

onMounted(async () => {
    console.log(route.params.cordinates)
    loading.value = true;
    await usersStore.readUsers(route.params.cordinates);
    users.value = usersStore.users
    loading.value = false;
});

</script>

<style scoped>
.map-icon {
    width: 30px;
    height: 30px;
    cursor: pointer;
}
</style>