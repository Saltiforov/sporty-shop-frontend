<template>
  <InputGroup>
    <template #default>
      <InputGroupAddon
          :pt="{ root: { style: { backgroundColor: 'white', color: 'var(--color-primary-dark)' } } }"
      >
        <slot name="icon">
          <span>Password</span>
        </slot>
      </InputGroupAddon>
      <Password
          v-bind="inputProps"
          placeholder="Enter your password"
          toggleMask
          :feedback="false"
      />
    </template>
  </InputGroup>
</template>

<script setup>
import {defineProps} from 'vue'
import {InputGroup, InputGroupAddon, Password} from 'primevue'

const props = defineProps({
  inputProps: {
    type: String,
    default: ''
  },
})
</script>

<style scoped>
/* Стили, если нужны */
</style>
