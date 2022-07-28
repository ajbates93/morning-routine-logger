<script setup lang="ts">
  import { ref } from 'vue';
  import { supabase } from '../supabase'
  
  const loading = ref<Boolean>(false)
  const email = ref<string | undefined>('')

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
  <form row flex="~ center" @submit.prevent="handleLogin">
    <div>
      <h1>Morning Routine Logger</h1>
      <p>Sign in via magic link with your email below</p>
      <div>
        <input p2 border="~ gray-200" type="email" placeholder="Your email" v-model="email">
      </div>
      <div>
        <input type="submit" :value="loading ? 'Loading' : 'Send magic link'" :disabled="loading" />
      </div>
    </div>
  </form>
</template>

<style scoped>

</style>