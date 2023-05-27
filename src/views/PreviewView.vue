<template>
  <div class="grid grid-flow-col place-items-center min-h-80vh w-full">
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
    <div
      v-if="userStore.userData.uid === 'HXSjv7RqKAfxNLJmlNPvtERCP7B3'"
      class="flex flex-col justify-between h-full"
    >
      <button @click="acceptChapter()" class="btn btn-success gap-2 mt-10">
        Accept
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <button @click="rejectChapter()" class="btn btn-error gap-2">
        Reject
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { useChaptersStore } from '../stores/chapters'
import AppLoader from '../components/AppLoader.vue'
import { useUserStore } from '../stores/user'

export default {
  components: {
    AppLoader
  },
  data() {
    return {
      chapterStore: useChaptersStore(),
      userStore: useUserStore(),
      pageNumber: 0
    }
  },
  created() {
    this.pageNumber = this.$route.query.pageNumber ? parseInt(this.$route.query.pageNumber) : 0
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
      await this.chapterStore.getPage(this.$route.params.id, this.pageNumber)
    },
    async acceptChapter() {
      await this.chapterStore.acceptChapter(this.$route.params.id)
      this.$router.push({ name: 'dashboard' })
    },
    async rejectChapter() {
      await this.chapterStore.rejectChapter(this.$route.params.id)
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>