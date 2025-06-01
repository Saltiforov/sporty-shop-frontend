<template>
  <Accordion :multiple="true" :activeIndex="[0]" :pt="{
    root: { class: 'border-none bg-transparent' },
    header: { class: 'border-none bg-transparent text-[18px] text-[var(--color-primary-dark)] fw-600' },
    content: { class: 'pt-2' }
  }">
    <AccordionPanel class="accordion-item" value="0">
      <AccordionHeader :pt="{
        root: {
          class: 'accordion-header',
          style: 'background-color: var(--color-gray-lavender); border: none;'
        }
      }">{{ tabs.description.header }}
      </AccordionHeader>
      <AccordionContent :pt="{
        content : {
          style : 'background-color: var(--color-gray-lavender);'
        }
      }">
        <ClientOnly>
          <div v-if="product.description">
            <p
                class="fw-500 text-[18px] leading-[34px] text-[var(--color-primary-dark)]"
                v-html="product.description"
            />
          </div>
          <p  v-else class="no-data-text">
            {{ t('description_no_data') }}
          </p>
        </ClientOnly>
      </AccordionContent>
    </AccordionPanel>

    <AccordionPanel class="accordion-item" value="1">
      <AccordionHeader :pt="{
        root: {
          class: 'accordion-header',
          style: 'background-color: var(--color-gray-lavender);'
        }
      }">{{ tabs.characteristics.header }}
      </AccordionHeader>
      <AccordionContent :pt="{
        content : {
          style : 'background-color: var(--color-gray-lavender);'
        }
      }">
        <div v-if="product?.attributes.length" class="characteristics-list w-full">
          <div
              v-for="characteristic in product?.attributes"
              :key="characteristic.key"
              class="flex items-start gap-4 py-2"
          >
            <p class="characteristics-list__title whitespace-nowrap">
              {{ characteristic.key }}
            </p>
            <div class="characteristics-separator flex-grow h-px bg-[#5856D6] mt-[1.3em]"></div>
            <p class="characteristics-list__value text-right">
              {{ characteristic.value ? characteristic.value : t('characteristics_no_data') }}
            </p>
          </div>
        </div>
        <p  v-else class="no-data-text">
          {{ t('characteristics_no_data') }}
        </p>
      </AccordionContent>
    </AccordionPanel>

    <AccordionPanel class="accordion-item" value="2">
      <AccordionHeader :pt="{
        root: {
          class: 'accordion-header',
          style: 'background-color: var(--color-gray-lavender);'
        }
      }">{{ tabs.delivery.header }}
      </AccordionHeader>
      <AccordionContent :pt="{
        content : {
          style : 'background-color: var(--color-gray-lavender);'
        }
      }">
        <div v-if="true" class="delivery-and-payment">
          <div class="mb-4">
            <strong class="fw-600 leading-[33px]">Оплата</strong>
          </div>
          <p class="mb-4">
            Оплата здійснюється через <strong>Telegram</strong>. Після оформлення замовлення наш
            менеджер зв’яжеться з вами у Telegram для підтвердження замовлення та надасть реквізити для оплати.
          </p>

          <div class="mb-4">
            <strong>Доступні методи оплати:</strong>
            <ul class="list-disc pl-6">
              <li>Банківський переказ (Monobank, ПриватБанк та інші)</li>
              <li>Переказ на картку</li>
              <li>Криптовалюта (за запитом)</li>
            </ul>
          </div>

          <div class="mb-4">
            <strong>Доставка</strong>
            <div>
              <p>По Україні:</p>
              <ul class="list-disc pl-6">
                <li>Нова Пошта – 1-3 дні, згідно з тарифами перевізника</li>
                <li>Укрпошта – 3-7 днів</li>
              </ul>
            </div>
            <div>
              <p>Міжнародна доставка:</p>
              <ul class="list-disc pl-6">
                <li>Доставка в інші країни здійснюється через міжнародні поштові сервіси</li>
                <li>Терміни та вартість доставки залежать від країни одержувача та вибраного перевізника</li>
                <li>Після відправки ви отримаєте номер для відстеження посилки</li>
              </ul>
            </div>
          </div>

          <div>
            <p>📌 Важливо!</p>
            <ul class="list-disc pl-6">
              <li>Відправка здійснюється тільки після повної передоплати</li>
              <li>Точну вартість міжнародної доставки уточнюйте у менеджера в Telegram</li>
            </ul>
          </div>
        </div>
        <p  v-else class="no-data-text no-data-reviews">
          {{ t('delivery_no_data') }}
        </p>
      </AccordionContent>
    </AccordionPanel>

    <AccordionPanel class="accordion-item" value="3">
      <AccordionHeader :pt="{
        root: {
          class: 'accordion-header',
          style: 'background-color: var(--color-gray-lavender);'
        }
      }">{{ tabs.reviews.header }}
      </AccordionHeader>
      <AccordionContent :pt="{
        content : {
          style : 'background-color: var(--color-gray-lavender);'
        }
      }">
        <section class="reviews-content murecho-font flex flex-col">
          <section v-if="paginatedReviews.length" class="review-list max-w-[650px] w-full pt-[26px] justify-self-start">
            <div class="reviews min-h-[270px] flex flex-col justify-between">
              <article
                  class="review-card mb-[23px] last:mb-0 max-w-[618px]"
                  v-for="review in paginatedReviews"
                  :key="review.id"
              >
                <div class="review-header flex flex-col mb-2 items-start">
                  <div class="max-w-[306px] w-full justify-between flex items-center">
                    <strong class="mr-4">
                      <p class="review-card__name fw-600">{{ fullReviewerName(review.user) }}</p>
                    </strong>
                    <time class="review-card__date mr-2 text-[14px]" :datetime="review.createdAt">
                      {{ formatDateToDMY(review.createdAt) }}
                    </time>
                  </div>
                  <div class="flex items-center">
                    <div class="review-card__stars mr-3">
                      <Rating v-model="review.rating" readonly>
                        <template #onicon>
                          <img src="../../assets/icons/star-filled.svg" class="mr-1" />
                        </template>
                        <template #officon>
                          <img src="../../assets/icons/star-empty.svg" class="mr-1" />
                        </template>
                      </Rating>
                    </div>
                    <div class="review-card__confirmed text-[#ADADAD] fw-400">
                      <p v-if="true">{{ t('purchase_confirmed') }}</p>
                      <p v-else>{{ t('purchase_not_confirmed') }}</p>
                    </div>
                  </div>
                </div>

                <div class="review-body">
                  <p class="review-card__comment">{{ getSlicedReview(review) }}</p>
                  <p
                      v-if="isShowMoreButton(review.comment)"
                      class="flex cursor-pointer justify-end text-[12px] text-[var(--color-muted-light-gray)] fw-500"
                      @click="toggleComment(review._id)"
                  >
                    {{ expandedComments.has(review._id) ? 'Hide' : 'Read more' }}
                  </p>
                </div>
              </article>

              <nav class="pagination-wrapper flex justify-end" aria-label="Review pagination">
                <div class="pagination flex justify-between items-center max-w-[80px] w-full">
                  <button
                      @click="changePage(currentPage - 1)"
                      :disabled="currentPage === 1"
                      :class="{ 'is-disabled': currentPage === 1 }"
                      aria-label="Previous page"
                  >
                  </button>
                  <span>{{ currentPage }}</span>
                  <button
                      @click="changePage(currentPage + 1)"
                      :disabled="currentPage * itemsPerPage >= reviews.length"
                      :class="{ 'is-disabled': currentPage * itemsPerPage >= reviews.length }"
                      aria-label="Next page"
                  >
                  </button>
                </div>
              </nav>
            </div>
          </section>

          <section v-else class="no-data-text no-data-reviews">
            <p class="no-data-text text-center mb-6">
              {{ t('no_reviews_yet') }}
            </p>
          </section>

          <section class="review-form max-w-[642px] w-full" aria-label="Review submission form">
            <div class="mb-4">
              <h2 class="form-title fw-500">{{ t('new_review') }}</h2>
            </div>

            <form @submit.prevent="leaveProductReview">
              <div class="mb-4 rounded-[8px] max-w-[354px]">
                <InputText
                    :disabled="!token"
                    v-model="reviewerInputValue"
                    class="w-full h-[42px] py-[10px] rounded-[8px]"
                    :placeholder="t('your_name')"
                />
              </div>

              <div class="rounded-[8px]">
        <Textarea
            :disabled="!token"
            :maxlength="MAX_REVIEW_LENGTH"
            v-model="textareaValue"
            style="resize: none"
            class="w-full rounded-[8px]"
            :placeholder="t('share_your_impressions')"
            rows="5"
            cols="30"
        />
              </div>

              <div class="mb-[10px] text-[var(--color-muted-light-gray)] flex justify-end">
                {{ getReviewLength }} / {{ MAX_REVIEW_LENGTH }}
              </div>

              <div class="rate-product mb-[27px] flex flex-col">
                <div class="flex items-center">
                  <p class="mr-[10px] text-[14px]">{{ t('rate_product') }}</p>
                  <Rating :disabled="!token" v-model="rating">
                    <template #onicon>
                      <img src="../../assets/icons/star-filled.svg" class="mr-1" />
                    </template>
                    <template #officon>
                      <img src="../../assets/icons/star-empty.svg" class="mr-1" />
                    </template>
                  </Rating>
                </div>
                <p v-if="isEmptyRating" class="empty-rating-text text-[12px] text-[var(--color-primary-pink)]">
                  {{ t('empty_rating') }}
                </p>
              </div>

              <div class="rounded-[8px] review-button__wrapper max-w-[386px]">
                <Button
                    type="submit"
                    :disabled="!token"
                    v-tooltip.top="!token ? { value: t('review_auth_tooltip'), autoHide: false } : null"
                    :pt="{ root: { class: 'send-review__btn btn-hover-default' } }"
                >
                  <p class="text-[14px]">{{ t('submit_review') }}</p>
                </Button>
              </div>

              <div v-if="hasPurchasedProduct" class="purchased-product-text">
                {{ hasPurchasedProduct }}
              </div>
            </form>
          </section>
        </section>

      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>

