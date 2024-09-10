<template>
    <div class="container my-3 text-center">
        <button class="btn btn-outline-success mb-2" @click="getLocation()">Get Location</button>
        <div class="shadow mb-4" ref="mapContainer" style="height: 500px; width: 70%; margin: 0 auto;"></div>
        {{ lat }} , {{ lng }}
    </div>



</template>

<script setup>
import { ref, onMounted, watch, watchEffect } from 'vue';
import L from 'leaflet';

const map = ref()
const lat = ref(4.632368001533859)
const lng = ref(-74.08087143248079)
const newLat = ref()
const newLng = ref()
const mapContainer = ref()

onMounted(() => {
    map.value = L.map(mapContainer.value).setView([4.632368001533859, -74.08087143248079], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map.value);
    L.marker([lat.value, lng.value], { draggable: true })
        .addTo(map.value)
        .on("dragend", (position) => {
            lat.value = position.target._latlng.lat;
            lng.value = position.target._latlng.lng;
            console.log(position)
        })
})
const props = defineProps({
    distances: {
        type: Object || String,
        required: false
    },
});
const emit = defineEmits(['distances']);

// Crear un watcher para actualizar el valor emitido
watch([lat, lng], ([newLat, newLng]) => {
    emit('distances', newLat, newLng); // Emitir el evento con ambos valores
});


function getLocation() {

if (navigator.geolocation) {
  navigator.geolocation.watchPosition((position) => {
    lat.value = position.coords.latitude;
    lng.value = position.coords.longitude;
    map.value.setView([lat.value, lng.value], 19);
  });
} else {
  alert("Geolocation is not supported by this browser.");
}
}

watchEffect(() => {
lat.value = newLat.value || lat.value
lng.value = newLng.value || lng.value
})

</script>

<style scoped></style>