<template>
  <LoadingOverlay :visible="isLoading"/>
        <TabView :pt="{
        panelContainer: {
          style: 'background-color: transparent;'
        },
        navContainer: {
          style: 'border: none;'
        },
        nav: {
          style: 'background-color: transparent; border-width: 0;'
        },
        inkbar: {
          style: 'height: 4px; background-color: var(--color-primary-purple);'
        }
      }">
    <TabPanel :header="tabs.description.header">
      <div class="">
        <p
            class="fw-500 text-[18px] leading-[34px] text-[var(--color-primary-dark)]"
            v-html="product.description"
        />
      </div>
    </TabPanel>
    <TabPanel v-if="product" :header="tabs.characteristics.header">
      <div class="characteristics-list max-w-[1030px] w-full">
        <div
            v-for="characteristic in product?.attributes "
            :key="characteristic.key"
            class="flex items-center gap-4 py-2"
        >
          <p class="characteristics-list__title whitespace-nowrap">
            {{ characteristic.key }}
          </p>
          <div
              class="flex-grow h-px bg-[#5856D6]"
              style="margin-top: 1em;"
          ></div>
          <p class="characteristics-list__value whitespace-nowrap">
            {{ characteristic.value }}
          </p>
        </div>
      </div>
    </TabPanel>
    <TabPanel :header="tabs.delivery.header">
<!--      <div class="delivery-and-payment">-->
<!--        <p v-html="deliveryAndPaymentInfo.content"></p>-->
<!--      </div>-->
    </TabPanel>
    <TabPanel :header="tabs.reviews.header">
      <div class="reviews-content murecho-font flex justify-between">
        <div v-if="paginatedReviews.length" class="review-list max-w-[650px] w-full pt-[26px] justify-self-start">

          <div class="min-h-[270px] flex flex-col justify-between">
            <div
                class="review-card mb-[23px] last:mb-0 max-w-[618px]"
                v-for="review in paginatedReviews"
                :key="review.id"
            >
              <div class="flex mb-2 items-center">
                <strong class="mr-4"><p class="review-card__name fw-600">{{ fullReviewerName(review.user) }}</p>
                </strong>
                <div class="review-card__date mr-2 text-[14px]">{{ formatDateToDMY(review.createdAt) }}</div>
                <div class="review-card__stars mr-3">
                  <Rating v-model="review.rating" readonly>
                    <template #onicon>
                      <img src="@/assets/icons/star-filled.svg" class="mr-1"/>
                    </template>
                    <template #officon>
                      <img src="@/assets/icons/star-empty.svg" class="mr-1"/>
                    </template>
                  </Rating>
                </div>
                <div class="review-card__confirmed text-[#ADADAD] fw-400">
                  <p v-if="true">{{ t('purchase_confirmed') }}</p>
                  <p v-else>{{ t('purchase_not_confirmed') }}</p>
                </div>
              </div>

              <p class="review-card__comment">{{ getSlicedReview(review) }}</p>
              <p
                  v-if="isShowMoreButton(review.comment)"
                  class="flex cursor-pointer justify-end text-[12px] text-[var(--color-muted-light-gray)] fw-500"
                  @click="toggleComment(review._id)"
              >
                {{ expandedComments.has(review._id) ? 'Hide' : 'Read more' }}
              </p>
            </div>
            <div class="pagination-wrapper flex justify-end">
              <div class="pagination flex justify-between items-center  max-w-[80px] w-full">
                <button
                    @click="changePage(currentPage - 1)"
                    :disabled="currentPage === 1"
                    :class="{ 'is-disabled': currentPage === 1 }"
                >
                  <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        class="arrow-path"
                        d="M11.5 13.5L8.5 10.5L11.5 7.5M19.5 10.5C19.5 5.52944 15.4706 1.5 10.5 1.5C5.52944 1.5 1.5 5.52944 1.5 10.5C1.5 15.4706 5.52944 19.5 10.5 19.5C15.4706 19.5 19.5 15.4706 19.5 10.5Z"
                    />
                  </svg>
                </button>
                <span>{{ currentPage }}</span>
                <button
                    @click="changePage(currentPage + 1)"
                    :disabled="currentPage * itemsPerPage >= reviews.length"
                    :class="{ 'is-disabled': currentPage * itemsPerPage >= reviews.length }"
                >
                  <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        class="arrow-path"
                        d="M9.5 7.5L12.5 10.5L9.5 13.5M19.5 10.5C19.5 5.52944 15.4706 1.5 10.5 1.5C5.52944 1.5 1.5 5.52944 1.5 10.5C1.5 15.4706 5.52944 19.5 10.5 19.5C15.4706 19.5 19.5 15.4706 19.5 10.5Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>


        </div>

        <div v-else class="flex w-full items-center justify-center">
          <p class="text-[var(--color-primary-black)] text-[26px] italic">{{ t('no_reviews_yet') }}</p>
        </div>

        <div class="review-form max-w-[642px] w-full">
          <div class="mb-4">
            <h2 class="form-title fw-500">{{ t('new_review') }}</h2>
          </div>
          <div class="mb-4 rounded-[8px] max-w-[354px]">
            <InputText :disabled="!token" v-model="reviewerInputValue" class="w-full h-[42px] py-[10px] rounded-[8px]"
                       :placeholder="t('your_name')"/>
          </div>
          <div class="rounded-[8px]">
          <Textarea :disabled="!token" :maxlength="MAX_REVIEW_LENGTH" v-model="textareaValue" style="resize: none"
                    class="w-full rounded-[8px]"
                    :placeholder="t('share_your_impressions')" rows="5" cols="30"/>
          </div>
          <div class="mb-[10px] text-[var(--color-muted-light-gray)] flex justify-end">
            {{ getReviewLength }} / {{ MAX_REVIEW_LENGTH }}
          </div>
          <div class="rate-product mb-[27px] flex items-center">
            <p class="mr-[10px] text-[14px]">{{ t('rate_product') }}</p>
            <Rating :disabled="!token" v-model="rating">
              <template #onicon>
                <img src="@/assets/icons/star-filled.svg" class="mr-1"/>
              </template>
              <template #officon>
                <img src="@/assets/icons/star-empty.svg" class="mr-1"/>
              </template>
            </Rating>
          </div>

          <div class="rounded-[8px] max-w-[386px]">
            <Button :disabled="!token"
                    v-tooltip.top="!token ? { value: t('review_auth_tooltip'), autoHide: false } : null"
                    @click="leaveProductReview" :pt="{
            root: {
              class: 'send-review__btn btn-hover-default'
            }
          }">
              <p class="text-[14px]">{{ t('submit_review') }}</p>
            </Button>
          </div>
        </div>
      </div>
    </TabPanel>
  </TabView>
