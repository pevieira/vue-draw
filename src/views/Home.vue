<template>
  <div class="home">
    <ToolBar />
    <CanvasArea />
  </div>
</template>

<script>
import CanvasArea from '@/components/CanvasArea.vue'
import ToolBar from '@/components/ToolBar.vue'

export default {
  name: 'Home',
  components: {
    CanvasArea,
    ToolBar,
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
