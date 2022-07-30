import { User } from '@supabase/gotrue-js'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { supabase } from '../supabase'
import { Entry } from '../types'

export type RootState = {
  entries: Entry[],
  // TODO: fix type error bug
  // this should be 
  // but I can't get round the type error
  // user: User
  user: any
}

export const useStore = defineStore({
  id: 'mainStore',
  state: () => ({ 
    entries: [],
    user: {}
  } as RootState),
  actions: {
    
    findIndexById(id: string) {
      return this.entries.findIndex((entry) => entry.id === id)
    }
  }
})