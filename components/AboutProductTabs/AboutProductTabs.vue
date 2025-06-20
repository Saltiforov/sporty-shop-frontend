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
      <ClientOnly>
        <div v-if="product.description">
          <p
              class="fw-500 text-[18px] leading-[34px] text-[var(--color-primary-dark)]"
              v-html="product.description"
          />
        </div>
        <p v-else class="no-data-text">
          {{ t('description_no_data') }}
        </p>
      </ClientOnly>
    </TabPanel>
    <TabPanel v-if="product" :header="tabs.characteristics.header">
      <div v-if="product?.attributes" class="characteristics-list max-w-[1030px] w-full">
        <div
            v-for="characteristic in product?.attributes"
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
            {{ characteristic.value ? characteristic.value : $t('characteristics_no_data') }}
          </p>
        </div>
      </div>
      <p v-else class="no-data-text">
        {{ t('characteristics_no_data') }}
      </p>
    </TabPanel>
    <TabPanel :header="tabs.delivery.header">
      <div v-if="deliveryAndPaymentInfo" class="delivery-and-payment">
        <p v-html="staticDeliveryAndPayment.content"></p>
      </div>
      <p v-else class="no-data-text no-data-reviews">
        {{ t('delivery_no_data') }}
      </p>
    </TabPanel>
    <TabPanel :header="tabs.reviews.header">
      <section v-if="authInitialized" class="reviews-content murecho-font flex justify-between">
        <section v-if="paginatedReviews.length" class="review-list max-w-[650px] w-full pt-[26px] justify-self-start">
          <div class="min-h-[270px] flex flex-col justify-between">
            <ul class="space-y-[46px]">
              <li
                  is="article"
                  v-for="review in paginatedReviews"
                  :key="review.id"
                  class="review-card max-w-[618px]"
              >
                <div class="flex mb-2 items-center">
                  <strong class="mr-4">
                    <p class="review-card__name fw-600">{{ fullReviewerName(review.user) }}</p>
                  </strong>
                  <time class="review-card__date mr-2 text-[14px]">
                    {{ formatDateToDMY(review.createdAt) }}
                  </time>
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
                  <p class="review-card__confirmed text-[#ADADAD] fw-400">
                    {{ true ? t('purchase_confirmed') : t('purchase_not_confirmed') }}
                  </p>
                </div>

                <p class="review-card__comment">{{ getSlicedReview(review) }}</p>
                <button
                    v-if="isShowMoreButton(review.comment)"
                    type="button"
                    class="flex cursor-pointer justify-end text-[12px] text-[var(--color-muted-light-gray)] fw-500"
                    @click="toggleComment(review._id)"
                >
                  {{ expandedComments.has(review._id) ? 'Hide' : 'Read more' }}
                </button>
              </li>
            </ul>

            <nav class="pagination-wrapper flex justify-end" aria-label="Review pagination">
              <div class="pagination flex justify-between items-center max-w-[90px] w-full">
                <button
                    @click="changePage(currentPage - 1)"
                    :disabled="currentPage === 1"
                    :class="{ 'is-disabled': currentPage === 1 }"
                    aria-label="Previous page"
                >
                  <img src="~/assets/icons/pagination-btn-arrow-left.svg" alt="pagination-btn">
                </button>
                <span>{{ currentPage }}</span>
                <button
                    @click="changePage(currentPage + 1)"
                    :disabled="currentPage * itemsPerPage >= reviews.length"
                    :class="{ 'is-disabled': currentPage * itemsPerPage >= reviews.length }"
                    aria-label="Next page"
                >
                  <img src="~/assets/icons/pagination-btn-arrow-right.svg" alt="pagination-btn">
                </button>
              </div>
            </nav>

          </div>
        </section>

        <section v-else class="no-data-text no-data-reviews">
          <p class="no-data-text">
            {{ t('no_reviews_yet') }}
          </p>
        </section>

        <section class="review-form max-w-[642px] w-full" aria-labelledby="review-form-title">
          <div class="mb-4">
            <h2 id="review-form-title" class="form-title fw-500">{{ t('new_review') }}</h2>
          </div>

          <form @submit.prevent="leaveProductReview">
            <div class="mb-4 rounded-[8px] max-w-[354px]">
              <label class="sr-only" for="reviewerName">{{ t('your_name') }}</label>
              <InputText
                  id="reviewerName"
                  :disabled="!isAuthenticated"
                  v-model="reviewerInputValue"
                  class="w-full h-[42px] py-[10px] rounded-[8px]"
                  :placeholder="t('your_name')"
              />
            </div>

            <div class="rounded-[8px]">
              <label class="sr-only" for="reviewTextarea">{{ t('share_your_impressions') }}</label>
              <Textarea
                  id="reviewTextarea"
                  :disabled="!isAuthenticated"
                  :maxlength="MAX_REVIEW_LENGTH"
                  v-model="textareaValue"
                  style="resize: none"
                  :class="[
                    'w-full rounded-[8px]',
                    isEmptyTextarea ? 'border border-red-500' : 'border border-[var(--color-border-gray)]'
                  ]"
                  :placeholder="t('share_your_impressions')"
                  rows="5"
                  cols="30"
              />
            </div>

            <div class="char-counter">
              {{ getReviewLength }} / {{ MAX_REVIEW_LENGTH }}
            </div>

            <fieldset class="rate-product mb-[27px] flex flex-col" aria-required="true">
              <legend class="sr-only">{{ t('rate_product') }}</legend>
              <div class="flex items-center">
                <p class="mr-[10px] text-[14px]">{{ t('rate_product') }}</p>
                <Rating :disabled="!isAuthenticated" v-model="rating">
                  <template #onicon>
                    <img src="@/assets/icons/star-filled.svg" class="mr-1"/>
                  </template>
                  <template #officon>
                    <img src="@/assets/icons/star-empty.svg" class="mr-1"/>
                  </template>
                </Rating>
              </div>
              <p
                  v-if="isEmptyRating"
                  class="empty-rating-text text-[12px] text-[var(--color-primary-pink)]"
              >
                {{ t('empty_rating') }}
              </p>
            </fieldset>

            <div class="rounded-[8px] max-w-[386px]">
              <Button
                  type="submit"
                  :disabled="!isAuthenticated"
                  v-tooltip.top="!isAuthenticated ? { value: t('review_auth_tooltip'), autoHide: false } : null"
                  :pt="{
            root: {
              class: 'send-review__btn btn-hover-default'
            }
          }"
              >
                <p class="text-[14px]">{{ t('submit_review') }}</p>
              </Button>
            </div>

            <div v-if="hasPurchasedProduct" class="purchased-product-text text-[var(--color-primary-pink)]">
              {{ hasPurchasedProduct }}
            </div>
          </form>
        </section>
      </section>
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

