<script setup lang="ts">
  import { supabase } from '../supabase'
  import { useStore } from '../store'
  import { onMounted, ref } from 'vue';

  const loading = ref(true)
  const signingOut = ref(false)
  const username = ref('')
  const avatar_url = ref('')
  const store = useStore()
  const edit = ref(false)

  const getProfile = async () => {
    try {
      loading.value = true
      store.user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', store.user.id)
        .single()
      
      if (error && status !== 406) throw error

      if (data) {
        username.value = data.username
        avatar_url.value = data.avatar_url
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  }

  const updateProfile = async () => {
    try {
      loading.value = true
      store.user = supabase.auth.user()

      const updates = {
        id: store.user.id,
        username: username.value,
        avatar_url: avatar_url.value,
        updated_at: new Date()
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: "minimal" // don't return the value after inserting
      })

      if (error) throw error
    } catch (error: any) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  }

  const signOut = async () => {
    try {
      loading.value = true
      signingOut.value = true
      let { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error: any) {
      alert(error.message)
    } finally {
      loading.value = false
      signingOut.value = false
    }
  }
  
  onMounted(() => {
    getProfile()
  })
  
</script>

<template>
  <div p5 justify-center flex flex-col items-center>
    <div bg-gray:10 text-white p10 my-2>
      <h1 text-4xl>Welcome back, {{store.user.email}}</h1>
    </div>
    <div id="actions" w-full flex justify-center items-center my-2>
      <button @click="edit = !edit" bg-success text-white py2 px3 mx-3 text-xl>{{edit ? 'Cancel' : 'Edit Account'}}</button>
      <button @click="signOut" bg-red-600 text-white py2 px3 mx-3 text-xl>{{ signingOut ? 'Signing Out' : 'Sign Out' }}</button>
    </div>
    <div v-if="store.user">
      <form v-if="edit">
        <div>
          <label for="email">Email</label>
          <input id="email" type="text" :value="store.user.email" disabled />
        </div>
        <div>
          <label for="username">Name</label>
          <input id="username" type="text" v-model="username" />
        </div>
        <div>
          <input
              @click="updateProfile"
              type="submit"
              button bg-blue-400 p2 text-white
              :value="loading ? 'Loading ...' : 'Update'"
              :disabled="loading"
            />
        </div>
        <div>
          <button @click="signOut" :disabled="loading">Sign Out</button>
        </div>
      </form>
    </div>
    <div v-else>
      No user found...
    </div>
  </div>
</template>

<style scoped>

</style>