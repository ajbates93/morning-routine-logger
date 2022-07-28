<script setup lang="ts">
  import { useStore } from './store';
  import { supabase } from './supabase';

  const store = useStore()
  store.user = supabase.auth.user()
  supabase.auth.onAuthStateChange((_, session) => {
    store.user = session?.user
  })
  
</script>

<template>
  <div>
    <AppHeader />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>