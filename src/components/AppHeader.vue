<template>
  <header class="navbar bg-base-100 py-2 px-20">
    <div class="flex-1">
      <RouterLink :to="{ name: 'home' }"
        ><img alt="App Logo" class="logo" src="@/assets/logo.svg" width="125" height="125"
      /></RouterLink>
    </div>
    <div v-show="!userStore.isLoggedIn" class="flex-none">
      <nav class="menu menu-horizontal px-1 items-center gap-10">
        <span v-show="activeRoute === 'register'">Already have an account</span>
        <RouterLink
          v-show="activeRoute === 'register'"
          :to="{ name: 'login' }"
          :class="activeRoute === 'register' ? 'btn' : ''"
          >Log In</RouterLink
        >
        <RouterLink class="btn btn-ghost" v-show="activeRoute === 'home'" :to="{ name: 'login' }"
          >Log In</RouterLink
        >
        <span v-show="activeRoute === 'login'">Don't have an account</span>
        <RouterLink v-show="activeRoute === 'login'" :to="{ name: 'register' }" class="btn"
          >Create an account</RouterLink
        >
        <RouterLink v-show="activeRoute === 'home'" :to="{ name: 'register' }" class="btn"
          >Create an account</RouterLink
        >
      </nav>
    </div>
    <div v-if="userStore.isLoggedIn" class="flex-none">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost avatar">
          <div class="rounded-full w-12">
            <img :src="userStore.getuserAvatar" alt="Avatar" />
          </div>
          <span class="capitalize">{{ userStore.getuserName }}</span>
        </label>
        <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
          <li>
            <button @click="userStore.logoutUser()">Logout</button>
          </li>
        </ul>
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
