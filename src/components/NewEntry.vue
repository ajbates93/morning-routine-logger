<script setup lang="ts">

  import { reactive, ref } from 'vue';
  import { NewEntry } from '../types'

  const emit = defineEmits<{
    (event: 'create', payload: any): void
  }>()
  
  const newEntry = reactive<NewEntry>({
    category: '', 
    duration: 0, 
    distance: '', 
    description: '',
  })
  const create = () => {
    emit('create', newEntry)
  }
  const active = ref(false)
</script>

<template>
  <button @click="active = !active" 
    p="x3 y1" bg-success text-white hover:bg-success-hover rounded-sm text-lg>
      <span items-center flex v-if="!active">Create New Entry<span ml-2 i-iconoir-check-circled-outline inline-block w5 h5 text-white></span></span>
      <span v-else>Cancel</span>
    </button>
  <div v-if="active" my-3>
    <h3 text-lg mb-3 font-bold>New Entry</h3>
    <form @submit.prevent bg-gray-200 p3>
      <select v-model="newEntry.category" placeholder="Category">
        <option value="Run">Run</option>
        <option value="Walk">Walk</option>
        <option value="Cycle">Cycle</option>
        <option value="Exercise Class">Exercise Class</option>
        <option value="Yoga">Yoga</option>
      </select>
      <input v-model="newEntry.duration" type="text" placeholder="Duration" />
      <input v-model="newEntry.distance" type="text" placeholder="Distance" />
      <input v-model="newEntry.description" type="text" placeholder="Description" />
      <button @click="create">Add</button>
    </form>
  </div>
</template>

<style scoped>

</style>