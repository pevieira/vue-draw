<template>
  <div class="toolbar">
    <div v-for="({ type }, index) in configOptions" :key="`${type}-${index}`">
      <input :type="type" v-model="colorSelect" />
    </div>
    <div
      v-for="({ icon, type }, index) in toolOptions"
      :key="`${icon}-${index}`"
      v-on:click="mainAction({ stateProperty: 'toolOption', with: type })"
    >
      <font-awesome-icon :icon="['fas', icon]" />
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'ToolBar',
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
        },
        {
          type: 'square',
          icon: 'square',
        },
      ],
    }
  },
  methods: {
    ...mapActions(['mainAction']),
  },
  computed: {
    colorSelect: {
      get: function () {
        return this.$store.color
      },
      set: function (nemVal) {
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
  background-color: #b1b1b1;
  overflow: hidden;
  position: fixed;
  top: 15px;
  border-radius: 25px;
  padding: 5px;
}
.toolbar > div {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 40px;
  height: 40px;
  background-color: #f8f8f8;
}
.toolbar > div:hover {
  background-color: #f1f1f1;
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
