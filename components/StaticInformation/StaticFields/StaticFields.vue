<template>
  <section>
    <div
        v-for="(item, index) in data"
        :key="index"
        class="mb-10"
    >
      <h1 v-html="item?.title || ''" class="static-title">
      </h1>
      <p v-html="item.content" class="static-description">
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
