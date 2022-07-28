<script setup lang="ts">
  import { useStore } from '../store';
  const store = useStore()

</script>

<template>
  <header bg-gray-200 p3>
    <div flex justify-start items-center
      font-bold>
      <div text-blue-500 text-xl inline-block mr-3>Morning Routine</div>
      <router-link hover="cursor-pointer underline" to="/"><div icon-btn i-carbon-home></div> Dashboard</router-link>
      <router-link v-if="store.user" hover="cursor-pointer underline" ml-auto to="/account"><div icon-btn i-carbon-user></div> Account</router-link>
      <router-link v-else hover="cursor-pointer underline" ml-auto to="/login"><div icon-btn i-carbon-login></div> Login</router-link>
    </div>
  </header>
</template>


<style scoped>

</style>