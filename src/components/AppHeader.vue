<template>
  <header class="bg-light text-lg font-bold text-dark">
    <div class="mx-auto flex max-w-8xl items-center justify-between">
      <img alt="App Logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      <div class="flex">
        <nav class="flex items-center justify-center gap-12">
          <RouterLink to="/">Log In</RouterLink>
          <RouterLink class="rounded-lg bg-dark px-4 py-2 text-light" to="/about"
            >Create an account</RouterLink
          >
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {}
</script>

<style></style>
