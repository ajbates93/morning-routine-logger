<script setup lang="ts">
  import { useStore } from '../store';
  const store = useStore()

</script>

<template>
  <header bg-gray-200 p3>
    <div flex justify-start items-center>
      <div text-lightblue-900 text-3xl inline-block mr-5 pr-5 border-r="1px solid #ccc">Morning Routine</div>
      <router-link text-gray-700 text-xl hover="cursor-pointer underline" to="/" items-center flex><span icon-btn i-carbon-home inline-block mr2 text-2xl></span> Dashboard</router-link>
      <router-link text-gray-700 text-xl v-if="store.user" hover="cursor-pointer underline" ml-auto items-center flex to="/account"><span icon-btn i-carbon-user inline-block mr2 text-2xl></span> Account</router-link>
      <router-link text-gray-700 text-xl v-else hover="cursor-pointer underline" ml-auto items-center flex to="/login"><div icon-btn i-carbon-login text-2xl></div> Login</router-link>
    </div>
  </header>
</template>


<style scoped>

</style>