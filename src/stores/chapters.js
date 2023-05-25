import { collection, getDocs, addDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../firebase'
import router from '../router'

export const useChaptersStore = defineStore('chapter', {
  state: () => ({
    chapters: [],
    chapter: [],
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
              pageNumber: 0,
            }
          ]
        })
        this.isloading = false
        this.chapters.push({
          ...chapter
        })

        router.push({ name: 'chapter', params: { id: docRef.id } })
      } catch (error) {
        console.error('Error adding chapter:', error)
      }
    },
    async uploadFiles(files) {
      const storageRef = ref(storage, 'chapters/' + files.name)
      const uploadTask = uploadBytesResumable(storageRef, files)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL)
          })
        }
      )
    }
  }
})
