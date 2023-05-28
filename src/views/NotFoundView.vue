<template>
  <div class="min-h-80vh flex flex-col justify-center items-center text-gray-800">
    <img class="w-1/3" src="@/assets/images/error_icon.png" alt="error" />
    <div class="-mt-10 flex justify-center flex-col items-center">
      <h1 class="text-2xl font-bold">404 ERROR!</h1>
      <p class="text-lg font-semibold mt-2">Page not found</p>
      <router-link class="btn btn-lg max-w-sm mt-2" :to="{ name: 'home' }">Go Home</router-link>
    </div>
  </div>
</template>
