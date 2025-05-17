<template>
  <section>
    <div
        v-for="(item, index) in data"
        :key="index"
        class="mb-10"
    >
      <h1 class="static-title">
        {{ item?.title || '' }}
      </h1>
      <p class="static-description">
        {{ item.content }}
      </p>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})
</script>
