export interface Entry {
  id: string,
  user_id: string,
  created_at: Date,
  updated_at: Date,
  // category: Category,
  category: string,
  duration: number,
  description: string,
  distance: number | string,
  link: string
}

export interface NewEntry {
  category: string,
  duration: number,
  distance: string | number,
  description: string
}

// type Category = 'Run' | 'Walk' | 'Cycle' | 'Exercise Class' | 'Yoga'