<template>
    <div class="container w-50 pt-4">
        <h1 class="text-center">REGISTRO USUARIOS</h1>
        <div class="my-5 shadow p-3 rounded">
            <div class="mb-3 ">
                <label for="userDocument" class="form-label">Número de documento</label>
                <input type="number" class="form-control" id="userDocument" v-model="document" required>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Nombres</label>
                <input type="text" class="form-control" id="exampleInputPassword1" v-model="name" required>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Apellidos</label>
                <input type="text" class="form-control" id="exampleInputPassword1" v-model="lastName" required>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Direccion</label>
                <input type="text" class="form-control" id="exampleInputPassword1" v-model="direction" required>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Ubicación</label>
                <MapComponent @distances="handleDistances"></MapComponent>
            </div>
            <button @click="sendUser()" class="btn btn-primary">Submit</button>
        </div>
    </div>
</template>

<script setup>
import MapComponent from '../MapComponent.vue';
import { ref } from 'vue';
import { useUsersStore } from '@/stores/usersStore';

const document = ref('');
const name = ref('');
const lastName = ref('');
const direction = ref('');
const cordinatesX = ref('');
const cordinatesY = ref('');

const usersStore = useUsersStore();

const handleDistances = (lat, lng) => {
    console.log('Latitud:', lat, 'Longitud:', lng);
    cordinatesX.value = lat;
    cordinatesY.value = lng;
};

const sendUser = () => {
    var cordinates = cordinatesY.value +','+ cordinatesX.value
    console.log(name.value + ' ' + lastName.value + ' ' + direction.value + ' ' + cordinates);
    usersStore.createUsers(name.value, lastName.value, document.value, direction.value, cordinates ); 
}

</script>