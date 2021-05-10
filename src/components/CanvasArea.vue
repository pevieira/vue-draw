<template>
  <div>
    <ToolBar v-if="ctx" :ctx="ctx" />
    <div
      ref="zwibCanvas"
      v-bind:style="{
        width: 'calc(100vw - 40px)',
        height: 'calc(100vh - 40px)',
        border: '1px solid black',
      }"
    ></div>
  </div>
</template>

<script>
import ToolBar from '@/components/ToolBar.vue'
export default {
  name: 'CanvasArea',
  components: {
    ToolBar,
  },
  data() {
    return {
      ctx: null,
    }
  },
  async mounted() {
    // 1. Load the Zwibbler script
    await this.$loadScript('https://zwibbler.com/zwibbler-demo.js')
    // 2. Get component and create zwibbler canvas
    const zwibCanvas = this.$refs.zwibCanvas
    let scope = Zwibbler.create(zwibCanvas, {
      showToolbar: false,
      showColourPanel: false,
    })
    console.log('scope attached: ', scope)
    let ctx = scope.ctx
    console.log('ctx: ', ctx)
    this.ctx = scope
  },
  destroyed() {
    //   Remove zwibbler when component is detroyed
    this.$unloadScript('https://zwibbler.com/zwibbler-demo.js')
  },
}
</script>
