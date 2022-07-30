// Entries

import { supabase } from "../supabase";
import { Entry } from "../types";

export const createNewEntry = async (entry: Entry) => {
  if (!entry) return
      
  const { data, error } = await supabase.from('entries').insert(entry, { returning: "minimal"})
  
  if (error) throw error
}

export const updateEntry = async (id: string, payload: Entry) => {
  if (!id || !payload) return

  const { data, error } = await supabase
    .from('entries')
    .update(payload)
    .match({ id: id })
      
  if (error) throw error
}

export const deleteEntry = async (id: string) => {
  if (!id) return
      
  const { data, error } = await supabase
    .from('entries')
    .delete()
    .match({ id: id })
  
  if (error) throw error
}