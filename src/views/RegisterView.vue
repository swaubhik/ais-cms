<template>
  <div class="grid min-h-80vh place-content-center">
    <app-loader v-if="userStore.loadingUser" />
    <!-- Register Page -->
    <div
      v-else
      class="mx-auto flex w-full max-w-md flex-col items-center justify-center space-y-4 rounded-xl bg-light/80 p-10 shadow-md"
    >
      <h1 class="text-center text-2xl font-bold">Register</h1>
      <form
        @submit.prevent="register"
        class="flex w-full flex-col items-center justify-center space-y-4"
        v-if="!userStore.loadingUser"
      >
        <input
          class="w-full rounded-md border border-dark-light px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dark-lighter"
          type="text"
          placeholder="Username"
          v-model="username"
          required
        />
        <input
          v-model="email"
          class="w-full rounded-md border border-dark-light px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dark-lighter"
          type="email"
          placeholder="Email"
          required
        />
        <input
          v-model="password"
          class="w-full rounded-md border border-dark-light px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dark-lighter"
          type="password"
          placeholder="Password"
          required
        />
        <input
          v-model="confirmPassword"
          class="w-full rounded-md border border-dark-light px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dark-lighter"
          type="password"
          placeholder="Confirm Password"
          required
        />
        <button
          class="w-full rounded-md bg-dark px-4 py-2 font-bold text-light hover:bg-dark-light focus:outline-none focus:ring-2 focus:ring-dark"
          :disabled="userStore.loadingUser"
          type="submit"
        >
          Register
        </button>
      </form>
      <div class="flex w-full flex-col items-center justify-center space-y-2">
        <span v-if="userStore.errorServer" class="text-sm font-bold text-error">
          {{ userStore.errorServer }} ❌
        </span>
        <span class="text-sm">Already have an account?</span>
        <router-link
          class="text-dark hover:underline focus:outline-none focus:ring-2 focus:ring-dark"
          to="/login"
        >
          Login
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import AppLoader from '../components/AppLoader.vue'
import { useUserStore } from '../stores/user'

export default {
  components: { AppLoader },
  data() {
    return {
      userStore: useUserStore(),
      email: '',
      password: '',
      confirmPassword: '',
      username: ''
    }
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        this.userStore.setErrorServer("Passwords don't match")
      } else {
        await this.userStore.registerUser(this.email, this.password)
      }
    }
  }
}
</script>
