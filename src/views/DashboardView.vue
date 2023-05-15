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
  </div>
</template>

<script>
import { useUserStore } from '../stores/user'
export default {
  data() {
    return {
      userStore: useUserStore(),
      uid: useUserStore().userData.uid
    }
  },
  mounted() {
    this.userStore.userData
  }
}
</script>

<style></style>
