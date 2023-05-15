<template>
  <header class="bg-light py-2 text-lg font-bold text-dark">
    <div class="mx-auto flex max-w-8xl items-center justify-between">
      <RouterLink :to="{ name: 'home' }"
        ><img alt="App Logo" class="logo" src="@/assets/logo.svg" width="125" height="125"
      /></RouterLink>
      <div class="flex">
        <nav class="flex items-center justify-center gap-12">
          <RouterLink v-show="activeRoute !== 'login'" :to="{ name: 'login' }">Log In</RouterLink>
          <span v-show="activeRoute === 'login'">Don't have an account</span>
          <RouterLink
            :to="{ name: 'register' }"
            class="rounded-lg bg-dark px-4 py-2 text-light hover:bg-dark-light"
            >Create an account</RouterLink
          >
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      activeRoute: null
    }
  },
  watch: {
    $route(to) {
      this.activeRoute = to.name
      console.log(this.activeRoute)
    }
  }
}
</script>

<style></style>
