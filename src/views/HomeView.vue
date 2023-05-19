<template>
  <div class="flex min-h-80vh justify-center items-center">
    <div class="flex-1">
      <h1 class="text-8xl text-dark">Easy Content Creation</h1>
      <p class="mt-8 text-2xl text-dark">Create content for AIS - AI for Study</p>
      <div class="mt-8 flex">
        <router-link
          v-show="!userStore.isLoggedIn"
          class="mr-4 rounded-lg bg-dark px-4 py-2 text-xl text-light shadow-xl hover:bg-dark-lighter"
          :to="{ name: 'login' }"
          >Get Started</router-link
        >
        <router-link
          v-show="userStore.isLoggedIn"
          class="mr-4 rounded-lg bg-dark px-4 py-2 text-xl text-light shadow-xl hover:bg-dark-lighter"
          :to="{ name: 'dashboard' }"
          >Dashboard</router-link>
      </div>
    </div>
    <div class="flex">
      <img class="max-w-2xl drop-shadow-xl" src="@/assets/images/hero-image.png" alt="hero-image" />
    </div>
  </div>
</template>
<script>
import { useUserStore } from '../stores/user';
export default {
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
};
</script>
