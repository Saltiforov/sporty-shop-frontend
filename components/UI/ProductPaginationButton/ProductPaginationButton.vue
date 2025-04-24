<template>
  <div class="pagination-button-wrapper w-full max-w-[278px]">
    <div class="pagination-button">
      <div class="flex w-full max-w-[220px] items-center gap-4">
        <Button :pt="{
          root: {
            class: 'slide-button'
          }
        }" @click="handlePageChange('left')">
          <svg width="31" height="31" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5 13.5L8.5 10.5L11.5 7.5M19.5 10.5C19.5 5.52944 15.4706 1.5 10.5 1.5C5.52944 1.5 1.5 5.52944 1.5 10.5C1.5 15.4706 5.52944 19.5 10.5 19.5C15.4706 19.5 19.5 15.4706 19.5 10.5Z" stroke="#1B1F26" stroke-opacity="0.72" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

        </Button>

        <div class="text-[15px] w-full justify-between flex">
          <p :class="{ 'active-page': activePageType === 'current' }"
             @click="activePageType = 'current'"
             class="page-count  max-w-[32px]">{{ currentPage }}</p>
          <div class="text-[#24242ACF] text-[20px] flex justify-center items-center max-w-[42px] w-full">...</div>
          <p  :class="{ 'active-page': activePageType === 'total' }"
              @click="activePageType = 'total'"
              class="page-count max-w-[32px]">{{ totalPages }}</p>
        </div>

        <Button :pt="{
          root: {
            class: 'slide-button'
          }
        }" @click="handlePageChange('right')">
          <svg width="31" height="31" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 7.5L12.5 10.5L9.5 13.5M19.5 10.5C19.5 5.52944 15.4706 1.5 10.5 1.5C5.52944 1.5 1.5 5.52944 1.5 10.5C1.5 15.4706 5.52944 19.5 10.5 19.5C15.4706 19.5 19.5 15.4706 19.5 10.5Z" stroke="#1B1F26" stroke-opacity="0.72" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

        </Button>
      </div>
    </div>

  </div>
</template>

<script setup>
import {ref, watch} from 'vue'

const props = defineProps({
  modelValue: {type: Number, default: 1},
  maxPages: {type: Number, required: true},
})

const emit = defineEmits(['update:modelValue'])

const currentPage = ref(props.modelValue)
const totalPages = ref(props.maxPages)
const initialTotalPages = ref(props.maxPages)

const activePageType = ref('current')

watch(() => props.modelValue, val => currentPage.value = val)
watch(() => props.maxPages, val => totalPages.value = val)

const handlePageChange = (direction = 'right') => {
  const isMovingLeft = direction === 'left'

  if (isMovingLeft && currentPage.value > 1) {
    currentPage.value -= 1
    if (totalPages.value < initialTotalPages.value) {
      totalPages.value += 1
    }
  }

  if (!isMovingLeft && currentPage.value < initialTotalPages.value) {
    currentPage.value += 1
    if (totalPages.value > 1) {
      totalPages.value -= 1
    }
  }
}

</script>

<style scoped>
.page-count {
  font-size: 20px;
  width: 33px;
  text-align: center;
  color: black;
  cursor: pointer;
}

.active-page {
  background-color: #24242ACF;
  color: white;
  border-radius: 50%;
}

.pagination-button {
  display: flex;
  justify-content: center;
  padding: 7.5px 21.5px;
  background: transparent;
  border: 1px solid #ADADAD;
  border-radius: 24px;
}

.slide-button {
  padding: 0;
  background: transparent;
  border: none;
}

.slide-button:hover {
  padding: 0;
  background: transparent;
  border: none;
}

.pagination-button:hover {
  background: transparent;
  border: 1px solid #ADADAD;
}

.load-more-button {
  background: transparent;
  border-radius: 24px;
  padding: 12px 23px;
}

.load-more-button:hover {
  background: transparent;
}

</style>
