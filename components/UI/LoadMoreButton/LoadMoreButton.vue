<template>
  <div class="load-more-button-wrapper ">
    <Button
        :disabled
        :label="''"
        :pt="{
        root: {
          class: 'load-more-button btn-hover-default  flex items-center gap-2'
        },
        label: {
          class: 'flex items-center gap-2'
        }
      }"
    >
      <span class="flex items-center gap-2">
        <p class="mr-[17px] text-[15px]">{{ label?.toUpperCase() }} </p>
        <slot name="icon">
          <img src="~/assets/icons/shopping-cart-icon.svg" alt="icon" class="w-4 h-4" />
        </slot>
      </span>
    </Button>
  </div>
</template>

<script setup>

defineProps({
  label: {
    type: String,
    required: false,
    default: 'Показати ще 24 товари',
  },
  disabled: {
    type: Boolean,
    required: false,
  }
})

</script>

<style scoped>
.load-more-button {
  background: var(--color-primary-dark);
  border-radius: 24px;
  padding: 12px 23px;
}

</style>