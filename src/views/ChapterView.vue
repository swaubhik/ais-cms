<template>

</template>
<script>
import { useChaptersStore } from '../stores/chapters'
export default {
  data() {
    return {
      useChapters: useChaptersStore()
    }
  },
  created() {
    this.useChapters.getChapter(this.$route.params.id)
  },
  computed: {
    chapter() {
      return this.useChapters.chapter
    }
  }
}
</script>
