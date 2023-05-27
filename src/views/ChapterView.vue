<template>
  <div class="grid grid-flow-col grid-col-2 py-10 px-10">
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
    <div class="w-full">
      <h1 class="text-3xl capitalize font-bold mb-4">
        Create {{ chapter.title }} Page {{ formData.pageNumber }}
      </h1>
      <!-- form -->
      <form
        class="form-control space-y-4 text-lg mt-10 font-medium w-1/2"
        @submit.prevent="submitForm"
      >
        <div class="flex flex-col">
          <label for="layout">Select Layout</label>
          <div class="flex mt-6">
            <button
              @click="formData.pageType = layout.id"
              v-for="layout in layouts"
              :key="layout.id"
              class="btn btn-ghost h-full py-2 grid place-items-center gap-4"
            >
              <img class="w-20" :src="layout.image" alt="layout-one" />
              <label for="layout" class="capitalize">{{ layout.name }}</label>
              <input
                v-model="formData.pageType"
                type="radio"
                name="radio-1"
                class="radio"
                :value="layout.id"
              />
            </button>
          </div>
          <div v-show="formData.pageType !== null" class="flex items-center justify-between">
            <label for="imageUrl">Background Image</label>
            <input
              @change="handleFileUploadBackgroundImage"
              id="dropzone-file"
              type="file"
              class="file-input w-full max-w-xs"
              :disabled="uploadProgress !== 0"
            />
          </div>
        </div>
        <div v-if="formData.pageType">
          <div v-if="formData.pageType === 1">
            <div class="flex justify-between">
              <label for="longText">Long Text</label>
              <textarea
                v-model="formData.longText"
                id="longText"
                class="textarea w-full max-w-xs"
                placeholder="Description"
              ></textarea>
            </div>
          </div>
          <div
            class="space-y-4"
            v-if="formData.pageType === 2 || formData.pageType === 3"
            :class="formData.pageType === 3 ? 'flex flex-col-reverse' : ''"
          >
            <div class="flex justify-between mt-2">
              <label for="longText">Long Text</label>
              <textarea
                v-model="formData.longText"
                id="longText"
                class="textarea w-full max-w-xs"
                placeholder="Description"
              ></textarea>
            </div>
            <div class="flex items-center justify-between">
              <label for="title">Question</label>
              <input
                v-model="formData.question"
                id="question"
                type="text"
                placeholder="Question"
                class="input input-bordered w-full max-w-xs"
              />
            </div>
            <div class="flex justify-between">
              <label for="title">Options</label>
              <div class="space-y-2 w-full max-w-xs">
                <input
                  v-for="index in 4"
                  :key="index"
                  v-model="formData.question"
                  id="options"
                  type="text"
                  :placeholder="`Option ${index}`"
                  class="input input-bordered w-full max-w-xs"
                />
              </div>
            </div>
          </div>
          <div class="space-y-4" v-if="formData.pageType === 4">
            <div class="flex items-center justify-between">
              <label for="title">Question</label>
              <input
                v-model="formData.question"
                id="question"
                type="text"
                placeholder="Question"
                class="input input-bordered w-full max-w-xs"
              />
            </div>
            <div class="flex justify-between">
              <label for="title">Options</label>
              <div class="space-y-2 w-full max-w-xs">
                <input
                  v-for="index in 4"
                  :key="index"
                  v-model="formData.question"
                  id="options"
                  type="text"
                  :placeholder="`Option ${index}`"
                  class="input input-bordered w-full max-w-xs"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-end gap-10">
          <button @click="submitAndNext" :disabled="formData.pageType === null" class="btn">
            Save & Next
          </button>
          <button type="submit" :disabled="formData.pageType === null" class="btn btn-success">
            Finish
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { useChaptersStore } from '../stores/chapters'
import { usePagesStore } from '../stores/pages'
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage'
import { storage } from '../firebase'
export default {
  data() {
    return {
      chapterStore: useChaptersStore(),
      pageStore: usePagesStore(),
      uploadProgress: 0,
      formData: {
        longText: '',
        question: '',
        options: ['', '', '', ''],
        imageUrl: null,
        pageType: null,
        pageNumber: 1
      },
      layouts: [
        {
          id: 1,
          name: 'layout one',
          image:
            'https://firebasestorage.googleapis.com/v0/b/ais-ai-for-study.appspot.com/o/layouts%2Flayout_one.png?alt=media&token=92f3e2ab-1213-496c-b566-6a1143bf9b20'
        },
        {
          id: 2,
          name: 'layout two',
          image:
            'https://firebasestorage.googleapis.com/v0/b/ais-ai-for-study.appspot.com/o/layouts%2Flayout_two.png?alt=media&token=46089622-7508-42d0-bce9-c05f35988887'
        },
        {
          id: 3,
          name: 'layout three',
          image:
            'https://firebasestorage.googleapis.com/v0/b/ais-ai-for-study.appspot.com/o/layouts%2Flayout_three.png?alt=media&token=5b62cf53-fd7d-404f-b0b2-26ded63beb53'
        },
        {
          id: 4,
          name: 'layout four',
          image:
            'https://firebasestorage.googleapis.com/v0/b/ais-ai-for-study.appspot.com/o/layouts%2Flayout_four.png?alt=media&token=d9bbe092-b1d3-408e-b0b3-fcfb84422f61'
        }
      ]
    }
  },
  created() {
    this.chapterStore.getChapter(this.$route.params.id)
  },
  computed: {
    chapter() {
      return this.chapterStore.chapter
    }
  },
  methods: {
    submitAndNext() {
      this.formData.pageNumber++
      // clear all the data
      this.formData.pageType = null
      this.formData.longText = ''
      this.formData.question = ''
      this.formData.options = ['', '', '', '']
      this.formData.imageUrl = null
      this.pageStore.addPage(this.formData)
      // this.$router.push(`/chapters/${this.chapter.id}/create-page/${this.formData.pageNumber}`)
    },
    handleFileUploadBackgroundImage(event) {
      this.formData.imageUrl = event.target.files[0]
      // upload to storage here
      const chapterFolder = this.chapterStore.chapter.title.trim()
      console.log(chapterFolder)
      const storageRef = ref(storage, `chapters/${chapterFolder}/pages/${this.formData.pageNumber}`)
      const uploadTask = uploadBytesResumable(storageRef, this.formData.imageUrl)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          this.uploadProgress = progress.toFixed(2)
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL)
            this.formData.imageUrl = downloadURL
            this.uploadProgress = 0
          })
        }
      )
    }
  }
}
</script>
