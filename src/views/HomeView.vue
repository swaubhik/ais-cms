<template>
  <div class="flex items-center justify-center font-bold">
    <div class="flex-1">
      <h1 class="text-8xl text-dark">Easy Content Creation</h1>
      <p class="mt-8 text-2xl text-dark">Create content for AIS - AI for Study</p>
      <div class="mt-8 flex">
        <router-link
          class="mr-4 rounded-lg bg-dark px-4 py-2 text-xl text-light shadow-xl hover:bg-dark-lighter"
          :to="{ name: 'login' }"
          >Get Started</router-link
        >
      </div>
    </div>
    <div class="flex">
      <img class="max-w-2xl drop-shadow-xl" src="@/assets/images/hero-image.png" alt="hero-image" />
    </div>
  </div>
</template>
<script></script>
