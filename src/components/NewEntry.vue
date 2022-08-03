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
    reset()
  }
  const reset = () => {
    newEntry.category = ''
    newEntry.duration = 0
    newEntry.distance = ''
    newEntry.description = ''
    active.value = false
  }
  const active = ref(false)
</script>

<template>
  <h1 text-4xl my5>How have you moved this morning?</h1>
  <button @click="active = !active" 
    p="x4 y2" my5 bg-success text-white hover:bg-success-hover rounded-sm text-xl>
      <span items-center flex v-if="!active">Create New Entry<span ml-2 i-iconoir-check-circled-outline inline-block text-white></span></span>
      <span items-center flex v-else>Cancel<span ml-2 i-iconoir-cancel inline-block text-white></span></span>
    </button>
  <div v-if="active" my-5>
    <form @submit.prevent text-lg font-normal text-white w-full p5 text-left bg-gray:10 rounded>
      <div mb1>
        <select bg-lightblue-900:60 px3 py1 outline-none rounded-lg v-model="newEntry.category" placeholder="Category">
          <option value="Run">Run</option>
          <option value="Walk">Walk</option>
          <option value="Cycle">Cycle</option>
          <option value="Exercise Class">Exercise Class</option>
          <option value="Yoga">Yoga</option>
        </select>
      </div>
      <div mb1>
        <input bg-lightblue-900:60 px3 py1 outline-none rounded-lg v-model="newEntry.duration" type="text" placeholder="Duration" />
      </div>
      <div mb1>
        <input bg-lightblue-900:60 px3 py1 outline-none rounded-lg v-model="newEntry.distance" type="text" placeholder="Distance" />
      </div>
      <div mb1>
        <input bg-lightblue-900:60 px3 py1 outline-none rounded-lg v-model="newEntry.description" type="text" placeholder="Description" />
      </div>
      <button bg-success py1 px3 hover:bg-success-hover @click="create">Add</button>
    </form>
  </div>
</template>

<style scoped>

</style>