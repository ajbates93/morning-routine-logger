<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { Entry } from '../types';

  const { entry } = defineProps<{
    entry: Entry
  }>()
  const emit = defineEmits<{
    (event: 'update', id: string, payload: any): void,
    (event: 'remove', id: string): void
  }>()

  const edit = ref(false)
  const newEntry = reactive({
    category: '', 
    duration: 0, 
    distance: '', 
    description: '',
  })
  const update = () => {
    emit('update', entry.id, newEntry)
    reset()
  } 
  const reset = () => {
    newEntry.category = entry.category
    newEntry.duration = entry.duration
    newEntry.distance = entry.distance
    newEntry.description = entry.description
    edit.value = false
  }
</script>

<template>
  <div mb-3 pb-3 border="b gray-200">
    <form v-if="edit" @submit.prevent bg-gray-200 p3>
      <select v-model="newEntry.category" type="text" placeholder="Category">
        <option value="Run">Run</option>
        <option value="Walk">Walk</option>
        <option value="Cycle">Cycle</option>
        <option value="Exercise Class">Exercise Class</option>
        <option value="Yoga">Yoga</option>
      </select>
      <input v-model="newEntry.duration" type="text" placeholder="Duration" />
      <input v-model="newEntry.distance" type="text" placeholder="Distance" />
      <input v-model="newEntry.description" type="text" placeholder="Description" />
    </form>
    <div v-else>
      <div>{{entry.created_at}}</div>
      <div v-if="entry.updated_at !== entry.created_at">{{entry.updated_at}}</div>
      <div>{{entry.category}}</div>
      <div>{{entry.duration}}</div>
      <div>{{entry.distance}}</div>
      <div>{{entry.description}}</div>
    </div>
    <button v-if="edit" @click="update" mt-3 mr2 bg-gray-200 p="y1 x3" font-bold inline-block text-green-500>Update</button>
    <button @click="edit = !edit" mt-3 mr2 bg-gray-200 p="y1 x3" font-bold inline-block text-green-500>
      <span v-if="edit">Cancel</span>
      <span v-else>Update</span>
    </button>
    <button @click="emit('remove', entry.id)" mt-3 bg-gray-300 p="y1 x3" font-bold inline-block text-red-600>Remove</button>
  </div>
</template>

<style scoped>

</style>