const staticPagesStore = useStaticPages()

const deliveryAndPaymentInfo = ref(null)

const staticDeliveryAndPayment = computed(() => {
  const {title, ...data} = deliveryAndPaymentInfo.value.content[0]
  return data
})

const MAX_REVIEW_LENGTH = 300;

const productId = computed(() => props.product._id)

const {t} = useI18n()

const {currentUser, isAuthenticated, authInitialized} = storeToRefs(useAuthStore());

const fullNameOfUser = computed(() => isAuthenticated.value ? `${currentUser.value.firstName} ${currentUser.value.lastName}` : '');

const getReviewLength = computed(() => textareaValue.value.length);

const expandedComments = ref(new Set())

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

const isEmptyRating = ref(false)

const isEmptyTextarea = ref(false)

const hasPurchasedProduct = ref('')

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
  const noRating = !rating.value
  const noText = !textareaValue.value.trim()

  isEmptyRating.value = noRating
  isEmptyTextarea.value = noText

  if (noRating || noText) {
    return
  }

  isLoading.value = true

  try {
    const response = await leaveReview(productId.value, rating.value, textareaValue.value)
    reviews.value.push(response)
    hasPurchasedProduct.value = ''
    clearFields()
  } catch (error) {
    hasPurchasedProduct.value = error.message
    console.error('Error when sending feedback:', error)
  } finally {
    isLoading.value = false
  }
}


const clearFields = () => {
  rating.value = null
  textareaValue.value = ''
}

const fullReviewerName = ({firstName, lastName}) => {
  const first = capitalizeFirstLetter(firstName ?? currentUser.value?.firstName ?? '')
  const last = capitalizeFirstLetter(lastName ?? currentUser.value?.lastName ?? '')
  return `${first} ${last}`.trim()
}

watch(() => rating.value, (newValue) => {
  if (newValue) {
    isEmptyRating.value = false
  }
})

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

onMounted(() => {
  deliveryAndPaymentInfo.value = staticPagesStore.getCurrentPage('shipping-and-payment')
})
</script>

<style scoped>
.send-review__btn {
  background: var(--color-primary-dark);
  width: 100%;
}

.char-counter {
  margin-bottom: 10px;
  color: var(--color-muted-light-gray);
  display: flex;
  justify-content: end;
  font-size: 16px;
}

.review-card__name {
  font-size: 14px;
  color: var(--color-primary-black);
}

.review-card__confirmed {
  font-size: 16px;
}

.review-card__comment {
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
}

.accordion-header {
  border-radius: var(--default-rounded);
  color: var(--color-primary-black);
  font-weight: 600;
  font-size: 24px;
}

.accordion-header:hover {
  color: var(--color-primary-black);
}

.pagination-wrapper .pagination button {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: transparent;
  transition: opacity 0.2s ease;
}

.pagination-wrapper .pagination button.is-disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination-wrapper .pagination span {
  display: inline-block;
  min-width: 20px;
  text-align: center;
}

.empty-reviews-text {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}

@media (max-width: 1550px) {
  .pagination-wrapper {
    justify-content: flex-start;
  }

  .empty-reviews-text {
    padding: 30px;
    margin-bottom: 30px;
  }
}

@media (max-width: 1250px) {
  .reviews-content {
    flex-wrap: wrap;
  }

  .review-list {
    margin-bottom: 12px;
  }

  .pagination-wrapper {
    justify-content: flex-end;
  }
}


</style>