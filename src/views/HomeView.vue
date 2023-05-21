<template>
  <div class="hero min-h-80vh">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <img
        class="max-w-lg rounded-lg drop-shadow-2xl"
        src="@/assets/images/hero-image.png"
        alt="hero-image"
      />

      <div>
        <h1 class="text-8xl max-w-xl text-dark font-bold break-words">Easy Content Creation</h1>
        <p class="text-xl py-8">Create content for AIS - AI for Study</p>

        <router-link v-show="!userStore.isLoggedIn" class="btn" :to="{ name: 'login' }"
          >Get Started</router-link
        >
        <router-link v-show="userStore.isLoggedIn" class="btn btn-lg" :to="{ name: 'dashboard' }"
          >Dashboard</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import { useUserStore } from '../stores/user'
export default {
  setup() {
    const userStore = useUserStore()
    return { userStore }
  }
}
</script>
