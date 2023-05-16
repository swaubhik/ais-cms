<template>
  <div class="flex min-h-80vh items-center justify-center">
    <h1 class="text-4xl font-bold">Dashboard</h1>
    <img
      :src="
        'https://api.dicebear.com/6.x/avataaars/svg?seed=' +
        uid +
        '&background=%23fff&radius=50&margin=10&size=64'
      "
      alt="Avatar"
    />
    <div class="flex-1">
      <ul>
        <li v-for="chapter in chapters" :key="chapter.id">{{ chapter.id }} {{ chapter.title }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
// import { useUserStore } from '../stores/user'
import { useChaptersStore } from '../stores/chapters'
export default {
  data() {
    return {
      useChapters: useChaptersStore()
    }
  },
  // call getChapters() when component is created
  created() {
    this.useChapters.getChapters()
  },
  // get chapters from store
  computed: {
    chapters() {
      return this.useChapters.chapters
    }
  }
}
</script>

<style></style>
