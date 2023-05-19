import { collection, getDocs, addDoc } from 'firebase/firestore'
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
    },
    async getChapter(id) {
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

        this.chapter = chapters.find((chapter) => chapter.id === id)
        this.loading = false
      } catch (error) {
        console.error('Error getting chapters:', error)
      }
    },
    async addChapter(chapter) {
      this.loading = true
      const chapterCollectionRef = collection(db, 'chapters')

      try {
        // add chapter to firestore with createdAt timestamp and updatedAt timestamp
        await addDoc(chapterCollectionRef, {
          ...chapter,
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 0
        })
        this.loading = false
        console.log('Chapter added!' + chapterCollectionRef.id)
      } catch (error) {
        console.error('Error adding chapter:', error)
      }
    },
  }
})
