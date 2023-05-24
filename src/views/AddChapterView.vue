<template>
  <div class="grid grid-flow-col grid-col-2 py-10 px-10">
    <!-- Form -->
    <div class="w-full">
      <h2 class="text-3xl font-bold mb-4">New Chapter</h2>
      <form class="form-control space-y-4 text-lg mt-10 font-medium" @submit.prevent="submitForm">
        <div class="flex items-center justify-between">
          <label for="title">Title</label>
          <input
            v-model="formData.title"
            id="title"
            type="text"
            placeholder="Chapter Title"
            class="input input-bordered w-full max-w-xs"
          />
        </div>
        <div class="flex justify-between">
          <label for="description">Description</label>
          <textarea
            v-model="formData.description"
            id="description"
            class="textarea w-full max-w-xs"
            placeholder="Chapter Description"
          ></textarea>
        </div>
        <div class="flex items-center justify-between">
          <label for="coverImage">Cover Image</label>
          <input type="file" class="file-input w-full max-w-xs" />
        </div>
        <div class="flex items-center justify-between">
          <label for="bgImage">Background Image</label>
          <input
            @change="handleFileUpload"
            id="dropzone-file"
            type="file"
            class="file-input w-full max-w-xs"
          />
        </div>
        <div class="flex items-center justify-between">
          <label for="subject">Subject</label>
          <select v-model="formData.subject" id="subject" class="select w-full max-w-xs">
            <option disabled selected>Pick your favorite Simpson</option>
            <option v-for="sub in formData.subjects" :key="sub">{{ sub }}</option>
          </select>
        </div>
        <div class="flex items-center justify-between">
          <label for="ageGroup">Age Group</label>
          <select v-model="formData.ageGroup" id="ageGroup" class="select w-full max-w-xs">
            <option v-for="age in formData.ageGroups" :key="age">{{ age }} years</option>
          </select>
        </div>
        <button type="submit" class="btn btn-lg">Create</button>
      </form>
    </div>
    <!-- Live Preview -->
    <div class="mockup-phone text-white">
      <div class="camera"></div>
      <div class="display">
        <div
          class="artboard bg-white phone-1 relative"
          :style="{ backgroundImage: `url(${bgImageUrl})` }"
          style="text-shadow: black 1px 1px 1px 1px"
        >
          <div class="p-4">
            <h3 class="text-2xl font-bold mb-2 mt-12">
              {{ formData.title ? formData.title : 'Title' }}
            </h3>

            <p class="mt-6 break-words">
              {{
                formData.description
                  ? formData.description
                  : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quaerat, dolore tempora dicta quam alias temporibus laboriosam'
              }}
            </p>
            <div class="mt-4 font-bold flex gap-1">
              <span>by</span>
              <span class="capitalize">{{ useUser.getuserName }}</span>
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
  </div>
</template>

<script>
import { useChaptersStore } from '../stores/chapters'
import { useUserStore } from '../stores/user'
export default {
  data() {
    return {
      formData: {
        title: '',
        description: '',
        subject: '',
        subjects: ['Math', 'Science', 'English', 'Social Studies'],
        ageGroup: '',
        ageGroups: ['3-5', '6-8', '9-12', '13-15', '16-18', '18 or older'],
        coverImage: null,
        bgImage: null
      },
      useChapters: useChaptersStore(),
      useUser: useUserStore()
    }
  },
  computed: {
    bgImageUrl() {
      return this.formData.bgImage ? URL.createObjectURL(this.formData.bgImage) : ''
    }
  },
  methods: {
    submitForm() {
      this.useChapters.addChapter(this.formData)
      // Handle form submission here
      console.log('Form submitted!', this.formData)
    },
    handleFileUpload(event) {
      // this.formData.coverImage = event.target.files[0]
      this.formData.bgImage = event.target.files[0]
    }
  }
}
</script>