</template>

<script setup>

import {leaveReview, getReviewByProduct} from "~/services/api/reviews-service.js";
import {formatDateToDMY} from "~/utils/index.js";
import LoadingOverlay from "~/components/UI/LoadingOverlay/LoadingOverlay.vue";
import {storeToRefs} from "pinia";
import {useAuthStore} from "~/stores/auth.js";
import {useStaticPages} from "~/stores/staticPages.js";

const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({}),
  }
})


const MAX_REVIEW_LENGTH = 300;

const route = useRoute()

const productId = computed(() => route.params.id)

const {t} = useI18n()

const token = useCookie('token')

const staticPagesStore = useStaticPages()

const {currentUser} = storeToRefs(useAuthStore());

const fullNameOfUser = computed(() => token.value ? `${currentUser.value.firstName} ${currentUser.value.lastName}` : '');

const getReviewLength = computed(() => textareaValue.value.length);

const expandedComments = ref(new Set())

const deliveryAndPaymentInfo = computed(() => staticPagesStore.getCurrentPage('delivery-and-payment-product'))

const isShowMoreButton = (comment) => {
  return comment.length >= 200
}

const getSlicedReview = (review) => {
  const isExpanded = expandedComments.value.has(review._id)
  if (isExpanded || review.comment.length <= 150) return review.comment;
  return review.comment.slice(0, 150) + '...'
}

const toggleComment = (reviewId) => {
  if (expandedComments.value.has(reviewId)) {
    expandedComments.value.delete(reviewId)
  } else {
    expandedComments.value.add(reviewId)
  }
}

const rating = ref(null)

const reviewerInputValue = ref(fullNameOfUser.value)

const textareaValue = ref('')

const isLoading = ref(false)

const currentPage = ref(1);
const itemsPerPage = ref(2);

const reviews = ref(props.product?.reviews?.list || [])

const paginatedReviews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return reviews.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(reviews.value.length / itemsPerPage.value);
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const leaveProductReview = async () => {
  isLoading.value = true
  await leaveReview(productId.value, rating.value, textareaValue.value)
  clearFields()
  isLoading.value = false
}

const clearFields = () => {
  rating.value = null
  textareaValue.value = ''
}

const fullReviewerName = ({firstName, lastName}) => {
  return `${firstName} ${lastName}`
}

const tabs = {
  description: {
    header: computed(() => t('tabs_description')),
  },
  delivery: {
    header: computed(() => t('tabs_delivery'))
  },
  reviews: {
    header: computed(() => t('tabs_reviews')),
  },
  characteristics: {
    header: computed(() => t('tabs_characteristics')),
    list: [
      {key: "Виробник", value: "Nutrex Research"},
      {key: "Тип продукту", value: "Анаболічна добавка"},
      {key: "Форма випуску", value: "Капсули"},
      {key: "Кількість в упаковці", value: "60 капсул"},
      {key: "Основні інгредієнти", value: "Анаболічний комплекс на основі рослинних стероїдів"},
      {key: "Призначення", value: "Підвищення сили, витривалості та набору м’язової маси"},
      {key: "Рекомендована доза", value: "2 капсули на день (1 вранці, 1 ввечері)"},
      {key: "Час прийому", value: "Після їжі"},
      {key: "Особливості", value: "Без гормонів, не впливає на рівень тестостерону"},
      {key: "Кому підходить", value: "Спортсменам та бодібілдерам"},
      {key: "Протипоказання", value: "Індивідуальна непереносимість, вагітність, період лактації"},
      {key: "Термін придатності", value: "Вказаний на упаковці"},
    ]
  }
}
</script>

<style scoped>
.send-review__btn {
  background: var(--color-primary-dark);
  width: 100%;
}

button .arrow-path {
  stroke: #1B1F26;
  stroke-opacity: 0.72;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: stroke 0.3s ease;
}

button.is-disabled .arrow-path {
  stroke: #D0D0D0;
  stroke-opacity: 1;
}

@media (max-width: 1550px) {
  .reviews-content {
    flex-wrap: wrap;
  }
}

</style>