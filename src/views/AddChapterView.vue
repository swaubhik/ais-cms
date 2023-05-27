<template>
  <div class="grid grid-flow-col grid-col-2 py-10 px-10">
    <app-loader v-if="chapterStore.isloading" />
    <div v-if="uploadProgress !== 0" class="bg-primary/60 absolute top-0 left-0 w-full h-full z-50">
      <div
        v-if="uploadProgress !== 0"
        class="radial-progress font-bold text-2xl text-dark flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        :style="`--value:${uploadProgress}`"
        style="--size: 12rem; --thickness: 1.5rem"
      >
        {{ uploadProgress }}%
      </div>
    </div>
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
          <input
            @change="handleFileUploadCoverImage"
            type="file"
            class="file-input w-full max-w-xs"
            :disabled="uploadProgress !== 0"
          />
        </div>
        <div class="flex items-center justify-between">
          <label for="bgImage">Background Image</label>
          <input
            @change="handleFileUploadBackgroundImage"
            id="dropzone-file"
            type="file"
            class="file-input w-full max-w-xs"
            :disabled="uploadProgress !== 0"
          />
        </div>
        <div class="flex items-center justify-between">
          <label for="subject">Subject</label>
          <select v-model="formData.subject" id="subject" class="select w-full max-w-xs">
            <option v-for="sub in subjects" :key="sub">{{ sub }}</option>
          </select>
        </div>
        <div class="flex items-center justify-between">
          <label for="ageGroup">Age Group</label>
          <select v-model="formData.ageGroup" id="ageGroup" class="select w-full max-w-xs">
            <option v-for="age in ageGroups" :key="age">{{ age }} years</option>
          </select>
        </div>
        <button :disabled="uploadProgress !== 0" type="submit" class="btn btn-lg">Create</button>
      </form>
    </div>
    <!-- Live Preview -->
    <div class="mockup-phone text-white">
      <div class="camera"></div>
      <div class="display">
        <div
          class="artboard bg-white phone-1 relative"
          :style="{ backgroundImage: `url(${formData.bgImage})` }"
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
              <span class="capitalize">{{ getuserName }}</span>
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
import AppLoader from '../components/AppLoader.vue'
import { storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
export default {
  components: {
    AppLoader
  },
  data() {
    return {
      formData: {
        title: '',
        description: '',
        subject: '',
        ageGroup: '',
        coverImage: null,
        bgImage: null,
        creator: ''
      },
      subjects: ['Math', 'Science', 'English', 'Social Studies'],
      ageGroups: ['3-5', '6-8', '9-12', '13-15', '16-18', '18 or older'],
      chapterStore: useChaptersStore(),
      userStore: useUserStore(),
      uploadProgress: 0
    }
  },
  computed: {
    getuserName() {
      return this.userStore.getuserName
    }
  },
  methods: {
    submitForm() {
      this.formData.creator = this.userStore.getuserName
      const uid = this.userStore.userData.uid
      this.chapterStore.addChapter(this.formData, uid)
    },
    handleFileUploadBackgroundImage(event) {
      this.formData.bgImage = event.target.files[0]
      // upload to storage here
      const chapterFolder = this.formData.title.trim()
      const storageRef = ref(storage, `chapters/${chapterFolder}/bgImage`)
      const uploadTask = uploadBytesResumable(storageRef, this.formData.bgImage)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          this.uploadProgress = progress.toFixed(2)
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.formData.bgImage = downloadURL
            this.uploadProgress = 0
          })
        }
      )
    },
    handleFileUploadCoverImage(event) {
      this.formData.coverImage = event.target.files[0]
      // upload to storage here
      const chapterFolder = this.formData.title.trim()
      const storageRef = ref(storage, `chapters/${chapterFolder}/coverImage`)
      const uploadTask = uploadBytesResumable(storageRef, this.formData.coverImage)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // get progress here in integer
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          this.uploadProgress = progress.toFixed(2)
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.formData.coverImage = downloadURL
            this.uploadProgress = 0
          })
        }
      )
    }
  }
}
</script>
