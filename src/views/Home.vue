<template>
  <div class="home">
    <CanvasArea />
  </div>
</template>

<script>
import CanvasArea from '@/components/CanvasArea.vue'

export default {
  name: 'Home',
  components: {
    CanvasArea,
  },
}
</script>

<style scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
