<template>
  <div class="flex justify-between min-h-80vh py-20">
    <!-- Form -->
    <div class="w-full md:w-1/2 p-4">
      <h2 class="text-3xl font-bold mb-4">New Chapter</h2>
      <form class="text-xl font-semibold space-y-6 mt-10" @submit.prevent="submitForm">
        <div class="grid grid-flow-col">
          <label for="title">Title</label>
          <input
            v-model="formData.title"
            id="title"
            type="text"
            placeholder="Chapter Title"
            class="p-2 rounded-lg bg-light ml-4 flex-1"
          />
        </div>
        <div class="grid grid-flow-col">
          <label for="description">Description</label>
          <textarea
            v-model="formData.description"
            id="description"
            class="rounded-lg bg-light ml-4 flex-1 p-2"
            placeholder="Chapter Description"
          ></textarea>
        </div>
        <div class="grid grid-flow-col">
          <label>Cover Image</label>
          <label class="rounded-lg cursor-pointer bg-light ml-4 flex-1 p-2">
            <div class="flex items-center justify-between px-4">
              <p>Click to upload</p>
              <svg
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <rect width="38" height="38" fill="url(#pattern0)" />
                <defs>
                  <pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use xlink:href="#image0_49_168" transform="scale(0.02)" />
                  </pattern>
                  <image
                    id="image0_49_168"
                    width="50"
                    height="50"
                    xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAD60lEQVRoge2ZTUxcVRTHf+e+B4WZaS21LQQxRWYwlbYRA8O0cSEQNRo1LYkfwaTGhYk7d03q1pVxpXFVV11ojMHEhU1oNBNdqIBMRZNCqzyQKG0K9QPpG1gw7x0XgMEKM8zMG6Bmfsls7jnv/M9/7nv3zn0DZcqUyYZsiUpnpx36dfFBEa8FkX3iq+djplGmFyYPjUCfV6xESY3sjrY/7It5VaFH0MgGab+hXPBF3lt0vh0oVKskRqoOH2+0Mt67wNN5NSN8Yql/5i/n0kS+moEbCUU7TonoeeCuAkvMofSmJ4Yv5nORVaDYuoSjHS+J6AdAdRFlqhB6K2sappb+vPbDZi8KbEYi0USXiv8ZYAdUcknQx10n9eVmkvMzUt8WClXbD4jl14ha19zxe3+CPm9vY+veJbviKlBbSMdZmKnILB2em/p+Llfipr69PU2JZs/y30A5BX4VPige4djUdaT97YxvoqBBmwCoXbIrzgJncyXmnJFQrP0kmPezLJ+lZhHP3Jf+eWgmW5LJFqyOdZwQ5KNtNAFQrbb25ErKZsQY9BywK7ieCkNUT+bK2dBIJJp4BDgWaEeF05ErYeMZEb8z0FaKYx8NJ7LuTesYec4KN3e8qHC6VF0VQlXYq8sW/9fOvqcp0WzfPXcB9DWgpqSd5YlRopU199TbBw79kvl9+tbt8X+W31A00SbiXwT2b2mH+ZMROG9nls6s3SgFINwYr8PmElC/be3lizJl4T02P/GdA6vPiM07lM7EzZVPsAiNnlhfRGIPHQAw4aa2Y8DzgQstMyuq3aLaDcyWoH4DYp8DMBh5uQQCALMC3e5E6rI7kbosUBIzqvSEmuJxA1KK/WJGoNt1hkdXB1xneHTFTNbfTAVh6WkDNAVcdkYw3a4zPBqJth9dHYxE248umzGBmxGVbkNxp7nbuSFidbnO0FgkFj+iIsnVgIokI7H4EdcZGhOxuoAbAeo2GIK8b4084Y4PXonEEi0KSeDgmuhBhWQklmhxxwevIDwZmC7YBuXHoKr56lWFm+Otip9k/dNireInw83xVl8lyDvhui2GT1V5NIhqRs3gJtLqUEYMGoTkKl8ZNPMhMB9k1a1Gff3YuM7ITeDN7W6mUAQGFiZT/QYg7TS+BeT1QmyHMA/mFUBXziN93i7MC0D/dnaVJ7cQfdZ1hsZgzcHqD2doPu00PgO8zg5/ZgQGBHM8PZ76fM3Yf9l9f9t+9axeFX0KaGF5Ka0sRDTtDC8fFWLxYpapBWAa5RtV7VuYTPVDsMteTsKxuBZpYlNkfa91J1E2stMoG9lp/G+MBPXv0oYofC2KX2qdMmXKlLmz+Bv3zzjAOs7BBgAAAABJRU5ErkJggg=="
                  />
                </defs>
              </svg>
            </div>
            <input type="file" class="hidden" />
          </label>
        </div>
        <div class="grid grid-flow-col">
          <label for="bgImage">Background Image</label>
          <label
            v-if="!bgImage"
            for="dropzone-file"
            class="rounded-lg cursor-pointer bg-light ml-4 flex-1 p-2"
          >
            <div class="flex items-center justify-between px-4">
              <p>Click to upload</p>
              <svg
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <rect width="38" height="38" fill="url(#pattern0)" />
                <defs>
                  <pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use xlink:href="#image0_49_168" transform="scale(0.02)" />
                  </pattern>
                  <image
                    id="image0_49_168"
                    width="50"
                    height="50"
                    xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAD60lEQVRoge2ZTUxcVRTHf+e+B4WZaS21LQQxRWYwlbYRA8O0cSEQNRo1LYkfwaTGhYk7d03q1pVxpXFVV11ojMHEhU1oNBNdqIBMRZNCqzyQKG0K9QPpG1gw7x0XgMEKM8zMG6Bmfsls7jnv/M9/7nv3zn0DZcqUyYZsiUpnpx36dfFBEa8FkX3iq+djplGmFyYPjUCfV6xESY3sjrY/7It5VaFH0MgGab+hXPBF3lt0vh0oVKskRqoOH2+0Mt67wNN5NSN8Yql/5i/n0kS+moEbCUU7TonoeeCuAkvMofSmJ4Yv5nORVaDYuoSjHS+J6AdAdRFlqhB6K2sappb+vPbDZi8KbEYi0USXiv8ZYAdUcknQx10n9eVmkvMzUt8WClXbD4jl14ha19zxe3+CPm9vY+veJbviKlBbSMdZmKnILB2em/p+Llfipr69PU2JZs/y30A5BX4VPige4djUdaT97YxvoqBBmwCoXbIrzgJncyXmnJFQrP0kmPezLJ+lZhHP3Jf+eWgmW5LJFqyOdZwQ5KNtNAFQrbb25ErKZsQY9BywK7ieCkNUT+bK2dBIJJp4BDgWaEeF05ErYeMZEb8z0FaKYx8NJ7LuTesYec4KN3e8qHC6VF0VQlXYq8sW/9fOvqcp0WzfPXcB9DWgpqSd5YlRopU199TbBw79kvl9+tbt8X+W31A00SbiXwT2b2mH+ZMROG9nls6s3SgFINwYr8PmElC/be3lizJl4T02P/GdA6vPiM07lM7EzZVPsAiNnlhfRGIPHQAw4aa2Y8DzgQstMyuq3aLaDcyWoH4DYp8DMBh5uQQCALMC3e5E6rI7kbosUBIzqvSEmuJxA1KK/WJGoNt1hkdXB1xneHTFTNbfTAVh6WkDNAVcdkYw3a4zPBqJth9dHYxE248umzGBmxGVbkNxp7nbuSFidbnO0FgkFj+iIsnVgIokI7H4EdcZGhOxuoAbAeo2GIK8b4084Y4PXonEEi0KSeDgmuhBhWQklmhxxwevIDwZmC7YBuXHoKr56lWFm+Otip9k/dNireInw83xVl8lyDvhui2GT1V5NIhqRs3gJtLqUEYMGoTkKl8ZNPMhMB9k1a1Gff3YuM7ITeDN7W6mUAQGFiZT/QYg7TS+BeT1QmyHMA/mFUBXziN93i7MC0D/dnaVJ7cQfdZ1hsZgzcHqD2doPu00PgO8zg5/ZgQGBHM8PZ76fM3Yf9l9f9t+9axeFX0KaGF5Ka0sRDTtDC8fFWLxYpapBWAa5RtV7VuYTPVDsMteTsKxuBZpYlNkfa91J1E2stMoG9lp/G+MBPXv0oYofC2KX2qdMmXKlLmz+Bv3zzjAOs7BBgAAAABJRU5ErkJggg=="
                  />
                </defs>
              </svg>
            </div>
            <input @change="handleFileUpload" id="dropzone-file" type="file" class="hidden" />
          </label>
        </div>
        <div class="grid grid-flow-col">
          <label for="subject">Subject</label>
          <select
            v-model="formData.subject"
            id="subject"
            class="p-2 rounded-lg bg-light ml-4 flex-1"
          >
            <option v-for="sub in formData.subjects" :key="sub">{{ sub }}</option>
          </select>
        </div>
        <div class="grid grid-flow-col">
          <label for="ageGroup">Age Group</label>
          <select
            v-model="formData.ageGroup"
            id="ageGroup"
            class="p-2 rounded-lg bg-light ml-4 flex-1"
          >
            <option v-for="age in formData.ageGroups">{{ age }} years</option>
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
    <div class="w-96 bg-light rounded-2xl p-2 text-black">
      <div class="p-4 bg-cover rounded-2xl" :style="{ backgroundImage: `url(${bgImageUrl})` }">
        <!-- <div class="w-1/7">
          <img class="absolute" src="@/assets/images/mobile_mockup.png" alt="mobile" />
        </div> -->
        <h3 class="text-2xl font-bold mb-2 mt-12">{{ formData.title }}</h3>
        <p class="mt-6">{{ formData.description }}</p>
        <div class="mt-4 font-bold flex gap-1">
          <span>by</span>
          <span>{{ useUser.getuserName }}</span>
        </div>
        <div class="mt-4">
          <!-- <img :src="bgImageUrl" alt="Cover Image" class="w-full max-h-64 object-contain" /> -->
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
