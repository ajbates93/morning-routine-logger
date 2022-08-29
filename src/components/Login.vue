<script setup lang="ts">
  import { ref } from 'vue';
  import { supabase } from '../supabase'
  import { useStore } from '../store';
  
  const store = useStore()
  const loading = ref(false)
  const email = ref('')

  const handleLogin = async () => {
    try {
      loading.value = true
      const { error } = await supabase.auth.signIn({ email: email.value })
      if (error) throw error
      alert("Check your email for the login link!")
    } catch (error: any) {
      alert(error.error_description || error.message)
    } finally {
      loading.value = false
    }
  }
  
</script>

<template>
  <form v-if="!store.user" row flex="~ center" @submit.prevent="handleLogin">
    <div text-center max-w-200 mx-auto p="y10 x5">
      <p text-xl mb5>Enter your email and check your inbox for a magic link!</p>
      <div flex items-center justify-center>
        <input text-xl p="x2 y1" rounded-sm mr5 text-gray-700 type="email" placeholder="Your email" v-model="email">
        <input text-xl bg-success hover:bg-success-hover hover:cursor-pointer items-center inline-flex p="y1 x3" inline-block text-white
          type="submit" :value="loading ? 'Sending...' : 'Send magic link'" :disabled="loading" />
      </div>
      <div>
      </div>
    </div>
  </form>
</template>

<style scoped>

</style>