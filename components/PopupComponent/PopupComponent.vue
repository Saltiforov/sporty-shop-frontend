<template>
  <Dialog
      :draggable="false"
      v-model:visible="isVisible"
      :header="popupConfig?.title || 'Form'"
      :modal="true"
      :closable="true"
      :style="{ width: '40rem' }"
      class="p-fluid"
  >

  </Dialog>
</template>

<script setup>
import {reactive, ref, unref} from 'vue';

const isVisible = ref(true);
const popupConfig = reactive({});


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
