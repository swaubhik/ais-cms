<template>
  <div class="flex flex-col md:flex-row">
    <!-- Form -->
    <div class="w-full md:w-1/2 p-4">
      <h2 class="text-xl font-bold mb-4">Create Book</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div class="flex flex-col">
          <label for="title" class="text-sm font-medium">Title</label>
          <input
            v-model="formData.title"
            id="title"
            type="text"
            class="border border-gray-300 p-2 rounded"
          />
        </div>
        <div class="flex flex-col">
          <label for="description" class="text-sm font-medium">Description</label>
          <textarea
            v-model="formData.description"
            id="description"
            class="border border-gray-300 p-2 rounded"
          ></textarea>
        </div>
        <div class="flex flex-col">
          <label for="coverImage" class="text-sm font-medium">Cover Image</label>
          <input
            type="file"
            @change="handleFileUpload"
            id="coverImage"
            class="border border-gray-300 p-2 rounded"
          />
        </div>
        <div class="flex flex-col">
          <label for="subject" class="text-sm font-medium">Subject</label>
          <select
            v-model="formData.subject"
            id="subject"
            class="border border-gray-300 p-2 rounded"
          >
            <option value="math">Math</option>
            <option value="science">Science</option>
            <option value="history">History</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label for="ageGroup" class="text-sm font-medium">Age Group</label>
          <select
            v-model="formData.ageGroup"
            id="ageGroup"
            class="border border-gray-300 p-2 rounded"
          >
            <option value="3-5">3-5 years</option>
            <option value="6-8">6-8 years</option>
            <option value="9-12">9-12 years</option>
          </select>
        </div>
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create
        </button>
      </form>
    </div>
    <!-- Live Preview -->
    <div class="w-full md:w-1/2 p-4">
      <h2 class="text-xl font-bold mb-4">Live Preview (Mobile)</h2>
      <div class="border border-gray-300 p-4 rounded">
        <h3 class="text-lg font-bold mb-2">{{ formData.title }}</h3>
        <p class="text-gray-600">{{ formData.description }}</p>
        <div class="mt-4">
          <span class="text-sm font-medium">Subject:</span>
          <span>{{ formData.subject }}</span>
        </div>
        <div class="mt-2">
          <span class="text-sm font-medium">Age Group:</span>
          <span>{{ formData.ageGroup }}</span>
        </div>
        <div class="mt-4">
          <img :src="coverImageUrl" alt="Cover Image" class="w-full max-h-64 object-contain" />
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
      formData: {
        title: '',
        description: '',
        subject: 'math',
        ageGroup: '3-5',
        // coverImage: null
      },
      useChapters: useChaptersStore()
    }
  },
  computed: {
    coverImageUrl() {
      return this.formData.coverImage ? URL.createObjectURL(this.formData.coverImage) : ''
    }
  },
  methods: {
    submitForm() {
      this.useChapters.addChapter(this.formData)
      // Handle form submission here
      console.log('Form submitted!', this.formData)
    },
    handleFileUpload(event) {
      this.formData.coverImage = event.target.files[0]
    }
  }
}
</script>
