<template>
  <div class="pagination-button-wrapper w-full max-w-[278px]">
    <div class="pagination-button">
      <div class="flex w-full max-w-[220px] items-center gap-4">
        <Button :disabled="isNoNextAvailablePageToLeft" :pt="{
          root: {
            class: 'slide-button'
          }
        }" @click="handlePageChange('left')">
          <svg width="31" height="31" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M11.5 13.5L8.5 10.5L11.5 7.5M19.5 10.5C19.5 5.52944 15.4706 1.5 10.5 1.5C5.52944 1.5 1.5 5.52944 1.5 10.5C1.5 15.4706 5.52944 19.5 10.5 19.5C15.4706 19.5 19.5 15.4706 19.5 10.5Z"
                stroke="#1B1F26" stroke-opacity="0.72" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </Button>
        <div class="text-[15px] w-full justify-between flex">
          <p :class="{ 'active-page btn-hover-default': activePageType === 'first' }"
             @click="handleClickPageType('first')"
             class="page-count  max-w-[32px]">{{ firstPage }}</p>

          <p :class="{ 'active-page btn-hover-default': activePageType === 'next' }"
             @click="handleClickPageType('next')"
             class="page-count max-w-[32px]">{{ nextPage }}</p>

          <p :class="{ 'active-page btn-hover-default': activePageType === 'last' }"
             @click="handleClickPageType('last')"
             class="page-count max-w-[32px]">{{ lastPage }}</p>
        </div>
        <Button :disabled="isNoNextAvailablePageToRight" :pt="{
          root: {
            class: 'slide-button'
          }
        }" @click="handlePageChange('right')">
          <svg width="31" height="31" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M9.5 7.5L12.5 10.5L9.5 13.5M19.5 10.5C19.5 5.52944 15.4706 1.5 10.5 1.5C5.52944 1.5 1.5 5.52944 1.5 10.5C1.5 15.4706 5.52944 19.5 10.5 19.5C15.4706 19.5 19.5 15.4706 19.5 10.5Z"
                stroke="#1B1F26" stroke-opacity="0.72" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue'

const PAGE_STEP = 1

const props = defineProps({
  modelValue: {type: Number, default: 1},
  maxPages: {type: Number, required: true},
  allLoaded: {type: Boolean, default: false},
})

const emit = defineEmits(['update:modelValue'])

const route = useRoute()

// watch(() => props.maxPages, (val) => lastPage.value = val)

const numberOfPageFromQuery = computed(() => Number(route.query.page))

const firstPage = ref(1)

const lastPage = computed(() => props.maxPages)

const nextPage = ref(2)

const activePageType = ref('first')

const isNoNextAvailablePageToRight = computed(() => {
  return lastPage.value - PAGE_STEP === nextPage.value && activePageType.value !== 'first'
})
const isNoNextAvailablePageToLeft = computed(() => {
  return firstPage.value + PAGE_STEP === nextPage.value && activePageType.value === 'next' || activePageType.value === 'first'
})

const pageNumberToEmit = ref({
  first: computed(() => firstPage.value),
  next: computed(() => nextPage.value),
  last: computed(() => lastPage.value),
})

const handleClickPageType = (type) => {
  activePageType.value = type
  emit('update:modelValue', pageNumberToEmit.value[type])
}

const setNextPage = (newPage) => {
  if (newPage !== firstPage.value && newPage !== lastPage.value) {
    nextPage.value = newPage
  }
}

const setPageState = (pageNumber, type) => {
  nextPage.value = pageNumber
  activePageType.value = type
}

const handlePageChange = (direction = 'right') => {
  const from = activePageType.value

  const pageToRight = from === 'first' ? firstPage.value + PAGE_STEP : nextPage.value + PAGE_STEP
  const pageToLeft = from === 'last' ? lastPage.value - PAGE_STEP : nextPage.value - PAGE_STEP

  activePageType.value = 'next'

  if (direction === 'left' && nextPage.value > firstPage.value) {
    setNextPage(pageToLeft)
    emit('update:modelValue', nextPage.value)
  }

  if (direction === 'right' && nextPage.value < lastPage.value) {
    setNextPage(pageToRight)
    emit('update:modelValue', nextPage.value)
  }
}


onMounted(() => {
  console.log("numberOfPageFromQuery.value ,lastPage",lastPage.value)
  console.log("numberOfPageFromQuery.value",numberOfPageFromQuery.value)
  if (numberOfPageFromQuery.value === lastPage.value) {
    activePageType.value = 'last'
    console.log("activePageType.value", activePageType.value)
  }
  // if (numberOfPageFromQuery.value > firstPage.value && numberOfPageFromQuery.value < lastPage.value) {
  //   setPageState(numberOfPageFromQuery.value, 'next')
  // }
})

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
