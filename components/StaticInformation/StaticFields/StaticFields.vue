<template>
  <section>
    <div
        v-for="(item, index) in data"
        :key="index"
        :class="[
          'mb-10',
          item.split ? 'max-w-[850px] mr-auto' : ''
        ]"
    >
      <h1
          v-html="item?.title || ''"
          :class="['static-title mb-[32px]', item.split ? 'text-center' : '']"
      />

      <div v-if="item.split" class="split-wrapper grid gap-6 md:grid-cols-2">
        <div
            v-for="(chunk, i) in splitContent(item.content)"
            :key="i"
            v-html="chunk"
            class="static-description max-w-[305px] grid gap-[45px]"
        />
      </div>


      <p v-else v-html="item.content" class="static-description" />
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

function splitContent(content, columns = 2) {
  const cleanedContent = content.replace(/<br\s*\/?>/gi, '')

  const parts = cleanedContent.match(/<p[\s\S]*?<\/p>/gi) || []

  const meaningfulParts = parts.filter(p =>
      p.replace(/<[^>]*>/g, '').trim()
  )

  const chunkSize = Math.ceil(meaningfulParts.length / columns)
  const result = []

  for (let i = 0; i < meaningfulParts.length; i += chunkSize) {
    result.push(meaningfulParts.slice(i, i + chunkSize).join(''))
  }

  return result
}

</script>

<style scoped>
@media (max-width: 760px) {
  .split-wrapper {
    justify-content: center;
  }
  .static-description {
    gap: 25px;
  }

}
</style>
