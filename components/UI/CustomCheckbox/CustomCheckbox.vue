<template>
  <div
      class="custom-checkbox"
      :class="{ 'is-checked': isChecked, 'is-disabled': disabled }"
      @click="toggle"
  >
    <input
        type="checkbox"
        class="hidden-input"
        :checked="isChecked"
        :disabled="disabled"
        @change="toggle"
    />
    <div
        class="checkbox-box"
        :style="{ borderColor: props.borderColor }"
    >
      <svg v-if="isChecked" class="check-icon" viewBox="0 0 24 24" fill="none">
        <path d="M5 13l6 5L19 6" stroke="var(--color-primary-blue)" stroke-width="3" />
      </svg>
    </div>
    <span class="label">
      <slot />
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  modelValue: [Boolean, String, Number],
  trueValue: {
    type: [Boolean, String, Number],
    default: true,
  },
  falseValue: {
    type: [Boolean, String, Number],
    default: false,
  },
  disabled: Boolean,
  borderColor: {
    type: String,
    default: 'var(--color-primary-blue)',
  },
})
const emit = defineEmits(['update:modelValue'])

const isChecked = computed(() => props.modelValue === props.trueValue)

const toggle = () => {
  if (props.disabled) return
  emit('update:modelValue', isChecked.value ? props.falseValue : props.trueValue)
}
</script>

<style scoped>
.custom-checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}
.hidden-input {
  display: none;
}
.checkbox-box {
  width: 16px;
  height: 16px;
  border: 2px solid var(--color-primary-blue);
  margin-right: 8px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
}
.custom-checkbox.is-checked .checkbox-box {
  background-color: transparent;
  border-color: var(--color-primary-blue, #3b82f6);
}
.check-icon {
  width: 14px;
  height: 14px;
}
.custom-checkbox.is-disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.label {
  font-size: 14px;
}
</style>
