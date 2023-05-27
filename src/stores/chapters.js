import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { db } from '../firebase'
import { useUserStore } from './user'
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
          if (
            doc.data().creatorUid === useUserStore().userData.uid ||
            (useUserStore().userData.uid === 'HXSjv7RqKAfxNLJmlNPvtERCP7B3' &&
              doc.data().status === 0)
          ) {
            chapters.push({
              id: doc.id,
              ...doc.data()
            })
          }
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
    async addChapter(chapter, creatorUid) {
      this.isloading = true
      const chapterCollectionRef = collection(db, 'chapters')

      try {
        // add chapter to firestore with createdAt timestamp and updatedAt timestamp
        const docRef = await addDoc(chapterCollectionRef, {
          title: chapter.title,
          description: chapter.description,
          imageUrl: chapter.coverImage,
          creator: chapter.creator,
          creatorUid: creatorUid,
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

        router.push({ name: 'dashboard' })
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
    },
    async acceptChapter(id) {
      this.isloading = true
      const chapterDocRef = doc(db, 'chapters', id)
      try {
        await updateDoc(chapterDocRef, { status: 1 })
        this.isloading = false
      } catch (error) {
        console.error('Error getting chapters:', error)
      }
    },
    async rejectChapter(id) {
      this.isloading = true
      const chapterDocRef = doc(db, 'chapters', id)
      try {
        await updateDoc(chapterDocRef, { status: -1 })
        this.isloading = false
      } catch (error) {
        console.error('Error getting chapters:', error)
      }
    }
  }
})
