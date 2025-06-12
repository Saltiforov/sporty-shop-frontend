<template>
  <section>
    <div
        v-for="(item, index) in data"
        :key="index"
        class="mb-10 max-w-[1400px] mx-auto px-[15px]"
    >
      <div
          v-if="item.image"
          :class="[
          'flex gap-8 items-start justify-between',
          item.imagePosition === 'left' ? 'flex-row-reverse' : 'flex-row'
        ]"
      >
        <div class="flex-1 max-w-[850px]">
          <div
              v-for="(block, i) in useContentParserOrdered(item.content)"
              :key="i"
              class="mb-6"
          >
            <h1
                v-if="block.type === 'h1'"
                v-text="block.content"
                :class="[
                'text-3xl font-bold mb-4',
                item.split ? 'text-center' : ''
              ]"
            />
            <h2
                v-else-if="block.type === 'h2'"
                v-text="block.content"
                :class="[
                'text-2xl font-semibold mb-4',
                item.split ? 'text-center' : ''
              ]"
            />
            <p v-else-if="block.type === 'p'" v-text="block.content" class="static-description mb-4"/>

            <div
                v-else-if="block.type === 'list' && item.split"
                class="grid grid-cols-2 gap-6"
            >
              <ul>
                <li
                    v-for="(li, j) in splitList(block.content)[0]"
                    :key="`l-${j}`"
                    class="mb-[33px] flex items-start gap-2 min-h-[51px]"
                >
      <span class="text-primary mt-1 shrink-0 w-[51px] h-[51px]">
        <img src="~/assets/icons/about-list-icon.svg" alt="" class="w-full h-full object-contain">
      </span>
                  <span class="flex-1 self-center">{{ li }}</span>
                </li>
              </ul>
              <ul>
                <li
                    v-for="(li, j) in splitList(block.content)[1]"
                    :key="`r-${j}`"
                    class="mb-[33px] flex items-start gap-2 min-h-[51px]"
                >
      <span class="text-primary mt-1 shrink-0 w-[51px] h-[51px]">
        <img src="~/assets/icons/about-list-icon.svg" alt="" class="w-full h-full object-contain">
      </span>
                  <span class="flex-1 self-center">{{ li }}</span>
                </li>
              </ul>
            </div>
            <ul v-else-if="block.type === 'list'">
              <li v-for="(li, j) in block.content" :key="j">{{ li }}</li>
            </ul>
          </div>
        </div>

        <img :src="item.image" alt=""/>
      </div>

      <div v-else>
        <div
            v-for="(block, i) in useContentParserOrdered(item.content)"
            :key="i"
            class="mb-6"
        >
          <h1
              v-if="block.type === 'h1'"
              v-text="block.content"
              :class="[
              'text-3xl font-bold mb-4',
              item.split ? 'text-center' : ''
            ]"
          />
          <h2
              v-else-if="block.type === 'h2'"
              v-text="block.content"
              :class="[
              'text-2xl font-semibold mb-4',
              item.split ? 'text-center' : ''
            ]"
          />
          <p v-else-if="block.type === 'p'" v-text="block.content" class="static-description mb-4"/>

          <div v-else-if="block.type === 'list' && item.split" class="grid grid-cols-2 gap-6">
            <ul>
              <li
                  v-for="(li, j) in splitList(block.content)[0]"
                  :key="`l-${j}`"
                  class="mb-[33px] flex items-start gap-2"
              >
                <span class="text-primary mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </span>
                <span>{{ li }}</span>
              </li>
            </ul>
            <ul>
              <li
                  v-for="(li, j) in splitList(block.content)[1]"
                  :key="`r-${j}`"
                  class="mb-[33px] flex items-start gap-2"
              >
                <span class="text-primary mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </span>
                <span>{{ li }}</span>
              </li>
            </ul>
          </div>

          <ul v-else-if="block.type === 'list'">
            <li v-for="(li, j) in block.content" :key="j">{{ li }}</li>
          </ul>
        </div>
      </div>
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


function useContentParserOrdered(htmlString) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')

  const result = []

  Array.from(doc.body.childNodes).forEach(node => {
    if (node.nodeType === 1) {
      const tag = node.tagName.toLowerCase()
      const text = node.textContent.trim()

      if (!text) return

      if (tag === 'h1' || tag === 'h2') {
        result.push({type: tag, content: text})
      } else if (tag === 'p' || tag === 'div' || tag === 'undefined') {
        result.push({type: 'p', content: text})
      } else if (tag === 'ol') {
        const items = Array.from(node.querySelectorAll('li')).map(li => li.textContent.trim())
        if (items.length) result.push({type: 'list', content: items})
      }
    }
  })

  return result
}

function splitList(list) {
  const middle = Math.ceil(list.length / 2)
  return [list.slice(0, middle), list.slice(middle)]
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
