<template>
  <div py10 px5 max-w-200 mx-auto text-center v-if="store.user">
    <NewEntry @create="newEntry => create(newEntry)" />
    <div v-if="loading" text-center text-white text-2xl>
      <span class="rotate" text-center i-carbon-circle-dash text-5xl  m="y3 x-auto" block></span>
      Loading...
    </div>
    <div text-center my5 v-else-if="store.entries.length">
      <h3 text-3xl my-5>Previous Entries</h3>
      <EntryRow v-for="(entry, idx) in store.entries" :key="idx"
        @update="update" @remove="remove" :entry="entry" />
    </div>
    <div v-else>
      No entries entered yet... Add an entry above!
    </div>
  </div>
  <div py10 px5 max-w-200 mx-auto text-center v-else>
    <p text-xl mb5>To track your morning routines, you must first log in to your account.</p>
    <router-link to="/login" text-xl bg-success hover:bg-success-hover items-center inline-flex p="y1 x3" inline-block text-white>Log In</router-link>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import { useStore } from '../store';
  import { Entry, NewEntry as INewEntry } from '../types'
  import { uuid } from 'vue3-uuid'
  import { supabase } from '../supabase';
  import EntryRow from '../components/EntryRow.vue'
  import NewEntry from './NewEntry.vue';

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
        .order('created_at', { ascending: false })
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

  const create = (newEntry: INewEntry) => {
    const now = new Date()
    const e: Entry = {
      id: uuid.v4(),
      user_id: store.user.id,
      created_at: now,
      updated_at: now,
      category: newEntry.category,
      duration: newEntry.duration,
      distance: newEntry.distance,
      description: newEntry.description,
      link: ''
    }
    store.createNewEntry(e)
    reset()
  }
  
  const remove = (id: string) => {
    store.deleteEntry(id)
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
    store.updateEntry(id, payload)
  }

  onMounted(() => {
    getEntries()
  })
</script>

<style scoped>
.rotate {
  -webkit-animation:spin 3s linear infinite;
  -moz-animation:spin 3s linear infinite;
  animation:spin 3s linear infinite;
}
@-moz-keyframes spin { 
    100% { -moz-transform: rotate(360deg); } 
}
@-webkit-keyframes spin { 
    100% { -webkit-transform: rotate(360deg); } 
}
@keyframes spin { 
    100% { 
        -webkit-transform: rotate(360deg); 
        transform:rotate(360deg); 
    } 
}

</style>