<template>
  <div class="grid min-h-80vh place-items-center">
    <app-loader v-if="userStore.loadingUser" />

    <div v-else class="flex flex-col gap-8 rounded-xl bg-light/80 p-10">
      <!-- LOGIN PAGE -->
      <div class="flex flex-col">
        <div class="flex justify-center">
          <div class="flex flex-col">
            <h1 class="text-2xl font-bold text-dark">Log In</h1>
            <p class="sr-only mt-2 text-dark">Log in to your account to continue</p>
          </div>
        </div>
        <div class="mt-8 flex justify-center">
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <label class="font-semibold text-dark" for="email">Email</label>
              <input
                class="rounded-lg border border-dark px-4 py-2"
                type="email"
                v-model="email"
                placeholder="Email"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="font-semibold text-dark" for="password">Password</label>
              <input
                class="rounded-lg border border-dark px-4 py-2"
                type="password"
                v-model="password"
                placeholder="Password"
              />
            </div>
            <div class="flex justify-end">
              <router-link class="text-dark underline" :to="{ name: 'forgot-password' }"
                >Forgot Password?</router-link
              >
            </div>
            <div class="flex justify-center">
              <button
                class="rounded-lg bg-dark px-4 py-2 font-bold text-light hover:bg-dark-light"
                type="submit"
                name="submit"
                @click.prevent="login"
                v-if="!userStore.loadingUser"
              >
                Log In
              </button>
            </div>
            <div class="flex justify-center">
              <p class="text-dark">
                Don't have an account?
                <router-link class="text-dark underline" :to="{ name: 'register' }"
                  >Create one</router-link
                >
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- END OF LOGIN PAGE -->
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
      email: '',
      password: '',
      userStore: useUserStore()
    }
  },
  methods: {
    async login() {
      await this.userStore.loginUser(this.email, this.password)
    }
  }
}
</script>

<style></style>
