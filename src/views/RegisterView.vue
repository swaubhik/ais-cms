<template>
  <div class="grid min-h-80vh place-content-center">
    <!-- Register Page -->
    <div
      class="mx-auto flex w-full max-w-md flex-col items-center justify-center space-y-4 rounded-xl bg-light/80 p-10 shadow-md"
    >
      <h1 class="text-center text-2xl font-bold">Register</h1>
      <form class="flex w-full flex-col items-center justify-center space-y-4">
        <input
          class="w-full rounded-md border border-dark-light px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dark-lighter"
          type="text"
          placeholder="Username"
        />
        <input
          class="w-full rounded-md border border-dark-light px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dark-lighter"
          type="email"
          placeholder="Email"
        />
        <input
          class="w-full rounded-md border border-dark-light px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dark-lighter"
          type="password"
          placeholder="Password"
        />
        <input
          class="w-full rounded-md border border-dark-light px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dark-lighter"
          type="password"
          placeholder="Confirm Password"
        />
        <button
          class="w-full rounded-md bg-dark px-4 py-2 font-bold text-light hover:bg-dark-light focus:outline-none focus:ring-2 focus:ring-dark"
          type="submit"
        >
          Register
        </button>
      </form>
      <div class="flex w-full flex-col items-center justify-center space-y-2">
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

<script></script>

<style></style>
