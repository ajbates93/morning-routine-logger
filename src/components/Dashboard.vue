<template>
  <div p5>
    <h1 text-xl mb-5>Dashboard</h1>
    <div>
      <h3 text-lg mb-3 font-bold>New Entry</h3>
      <form @submit.prevent bg-gray-200 p3>
        <select v-model="input.category" placeholder="Category">
          <option value="Run">Run</option>
          <option value="Walk">Walk</option>
          <option value="Cycle">Cycle</option>
          <option value="Exercise Class">Exercise Class</option>
          <option value="Yoga">Yoga</option>
        </select>
        <input v-model="input.duration" type="text" placeholder="Duration" />
        <input v-model="input.distance" type="text" placeholder="Distance" />
        <input v-model="input.description" type="text" placeholder="Description" />
        <button @click="create">Add</button>
      </form>
      <div my5 v-if="store.entries.length">
        <h3 text-lg mb-3 font-bold>Previous Entries</h3>
        <EntryRow v-for="(entry, idx) in store.entries" :key="idx"
          @update="update" @remove="remove" :entry="entry" />
      </div>
      <div v-else>
        No entries entered yet... Add an entry above!
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import { useStore } from '../store';
  import { Entry } from '../types'
  import { uuid } from 'vue3-uuid'
  import { supabase } from '../supabase';
  import { createNewEntry, deleteEntry, updateEntry } from '../composables'
  import EntryRow from '../components/EntryRow.vue'

  const input = reactive({ 
    category: '', 
    duration: 0, 
    distance: '', 
    description: '',
  })

  const store = useStore()

  const loading = ref(false)
  const reset = () => {
    input.category = ''
    input.duration = 0
    input.distance = ''
    input.description = ''
  }
  const getEntries = async () => {
    try {
      loading.value = true
      console.log('i am running')
      if (!store.user) return
      let { data, error } = await supabase
        .from('entries')
        .select()
        // .eq('user_id', store.user.id)

      if (error) throw error
      if (data) {
        console.log(data)
        store.entries = data
      }
    }
    catch (error: any) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  } 

  const create = () => {
    const now = new Date()
    const e: Entry = {
      id: uuid.v4(),
      user_id: store.user.id,
      created_at: now,
      updated_at: now,
      category: input.category,
      duration: input.duration,
      distance: input.distance,
      description: input.description,
      link: ''
    }
    createNewEntry(e)
    getEntries()
    reset()
  }
  
  const remove = (id: string) => {
    deleteEntry(id)
    getEntries()
  }

  const update = (id: string, payload: Entry) => {
    const now = new Date()
    const e: Entry = {
      id: payload.id,
      user_id: payload.user_id,
      created_at: payload.created_at,
      updated_at: now,
      category: payload.category,
      duration: payload.duration,
      distance: payload.distance,
      description: payload.description,
      link: ''
    }
    updateEntry(id, payload)
    getEntries()
  }

  onMounted(() => {
    getEntries()
  })
</script>

<style scoped>

</style>