<script setup>
import {capitalizeFirstLetter, formatDateToDMY} from "~/utils/index.js";
import {storeToRefs} from "pinia";
import {useAuthStore} from "~/stores/auth.js";
import {leaveReview} from "~/services/api/reviews-service.js";

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const tabs = {
  description: {
    header: 'Опис'
  },
  delivery: {
    header: 'Доставка та оплата'
  },
  reviews: {
    header: 'Відгуки'
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

const MAX_REVIEW_LENGTH = 300;

const route = useRoute()
const productSlug = computed(() => route.params.slug)

const {t} = useI18n()

const token = useCookie('token')

const {currentUser} = storeToRefs(useAuthStore());

const fullNameOfUser = computed(() => token.value ? `${currentUser.value.firstName} ${currentUser.value.lastName}` : '');

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
  if (!rating.value) {
    isEmptyRating.value = true
    return
  }

  isLoading.value = true
  isEmptyRating.value = false

  try {
    const response = await leaveReview(productSlug.value, rating.value, textareaValue.value)
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

</script>

<style scoped>
.accordion-item {
  margin-bottom: 1.5em;
  border-bottom: none;
}

.accordion-header {
  border-radius: var(--default-rounded);
}

.characteristics-list__title {
  font-size: 15px;
  line-height: 36px;
}

.characteristics-list__value {
  line-height: 36px;
  font-size: 15px;
  max-width: 40%;
  word-break: break-word;
}

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

.empty-reviews-text {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}

@media (max-width: 664px) {
  .review-button__wrapper {
    margin: 0 auto;
  }

  .empty-reviews-text {
    padding: 15px;
    margin-bottom: 15px;
  }
}
@media (max-width: 450px) {
  .characteristics-list__value {
    max-width: 45%;
  }
}

</style>