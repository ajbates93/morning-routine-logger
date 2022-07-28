<template>
  <div p5>
    <h1 text-xl mb-5>Dashboard</h1>
    <div>
      <h3 text-lg mb-3 font-bold>New Entry</h3>
      <form @submit.prevent bg-gray-200 p3>
        <select v-model="input.category" type="text" placeholder="Category">
          <option value="Run">Run</option>
          <option value="Walk">Walk</option>
          <option value="Cycle">Cycle</option>
          <option value="Exercise Class">Exercise Class</option>
          <option value="Yoga">Yoga</option>
        </select>
        <input v-model="input.duration" type="text" placeholder="Duration" />
        <input v-model="input.distance" type="text" placeholder="Distance" />
        <input v-model="input.description" type="text" placeholder="Description" />
        <button @click="createNewEntry">Add</button>
      </form>
      <div my5 v-if="entries.length">
        <h3 text-lg mb-3 font-bold>Previous Entries</h3>
        <div mb-3 pb-3 border="b gray-200" v-for="(entry, idx) in entries" :key="idx">
          <div>{{entry.id}}</div>
          <div>{{entry.category}}</div>
          <div>{{entry.duration}}</div>
          <div>{{entry.distance}}</div>
          <div>{{entry.description}}</div>
          <div mt-3 mr2 bg-gray-200 p="y1 x3" font-bold inline-block text-green-500>Update</div>
          <div @click="removeEntry(entry.id)" mt-3 bg-gray-300 p="y1 x3" font-bold inline-block text-red-600>Remove</div>
        </div>
      </div>
      <div v-else>
        No entries entered yet... Add an entry above!
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { useStore } from '../store';
  import { Entry } from '../types'
  import { uuid } from 'vue3-uuid'

  const input = reactive({ 
    category: '', 
    duration: 0, 
    distance: '', 
    description: '',
  })

  const store = useStore()
  const entries = store.entries

  const createNewEntry = () => {
    const e: Entry = {
      id: uuid.v4(),
      category: input.category,
      duration: input.duration,
      distance: input.distance,
      description: input.description,
      link: ''
    }
    store.createNewEntry(e)
    input.category = ''
    input.duration = 0
    input.distance = ''
    input.description = ''
  }
  const removeEntry = (id: string) => {
    store.deleteEntry(id)
  }
</script>

<style scoped>

</style>