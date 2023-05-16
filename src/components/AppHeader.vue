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
          <span v-show="activeRoute === 'login'">Don't have an account</span>
          <RouterLink
            v-show="activeRoute === 'login'"
            :to="{ name: 'register' }"
            class="rounded-lg bg-dark px-4 py-2 text-light hover:bg-dark-light"
            >Create an account</RouterLink
          >
        </nav>
        <div v-if="!this.userStore.currentUser()" class="flex">
          <img
            :src="
              'https://api.dicebear.com/6.x/avataaars/svg?seed=' +
              uid +
              '&background=%23fff&radius=50&margin=10&size=64'
            "
            alt="Avatar"
          />
          <span class="text-dark">{{ userStore.userData.email.split('@')[0] }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { useUserStore } from '../stores/user'
export default {
  data() {
    return {
      activeRoute: null,
      userStore: useUserStore()
    }
  },
  watch: {
    $route(to) {
      this.activeRoute = to.name
    }
  }
}
</script>

<style></style>
