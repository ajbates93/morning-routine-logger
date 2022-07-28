export interface Entry {
  id: string,
  // category: Category,
  category: string,
  duration: number,
  description: string,
  distance: number | string,
  link: string
}

// type Category = 'Run' | 'Walk' | 'Cycle' | 'Exercise Class' | 'Yoga'