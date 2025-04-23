<template>
  <Dialog
      :draggable="false"
      v-model:visible="isVisible"
      :modal="true"
      :closable="true"
      :style="{ width: '40rem' }"
      class="p-fluid"
      :class="dialogClass"
  >
    <template #header>
      <slot name="header">
        <span>{{ popupConfig?.title || 'Form' }}</span>
      </slot>
    </template>

    <slot></slot>

    <template #footer>
      <slot name="footer"></slot>
    </template>

  </Dialog>
</template>

<script setup>
import {reactive, ref} from 'vue';

const isVisible = ref(true);
const popupConfig = reactive({});

defineProps({
  dialogClass: {
    type: String,
    default: '',
  }
})


</script>

<style scoped>
.p-dialog .p-fluid {
  width: 100%;
  max-width: 400px;
}

.image-wrapper {
  display: flex;
  justify-content: center;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
}

.uploaded-image {
  width: 8rem;
}

.message-error {
  margin-bottom: 10px;
}
</style>
