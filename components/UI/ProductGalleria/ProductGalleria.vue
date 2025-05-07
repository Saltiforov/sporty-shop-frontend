<template>
  <div class="card">
    <Galleria :pt="{
      thumbnailContent: {
        class: 'border-0'
      },
      nextButton: {
        class: 'bg-[var(--color-primary-dark)]'
      },
      prevButton: {
        class: 'bg-[var(--color-primary-dark)]'
      },

    }" :value="images" :responsiveOptions="responsiveOptions" :showThumbnailNavigators="false" :numVisible="5" :circular="true" containerStyle="max-width: 680px"
              :showItemNavigators="true">
      <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block;" />
      </template>
      <template #thumbnail="slotProps">
        <img
            :src="slotProps.item.thumbnailImageSrc"
            :alt="slotProps.item.alt"
            class="block w-[100px] h-[100px] object-cover sm:w-[80px] sm:h-[80px] xs:w-[60px] xs:h-[60px]"
        />
      </template>
    </Galleria>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { PhotoService } from '~/services/PhotoService';

onMounted(() => {
  PhotoService.getImages().then((data) => (images.value = data));
});

const images = ref();
const responsiveOptions = ref([
  {
    breakpoint: '1300px',
    numVisible: 4
  },
  {
    breakpoint: '575px',
    numVisible: 1
  }
]);
</script>