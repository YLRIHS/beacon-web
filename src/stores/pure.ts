// Utilities
import { defineStore } from 'pinia' 
 

export const usePureStore = defineStore('pure', {
  state: () => ({
    projectList: <any>[],
  }),
  actions: { 
    setProjectList(projectList: any) {
      this.projectList = projectList
    }
  }
})
