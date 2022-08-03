<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { Entry, NewEntry } from '../types';

  const { entry } = defineProps<{
    entry: Entry
  }>()
  const emit = defineEmits<{
    (event: 'update', id: string, payload: any): void,
    (event: 'remove', id: string): void
  }>()

  const edit = ref(false)
  const newEntry = reactive<NewEntry>({
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
  const iconString = ref('')
  const getIconString = () => {
    if (entry.category === 'Run')
      iconString.value = 'i-iconoir-running'
    if (entry.category === 'Walk')
      iconString.value = 'i-iconoir-walking'
    if (entry.category === 'Cycle')
      iconString.value = 'i-iconoir-cycling'
    if (entry.category === 'Exercise Class')
      iconString.value = 'i-iconoir-gym'
    if (entry.category === 'Yoga')
      iconString.value = 'i-iconoir-yoga'
  }
  onMounted(() => {
    getIconString()
  })
</script>

<template>
  <div mb-3 pb-3 text-center justify-center flex>
    <form v-if="edit" @submit.prevent text-lg font-normal text-white flex w-full p5 items-center justify-left bg-gray:10 rounded-l>
      <div :class="iconString" mr10 text-8xl></div>
      <div text-left>
        <div text-3xl mb2>{{new Date(entry.created_at).toLocaleDateString()}}</div>
        <div text-gray-800>
          <div>
            <span w-25 inline-block text-white>Category:</span>
            <select v-model="newEntry.category" placeholder="Category">
              <option value="Run">Run</option>
              <option value="Walk">Walk</option>
              <option value="Cycle">Cycle</option>
              <option value="Exercise Class">Exercise Class</option>
              <option value="Yoga">Yoga</option>
            </select>
          </div>
          <div mb1>
            <span w-25 inline-block text-white>Duration:</span><input v-model="newEntry.duration" type="text" placeholder="Duration" />
          </div>
          <div mb1>
            <span w-25 inline-block text-white>Distance:</span><input v-model="newEntry.distance" type="text" placeholder="Distance" />
          </div>
          <div mb1>
            <span w-25 inline-block text-white>Description:</span><input v-model="newEntry.description" type="text" placeholder="Description" />
          </div>
        </div>
      </div>
    </form>
    <div v-else text-lg font-normal text-white flex w-full p5 items-center justify-left bg-gray:10 rounded-l>
      <div :class="iconString" mr10 text-8xl></div>
      <div text-left>
        <div text-3xl mb2>{{new Date(entry.created_at).toLocaleDateString()}}</div>
        <div v-if="entry.updated_at !== entry.created_at">
          <span w-25 inline-block>Modified:</span> <span>{{entry.updated_at}}</span>
        </div>
        <div><span w-25 inline-block>Duration:</span> {{entry.duration}}</div>
        <div><span w-25 inline-block>Distance:</span> {{entry.distance}}</div>
        <div><span w-25 inline-block>Description:</span>: {{entry.description}}</div>
      </div>
    </div>
    <button v-if="edit" @click="update" bg-success hover:bg-success-hover items-center flex p="y1 x3" inline-block text-white>
      <span i-iconoir-check inline-block text-3xl></span>
    </button>
    <button @click="edit = !edit" :class="edit ? 'bg-gray-200 text-gray-600 hover:bg-gray-300' : 'bg-success text-white hover:bg-success-hover'" hover:bg-success-hover p="y1 x3" items-center flex inline-block>
      <span v-if="edit" i-iconoir-cancel inline-block text-3xl></span>
      <span v-else i-iconoir-edit inline-block text-3xl></span>
    </button>
    <button v-if="!edit" @click="emit('remove', entry.id)" bg-cancel hover:bg-cancel-hover items-center flex p="y1 x3" inline-block text-white>
      <span i-iconoir-trash inline-block text-3xl></span>
    </button>
  </div>
</template>

<style scoped>

</style>