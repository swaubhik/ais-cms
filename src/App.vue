<template>
  <main class="min-h-screen relative bg-primary bg-hero-pattern bg-cover bg-center bg-no-repeat">
    <app-header />
    <div class="mx-auto max-w-8xl">
      <router-view />
    </div>
    <app-footer />
  </main>
</template>

<script>
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
export default {
  components: { AppHeader, AppFooter }
}
</script>
