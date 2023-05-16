import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { auth } from '../firebase'
import router from '../router'

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: null,
    loadingUser: false,
    loadingSession: false,
    errorServer: null
  }),
  actions: {
    setErrorServer(error) {
      this.errorServer = error
    },
    async registerUser(email, password) {
      this.loadingUser = true
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        this.userData = userCredential.user
        console.log({
          email: this.userData.email,
          uid: this.userData.uid,
        })
        router.push({ name: 'login' })
      } catch (error) {
        console.log(error)
        this.errorServer = error.message
      } finally {
        this.loadingUser = false
      }
    },
    async loginUser(email, password) {
      this.loadingUser = true
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        this.userData = userCredential.user
        router.push({ name: 'dashboard' })
      } catch (error) {
        console.log(error)
        this.errorServer = error.message
      } finally {
        this.loadingUser = false
      }
    },
    async logoutUser() {
      try {
        await signOut(auth)
        this.userData = null
        router.push({ name: 'login' })
      } catch (error) {
        console.log(error)
      }
    },
    currentUser() {
      return new Promise((resolve, reject) => {
        const unsuscribe = onAuthStateChanged(
          auth,
          (user) => {
            if (user) {
              this.userData = {
                email: user.email,
                uid: user.uid,
              }
            } else {
              this.userData = null
            }
            resolve(user)
          },
          (e) => reject(e)
        )
        unsuscribe()
      })
    }
  }
})
