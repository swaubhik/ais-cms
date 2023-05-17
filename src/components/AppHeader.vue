<template>
  <header class="bg-light py-2 text-lg font-bold text-dark">
    <div class="mx-auto flex max-w-8xl items-center justify-between">
      <RouterLink :to="{ name: 'home' }"
        ><img alt="App Logo" class="logo" src="@/assets/logo.svg" width="125" height="125"
      /></RouterLink>
      <div class="flex">
        <nav class="flex items-center justify-center gap-12">
          <span v-show="activeRoute === 'register'">Already have an account</span>
          <RouterLink
            v-show="activeRoute === 'register'"
            :to="{ name: 'login' }"
            :class="
              activeRoute === 'register'
                ? 'rounded-lg bg-dark px-4 py-3 text-light hover:bg-dark-light'
                : ''
            "
            >Log In</RouterLink
          >
          <RouterLink v-show="activeRoute === 'home'" :to="{ name: 'login' }">Log In</RouterLink>
          <span v-show="activeRoute === 'login'">Don't have an account</span>
          <RouterLink
            v-show="activeRoute === 'login'"
            :to="{ name: 'register' }"
            class="rounded-lg bg-dark px-4 py-2 text-light hover:bg-dark-light"
            >Create an account</RouterLink
          >
          <RouterLink
            v-show="activeRoute === 'home'"
            :to="{ name: 'register' }"
            class="rounded-lg bg-dark px-4 py-2 text-light hover:bg-dark-light"
            >Create an account</RouterLink
          >
        </nav>
      </div>
      <button v-show="userStore.userData" class="flex items-center justify-center">
        <div v-if="userStore.currentUser" class="flex items-center justify-center">
          <img :src="avatar" alt="Avatar" />
          <span v-if="username" class="text-dark">{{ username.email }}</span>
        </div>
        <div class="relative flex items-center ml-2 cursor-pointer">
          <button :class="{ 'transform rotate-180': isDropdownOpen }" @click="toggleDropdown">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          <div
            v-show="isDropdownOpen"
            class="absolute bg-light px-2 py-4 rounded-lg shadow-lg top-10 right-0 z-10"
          >
            <button @click="userStore.logoutUser()">Logout</button>
          </div>
        </div>
      </button>
    </div>
  </header>
</template>

<script>
import { useUserStore } from '../stores/user'
export default {
  data() {
    return {
      activeRoute: null,
      userStore: useUserStore(),
      isDropdownOpen: false
    }
  },
  watch: {
    $route(to) {
      console.log(to.name)
      this.activeRoute = to.name
    }
  },
  computed: {
    uid() {
      return this.userStore.currentUser.uid
    },
    username() {
      return this.userStore.userData
    },
    avatar() {
      return (
        'https://api.dicebear.com/6.x/avataaars/svg?seed=' +
        this.userStore.currentUser.uid +
        '&background=%23fff&radius=50&margin=10&size=64'
      )
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    }
  }
}
</script>

<style></style>
