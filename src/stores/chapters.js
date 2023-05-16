import {doc, docRef} from '@/firebase'
import {collection, collectionRef} from '@/firebase'
import {getDocs, getDoc, addDoc, updateDoc, deleteDoc} from 'firebase/firestore'
import { defineStore } from 'pinia'

export const useChaptersStore = defineStore('chapter', {
    state: () => ({
        chapters: [],
        chapter: {},
    }),
    actions: {
        async getChapters() {
            const chapters = []
            const querySnapshot = await getDocs(collectionRef('chapters'))
            querySnapshot.forEach((doc) => {
                chapters.push(doc.data())
            })
            this.chapters = chapters
        }
    }
})