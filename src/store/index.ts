import { defineStore } from 'pinia'
import { Entry } from '../types'

export type RootState = {
  entries: Entry[]
}

export const useStore = defineStore({
  id: 'mainStore',
  state: () => ({ entries: [] } as RootState),
  actions: {
    createNewEntry(entry: Entry) {
      if (!entry)
        return
      
      this.entries.push(entry)
    },
    updateEntry(id: string, payload: Entry) {
      if (!id || !payload)
        return

      const index = this.findIndexById(id)

      if (index !== -1)
        this.entries[index] = payload
    },
    deleteEntry(id: string) {
      const index = this.findIndexById(id)

      if (index === -1)
        return
      
      this.entries.splice(index, 1)
    },
    findIndexById(id: string) {
      return this.entries.findIndex((entry) => entry.id === id)
    }
  }
})