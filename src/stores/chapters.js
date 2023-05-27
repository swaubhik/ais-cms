import { collection, getDocs, addDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { db } from '../firebase'
import router from '../router'

export const useChaptersStore = defineStore('chapter', {
  state: () => ({
    chapters: [],
    chapter: [],
    curentChapterPages: [],
    currentPage: {},
    isloading: false
  }),

  actions: {
    async getChapters() {
      this.isloading = true
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
        this.isloading = false
      } catch (error) {
        console.error('Error getting chapters:', error)
      }
    },
    async getChapter(id) {
      this.isloading = true
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
        this.isloading = false
      } catch (error) {
        console.error('Error getting chapters:', error)
      }
    },
    async addChapter(chapter) {
      this.isloading = true
      const chapterCollectionRef = collection(db, 'chapters')

      try {
        // add chapter to firestore with createdAt timestamp and updatedAt timestamp
        const docRef = await addDoc(chapterCollectionRef, {
          title: chapter.title,
          description: chapter.description,
          imageUrl: chapter.coverImage,
          creator: chapter.creator,
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 0,
          pages: [
            {
              imageUrl: chapter.bgImage,
              longText: chapter.description,
              pageNumber: 0
            }
          ]
        })
        this.isloading = false
        this.chapters.push({
          ...chapter
        })

        router.push({ name: 'dashborad' })
      } catch (error) {
        console.error('Error adding chapter:', error)
      }
    },
    async getPages(id) {
      this.isloading = true
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

        this.curentChapterPages = chapters.find((chapter) => chapter.id === id).pages
        this.isloading = false
      } catch (error) {
        console.error('Error getting chapters:', error)
      }
    },
    async getPage(id, pageNumber) {
      this.isloading = true
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

        this.currentPage = chapters
          .find((chapter) => chapter.id === id)
          .pages.find((page) => page.pageNumber == pageNumber)
        this.isloading = false
      } catch (error) {
        console.error('Error getting chapters:', error)
      }
    }
  }
})
