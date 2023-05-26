import { defineStore } from 'pinia'
import { collection, getDocs, updateDoc, doc, arrayUnion } from 'firebase/firestore'
import { serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import router from '../router'
import { useChaptersStore } from './chapters'

export const usePagesStore = defineStore('pages', {
  state: () => ({
    pages: [],
    page: [],
    isloading: false
  }),
  actions: {
    async getPages() {
      this.isloading = true
      // pages are inside chapters collection
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

        this.pages = chapters
        this.isloading = false
      } catch (error) {
        console.error('Error getting chapters:', error)
      }
    },
    async getPage(id) {
      this.isloading = true
      // pages are inside chapters collection
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

        this.page = chapters.find((chapter) => chapter.id === id)
        this.isloading = false
      } catch (error) {
        console.error('Error getting chapters:', error)
      }
    },
    async addPage(page) {
      this.isloading = true
      // pages array are inside chapters collection in firestore
      const chapterPageRef = doc(db, 'chapters', useChaptersStore().chapter.id)
      console.log(chapterPageRef)
      try {
        // add page to firestore with createdAt timestamp and updatedAt timestamp
        await updateDoc(chapterPageRef, {
          pages: arrayUnion({
            ...page
          })
        })
        this.isloading = false
        this.pages.push({
          ...page
        })
        const chapter = useChaptersStore().chapter
        chapter.pages.push({
          ...page
        })
        router.push(`/chapter/${chapter.id}/create-page/${page.pageNumber}`)
      } catch (error) {
        console.error('Error adding page:', error)
      }
    },
    async updatePage(page) {
      this.isloading = true
      // pages are inside chapters collection
      const chapterCollectionRef = collection(db, 'chapters')

      try {
        // update page in firestore with updatedAt timestamp
        await updateDoc(doc(chapterCollectionRef, page.id), {
          ...page,
          updatedAt: serverTimestamp()
        })
        this.isloading = false
        router.push('/dashboard')
      } catch (error) {
        console.error('Error updating page:', error)
      }
    }
  }
})
