<template>
  <div class="icon-tooltip-container">
    <Tooltip :target="target" :position="'top'" :angle="angle" :auto-hide="true">
      <img
          ref="target"
          :src="iconSrc"
          alt="icon"
          class="icon-img"
      />
    </Tooltip>
  </div>
</template>

<script setup>
import ToolTipIcon from 'assets/icons/tooltip-icon.svg'

const iconSrc = ToolTipIcon
const target = ref(null)
const angle = 15
</script>

<style scoped>
.icon-tooltip-container {
  display: inline-block;
  position: relative;
}

.icon-img:hover {
  transform: scale(1.1);
}
</style>
