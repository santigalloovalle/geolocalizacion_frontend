<template>
  <NavComponent class="mb-5"></NavComponent>
  <router-view></router-view>
</template>

<script setup>
import NavComponent from './components/navigation/NavComponent.vue';

</script>

<style scoped>
.map-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
</style>