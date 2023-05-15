<template>
  <div class="absolute top-0 left-0 bg-primary/90 h-full w-full">
    <div class="flex items-center justify-center h-full"><span class="loader"></span></div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.loader {
  width: 48px;
  height: 48px;
  border: 3px solid #fff;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  translate: transform(-50%, -50%);
}
.loader::after {
  content: '';
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 3px solid;
  border-color: #ff3d00 transparent;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
