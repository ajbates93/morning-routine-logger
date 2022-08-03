import { User } from '@supabase/gotrue-js'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { supabase } from '../supabase'
import { createNewEntry, deleteEntry, updateEntry } from '../composables'
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
    createNewEntry(entry: Entry) {
      if (!entry) 
        return
      this.entries.unshift(entry)
      // push to server
      createNewEntry(entry)
    },
    updateEntry(id: string, payload: Entry) {
      if (!id || !payload)
        return
      const index = this.findIndexById(id)
      if (index !== -1) {
        this.entries[index] = payload
        updateEntry(id, payload)
      }
    },
    deleteEntry(id: string) {
      const index = this.findIndexById(id)
      if (index === -1)
        return
      
      this.entries.splice(index, 1)
      deleteEntry(id)
    },
    findIndexById(id: string) {
      return this.entries.findIndex((entry) => entry.id === id)
    }
  }
})