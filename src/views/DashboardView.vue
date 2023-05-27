<template>
  <div class="min-h-80vh py-20">
    <div class="flex justify-between items-center">
      <div class="flex flex-col gap-10">
        <h1 class="text-4xl font-bold">My Chapters</h1>
        <p class="text-lg font-semibold">Select a chapter to view, edit or open it’s dashboard.</p>
      </div>
      <div class="flex flex-col gap-2">
        <router-link
          :to="{ name: 'add-chapter' }"
          class="flex justify-center items-center bg-light text-gray-900 font-semibold px-4 py-2 rounded-lg"
        >
          <svg
            class="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          New Chapter
        </router-link>
        <!-- toggle edit button -->
        <button
          @click="toggleEdit"
          class="flex justify-center items-center bg-light text-gray-900 font-semibold px-4 py-2 rounded-lg"
        >
          <svg
            v-if="!editMode"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"
            />
            <path
              d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"
            />
          </svg>
          <span v-if="!editMode">Edit</span>
          <span v-else>Done</span>
        </button>
      </div>
    </div>
    <div class="flex flex-col gap-2 mt-10 w-full max-w-7xl mx-auto">
      <div class="flex flex-col">
        <div
          class="flex justify-between items-center font-bold text-lg bg-light px-4 py-2 rounded-lg"
        >
          <p class="w-1/2">Name</p>
          <p class="w-1/5">Date Updated</p>
          <p class="w-1/5">Date Created</p>
          <p class="justify-items-end">Status</p>
        </div>
      </div>
      <!-- add loader while chapters are loaded -->
      <div v-if="chapterStore.isloading" class="flex">
        <div class="flex justify-center items-center w-full h-52">
          <svg
            class="animate-spin -ml-1 mr-3 h-10 w-10 text-dark-lighter"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        </div>
      </div>

      <div v-else class="flex flex-col gap-2 h-52 overflow-auto scroll-m-0.5">
        <div
          v-for="chapter in chapters"
          :key="chapter.id"
          class="flex justify-between items-center font-semibold text-lg bg-light px-4 py-2 rounded-lg"
        >
          <router-link
            v-if="editMode"
            :to="{ name: 'chapter', params: { id: chapter.id } }"
            class="w-1/2 flex gap-2"
          >
            {{ chapter.title }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path
                d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"
              />
              <path
                d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"
              />
            </svg>
          </router-link>
          <!-- pass in two params -->
          <router-link
            v-else
            :to="{ name: 'chapter-preview', params: { id: chapter.id }, query: { pageNumber: 0 } }"
            class="w-1/2"
          >
            {{ chapter.title }}
          </router-link>
          <p class="w-1/5">{{ chapter.updatedAt.toDate().toDateString() }}</p>
          <p class="w-1/5">{{ chapter.createdAt.toDate().toDateString() }}</p>
          <p class="justify-items-end">
            <span v-if="chapter.status === 0" class="text-red-600">Draft</span>
            <span v-else-if="chapter.status === 1" class="text-emerald-600">Published</span>
            <span v-else-if="chapter.status === 2" class="text-blue-600">Review</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useChaptersStore } from '../stores/chapters'
export default {
  data() {
    return {
      chapterStore: useChaptersStore(),
      editMode: false
    }
  },
  created() {
    this.chapterStore.getChapters()
  },
  computed: {
    chapters() {
      return this.chapterStore.chapters
    }
  },
  methods: {
    toggleEdit() {
      this.editMode = !this.editMode
    }
  }
}
</script>

<style scoped>
td {
  padding: 5px;
}
</style>
