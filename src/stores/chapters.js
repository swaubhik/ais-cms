import { collection , getDocs } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { db } from '../firebase'

export const useChaptersStore = defineStore('chapter', {
  state: () => ({
    chapters: [],
    chapter: {}
  }),
  actions: {
    async getChapters() {
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
      } catch (error) {
        console.error('Error getting chapters:', error)
      }
    }
  }
})
