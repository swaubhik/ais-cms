<template>
  <div class="grid place-items-center min-h-80vh w-full">
    <AppLoader v-if="chapterStore.isloading" />
    <div class="mockup-phone text-dark">
      <div class="camera"></div>
      <div class="display">
        <div
          v-if="pageNumber == 0"
          class="artboard bg-white phone-1 relative bg-cover bg-no-repeat bg-center"
          :style="{ backgroundImage: `url(${chapter.imageUrl})` }"
          style="text-shadow: black 1px 1px 1px 1px"
        >
          <div class="p-4">
            <h3 class="text-2xl font-bold mb-2 mt-12">
              {{ chapter.title ? chapter.title : 'Title' }}
            </h3>

            <p class="mt-6 break-words">
              {{
                chapter.description
                  ? chapter.description
                  : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quaerat, dolore tempora dicta quam alias temporibus laboriosam'
              }}
            </p>
            <div class="mt-4 font-bold flex gap-1">
              <span>by</span>
              <span class="capitalize">{{ chapter.creator }}</span>
            </div>
            <div class="mt-4 absolute bottom-0 left-1/2 -translate-x-1/2">
              <img
                src="@/assets/images/character_1.png"
                alt="Chacter-Image"
                class="w-full max-h-64 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- add two button for previous and next page -->
    <div class="flex justify-between w-full mt-4">
      <router-link
        class="btn"
        :to="{ name: 'chapter', params: { id: chapterStore.chapter.previousChapterId } }"
      >
        Previous
      </router-link>
      <button class="bg-dark text-white px-4 py-2 rounded-md" @click="chapterStore.nextPage">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { useChaptersStore } from '../stores/chapters'
import AppLoader from '../components/AppLoader.vue'

export default {
  components: {
    AppLoader
  },
  data() {
    return {
      chapterStore: useChaptersStore(),
      pageNumber: 0
    }
  },
  created() {
    this.pageNumber = this.$route.query.pageNumber
      ? parseInt(this.$route.query.pageNumber)
      : 0
    this.getChapter()
    this.getPages()
    this.getPage()
  },
  computed: {
    chapter() {
      return this.chapterStore.chapter
    }
  },
  methods: {
    async getChapter() {
      await this.chapterStore.getChapter(this.$route.params.id)
    },
    async getPages() {
      await this.chapterStore.getPages(this.$route.params.id, this.pageNumber)
    },
    async getPage() {
      console.log(this.pageNumber)
      await this.chapterStore.getPage(this.$route.params.id, this.pageNumber)
    }
  }
}
</script>