<template>
  <div class="draw-zone">
    <canvas
      id="draw-area"
      ref="drawCanvas"
      v-bind:style="{ cursor: cursorStyle }"
      v-bind:width="canvasWidth"
      v-bind:height="canvasHeight"
      @mousedown="drawInit"
      @mousemove="drawMoving"
      @mouseup="drawEnd"
      @mouseout="offCanvas"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CanvasArea',
  data() {
    return {
      canvas: null,
      canvasWidth: 0,
      canvasHeight: 0,
      isDrawing: false,
      x: 0,
      y: 0,
      currentWidth: null,
      currentHeight: null,
    }
  },
  computed: {
    ...mapState(['color', 'toolOption']),
    cursorStyle() {
      return this.isDrawing ? 'crosshair' : 'pointer'
    },
  },
  methods: {
    freeDraw(x1, y1, x2, y2) {
      let ctx = this.canvas
      ctx.beginPath()
      ctx.strokeStyle = this.color
      ctx.lineWidth = 1
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
      ctx.closePath()
    },
    drawRect(e) {
      let ctx = this.canvas
      let newWidth = e.offsetX - this.x
      let newHeigth = e.offsetY - this.y
      if (this.currentWidth && this.currentHeight) {
        ctx.clearRect(this.x, this.y, this.currentWidth, this.currentHeight)
      }
      ctx.beginPath()
      ctx.strokeStyle = this.color
      ctx.lineWidth = 1
      ctx.rect(this.x, this.y, newWidth, newHeigth)
      ctx.stroke()
      this.currentWidth = newWidth
      this.currentHeight = newHeigth
    },
    drawInit(e) {
      this.x = e.offsetX
      this.y = e.offsetY
      this.isDrawing = true
    },
    drawMoving(e) {
      if (this.isDrawing) {
        if (this.toolOption === 'draw') {
          this.freeDraw(this.x, this.y, e.offsetX, e.offsetY)
          this.x = e.offsetX
          this.y = e.offsetY
        }
        if (this.toolOption === 'square') {
          this.drawRect(e)
        }
      }
    },
    drawEnd(e) {
      if (this.isDrawing) {
        if (this.toolOption === 'draw') {
          this.freeDraw(this.x, this.y, e.offsetX, e.offsetY)
        }
        if (this.toolOption === 'square') {
          this.currentWidth = null
          this.currentHeight = null
        }
        this.reset()
      }
    },
    // Canvas default methods
    reset() {
      this.x = 0
      this.y = 0
      this.isDrawing = false
    },
    offCanvas() {
      this.isDrawing = false
    },
    setCanvasDimensions() {
      this.canvasWidth = window.innerWidth - 10
      this.canvasHeight = window.innerHeight
    },
  },
  mounted() {
    const c = this.$refs.drawCanvas
    this.canvas = c.getContext('2d')
    this.setCanvasDimensions()
  },
}
</script>

<style scoped>
#draw-area {
  background: #f8f8f8;
}
</style>
