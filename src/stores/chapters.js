import { collection, getDocs } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { db } from '../firebase'

export const useChaptersStore = defineStore('chapter', {
  state: () => ({
    chapters: [],
    chapter: {},
    loading: false
  }),
  actions: {
    async getChapters() {
      this.loading = true
      const chapterCollectionRef = collection(db, 'chapters')

      try {
        const querySnapshot = await getDocs(chapterCollectionRef)
        const chapters = []

        querySnapshot.forEach((doc) => {
          chapters.push({
            id: doc.id,
            ...doc.data()
          })
        })

        this.chapters = chapters
        this.loading = false
      } catch (error) {
        console.error('Error getting chapters:', error)
      }
    }
  }
})
