<template>
  <div class="toolbar">
    <div v-for="({ type }, index) in configOptions" :key="`${type}-${index}`">
      <input :type="type" v-model="colorSelect" />
    </div>
    <div
      v-for="({ action, icon, type }, index) in toolOptions"
      :key="`${icon}-${index}`"
      v-on:click="optionSelect({ action, stateProperty: 'toolOption', type })"
    >
      <font-awesome-icon :icon="['fas', icon]" />
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'ToolBar',
  props: {
    ctx: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      // Main Config Options - Settings that will be used for
      // configuring the settings in the tool options
      configOptions: [
        {
          type: 'color',
        },
      ],
      // Drawing tool available for the canvas
      toolOptions: [
        {
          type: 'draw',
          icon: 'edit',
          action: 'useBrushTool',
        },
        {
          type: 'square',
          icon: 'square',
          action: 'useRectangleTool',
        },
      ],
    }
  },
  methods: {
    ...mapActions(['mainAction']),
    optionSelect(opt) {
      const { action, stateProperty, type } = opt
      // Update Store
      this.mainAction({ stateProperty, with: type })
      this.ctx[action]({
        colour: this.colorSelect,
      })
    },
  },
  computed: {
    colorSelect: {
      get: function () {
        return this.$store.color
      },
      set: function (nemVal) {
        // Set color in zwibbler
        this.ctx.setColour(nemVal, true)
        // Store color in a centralized state
        this.mainAction({
          stateProperty: 'color',
          with: nemVal,
        })
      },
    },
  },
}
</script>

<style scoped>
.toolbar {
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: #1695bf;
  overflow: hidden;
  position: fixed;
  top: 15px;
  border-radius: 25px;
  padding: 5px;
  z-index: 2;
  box-shadow: 6px 3px 9px #00000096;
}
.toolbar > div {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 40px;
  height: 40px;
  color: #ffffff;
}
.toolbar > div:hover {
  background: #064485 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #000000cc;
  border-radius: 4px;
  opacity: 0.44;
}
input[type='color'] {
  -webkit-appearance: none;
  border: none;
  width: 32px;
  height: 32px;
}
input[type='color']:focus {
  outline: none;
}
input[type='color']::-webkit-color-swatch-wrapper {
  padding: 0;
}
input[type='color']::-webkit-color-swatch {
  border: none;
}
</style>
