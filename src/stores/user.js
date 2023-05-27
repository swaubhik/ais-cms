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
  getters: {
    isLoggedIn: (state) => !!state.userData,
    getuserName: (state) => state.userData.email.split('@')[0],
    getuserAvatar: (state) => 'https://api.dicebear.com/6.x/avataaars/svg?seed=' +  state.userData.uid + '&background=%23fff&radius=50&margin=10&size=64'
  },
  actions: {
    setErrorServer(error) {
      this.errorServer = error
    },
    async registerUser(email, password) {
      this.loadingUser = true
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        this.userData = userCredential.user
        router.push({ name: 'login' })
      } catch (error) {
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
      }
    },
    currentUser() {
      return new Promise((resolve, reject) => {
        const unsuscribe = onAuthStateChanged(
          auth,
          (user) => {
            if (user) {
              this.userData = {
                uid: user.uid,
                email: user.email
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
