<template>
  <div class="about-product-container px-4 py-6">
    <LayoutBreadcrumb v-if="!isLoading" :product="{productTitle: product.name, filters: product.filters}"/>
    <BreadcrumbSkeleton v-else/>
    <LoadingOverlay :visible="isLoading"/>

    <div class="header flex flex-col items-center mb-2 px-5">
      <div class="article text-[var(--color-muted-light-gray)] self-end ">
        <p>{{ `${t('product_sku')}: 9876678` }}</p>
      </div>
    </div>

    <div
        class="about-product-content mb-[46px] text-[var(--color-muted-light-gray)] flex flex-col lg:flex-row justify-between items-center gap-8">
      <div class="image relative w-full max-w-[678px]">
        <div class="favorite-button-wrapper absolute z-[100] top-2 -right-4">
          <FavoriteButton
              v-if="token"
              inactive-color="var(--color-primary-dark-red)"
              :is-favorite="product.isFavorite"
              :product="product"
              :icon-size="{ width: 36, height: 32 }"
          />
        </div>

        <div v-if="images.length">
          <div class="about-product__image-wrapper max-w-[678px] mx-auto h-[678px] w-full">
            <SwiperWrapper
                :items="images"
                :options="swiperOptions"
                @swiper-slide-to-left="slideChange('left')"
                @swiper-slide-to-right="slideChange('right')"
            >
              <template #default="{ item }">
                <img
                    :src="getSelectedImage || item"
                    class="w-full about-product__image h-[660px] object-cover"
                    alt="product-image"
                />
              </template>
            </SwiperWrapper>
          </div>

          <div class="flex gallery-container gap-[40px] justify-center">
            <img
                class="max-w-[100px] gallery-image border cursor-pointer rounded-[4px] shadow-md object-cover h-[100px]"
                v-for="(img, idx) in galleryImages"
                @click="handleGalleryClick(idx)" :src="img" :key="idx" alt="image.png">
          </div>
        </div>
        <AboutProductImageSkeleton class="max-w-[678px] mx-auto" v-else/>

      </div>


      <div
          v-if="productItem"
          class="about-product-info w-full min-h-[625px] mx-auto flex flex-col self-start max-w-full lg:max-w-[870px]"
      >
        <div
            class="about-product-info__content bg-[var(--color-gray-lavender)] h-full min-h-[625px] rounded-[8px] p-[35px_55px_65px_31px] flex flex-col justify-between">

          <div>
            <h1 class="product-name text-[36px] text-[var(--color-primary-dark)] font-600 leading-[34px] mb-4">
              {{ product.name }}</h1>

            <div class="availability-grade mb-[73px] flex justify-between">
              <div class="availability">
                <p v-if="product.availability" class="text-[var(--color-primary-green)]">
                  {{ t('product_available') }}
                </p>
                <p v-else class="text-[var(--color-primary-red)]">
                  {{ t('product_out_of_stock') }}
                </p>
              </div>
              <div class="flex items-center">
                <svg class="mr-2" width="18" height="18" viewBox="0 0 18 17" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M1.75122 6.75258C1.51628 6.53531 1.6439 6.14254 1.96167 6.10487L6.46436 5.5708C6.59387 5.55544 6.70636 5.47411 6.76099 5.35569L8.66016 1.23835C8.79419 0.947769 9.20728 0.947714 9.34131 1.23829L11.2405 5.3556C11.2951 5.47403 11.4069 5.55558 11.5364 5.57093L16.0393 6.10487C16.3571 6.14254 16.4843 6.53543 16.2494 6.75269L12.9208 9.83143C12.8251 9.91998 12.7824 10.0518 12.8079 10.1797L13.6913 14.627C13.7536 14.9408 13.4196 15.184 13.1404 15.0277L9.18386 12.8125C9.07006 12.7488 8.9318 12.7491 8.818 12.8128L4.86108 15.0271C4.58185 15.1834 4.24721 14.9408 4.30957 14.627L5.19311 10.18C5.21852 10.0521 5.176 9.91995 5.08025 9.8314L1.75122 6.75258Z"
                      stroke="var(--color-primary-yellow)" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round"/>
                </svg>
                <p class="product-grade text-[16px] text-[var(--color-muted-gray)] fw-500">
                  {{ formatRating(product.reviews?.averageRating) }}
                  <span>({{ product.reviews?.reviewCount ?? '0' }})</span>
                </p>
              </div>
            </div>

            <ClientOnly>
              <div class="description">
                <p class="fw-500 text-[18px] leading-[34px] truncate-6-lines text-[var(--color-primary-dark)]"
                   v-html="product.description"></p>
              </div>
            </ClientOnly>


          </div>

          <div>
            <div class="developer mb-[24px]">
              <p class="text-[20px] fw-400 leading-[34px]">
                {{ t('product_developer') }} {{ product.vendor }}
              </p>
            </div>

            <div class="price mb-10 flex items-center">
              <div class="mr-[57px] max-w-[150px] w-full price_and_discount">
                <div :class="[hasDiscount ? 'text-[16px] line-through text-[#999]' : 'text-[36px]']"
                     class="fw-600 discount mr-[57px] text-[var(--color-primary-black)] leading-[34px]">
                  {{ priceByCurrency }}
                  <span>{{ t(currencyStore.label) }}</span>
                </div>

                <p v-if="hasDiscount"
                   class="text-[var(--color-primary-pink)] price-with-discount text-[24px] leading-[22px] fw-500">
                  {{ priceByCurrencyWithDiscount }} {{ t(currencyStore.label) }}
                </p>
              </div>

              <AmountSelector
                  v-model="product.quantity"
                  :style="{ width: '129px' }"
                  :input-styles="{ width: '53px', height: '60px' }"
              />
            </div>

            <div class="action-button text-[var(--color-gray-pale-lavender)]">
              <Button @click="addToCart(product)" :pt="{ root: { class: 'product-buy-now__btn' } }"
                      class="bg-[var(--color-primary-green)] hover:bg-[var(--color-primary-green)] rounded-2xl max-w-[456px] w-full h-[59px] flex justify-center items-center">
                <p class="mr-1">{{ t('product_buy_now') }}</p>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M1 1H1.26835C1.74213 1 1.97943 1 2.17267 1.08548C2.34304 1.16084 2.48871 1.28218 2.59375 1.43604C2.71269 1.61026 2.75564 1.8429 2.84137 2.30727L5.00004 14L15.4218 14C15.875 14 16.1023 14 16.29 13.9199C16.4559 13.8492 16.5989 13.7346 16.7051 13.5889C16.8252 13.4242 16.8761 13.2037 16.9777 12.7631L16.9785 12.76L18.5477 5.95996L18.5481 5.95854C18.7023 5.29016 18.7796 4.95515 18.6947 4.69238C18.6202 4.46182 18.4635 4.26634 18.2556 4.14192C18.0184 4 17.6758 4 16.9887 4H3.5M16 19C15.4477 19 15 18.5523 15 18C15 17.4477 15.4477 17 16 17C16.5523 17 17 17.4477 17 18C17 18.5523 16.5523 19 16 19ZM6 19C5.44772 19 5 18.5523 5 18C5 17.4477 5.44772 17 6 17C6.55228 17 7 17.4477 7 18C7 18.5523 6.55228 19 6 19Z"
                      stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </Button>
            </div>
          </div>

        </div>
      </div>

      <AboutProductInfoSkeleton v-else/>
    </div>

    <AboutProductAccordion v-if="!isLoading" class="about-product-accordion" :product/>

    <div class="tabs-wrapper pt-[24px] pr-[55px] pb-[32px] pl-[55px] rounded-md bg-[var(--color-gray-lavender)]">
      <AboutProductTabs
          v-if="!isLoading"
          :product
          :reviews
      />
      <AboutProductTabsSkeleton v-else/>
    </div>


    <div v-if="recommended.length" class="recommended-products">
      <div class="flex items-center justify-center mb-[70px] gap-6 my-8">
        <div class="h-px w-[56px] bg-[var(--color-primary-purple)]"></div>
        <h2 class="text-xl font-semibold text-center whitespace-nowrap">
          {{ t('recommended_products') }}
        </h2>
        <div class="h-px w-full bg-[var(--color-primary-purple)]"></div>
      </div>

      <div class="recommended-products__content mx-auto max-w-[1500px] pb-[70px] p-4">
        <SwiperWrapper
            :items="products"
            :options="recommendedProductsSwiperOptions"
        >
          <template #default="{ item }">
            <ProductCard class="mt-3 mb-3" :product="item"/>
          </template>
        </SwiperWrapper>
      </div>
    </div>

    <div v-if="viewed.length" class="viewed-products flex items-center justify-center gap-6 my-8">
      <div class="h-px w-[56px] bg-[var(--color-primary-purple)]"></div>
      <h2 class="text-xl font-semibold text-center whitespace-nowrap">
        {{ t('viewed_products') }}
      </h2>
      <div class="h-px w-full bg-[var(--color-primary-purple)]"></div>
    </div>

    <div
        class="viewed-products__content mx-auto max-w-[1500px] pb-[70px] p-4">
      <SwiperWrapper
          :items="viewed"
          :options="recommendedProductsSwiperOptions"
      >
        <template #default="{ item }">
          <ProductCard
              class="mt-3 mb-3"
              :product="item"
              @add-to-cart="showProductAddedToast"
          />
        </template>
      </SwiperWrapper>
    </div>
  </div>
</template>


<script setup>
import {fullImageUrls} from "~/utils/index.js";
import DefaultProductImage from '/assets/images/product-image.png'

definePageMeta({
  layout: 'breadcrumb',
})

import ProductCard from "~/components/Cards/ProductCard/ProductCard.vue";
import AmountSelector from "~/components/UI/AmountSelector/AmountSelector.vue";
import FavoriteButton from "~/components/UI/FavoriteButton/FavoriteButton.vue";
import LoadingOverlay from "~/components/UI/LoadingOverlay/LoadingOverlay.vue";

import {
  getProduct,
  addProductToFavorites,
  deleteProductFromFavorites,
  getAllProducts, getProductBySlug
} from "~/services/api/product-service.js";
import {useCartStore} from "~/stores/cart.js";

import {useViewedProducts} from "~/composables/useViewedProducts.js";

import {useToastManager} from "~/composables/useToastManager.js";
import AboutProductInfoSkeleton
  from "~/components/Skeletons/AboutProduct/AboutProductInfoSkeleton/AboutProductInfoSkeleton.vue";
import AboutProductImageSkeleton
  from "~/components/Skeletons/AboutProduct/AboutProductImageSkeleton/AboutProductImageSkeleton.vue";
import AboutProductTabsSkeleton
  from "~/components/Skeletons/AboutProduct/AboutProductTabsSkeleton/AboutProductTabsSkeleton.vue";
import AboutProductAccordion from "~/components/AboutProductAccordion/AboutProductAccordion.vue";
import LayoutBreadcrumb from "~/components/UI/LayoutBreadcrumb/LayoutBreadcrumb.vue";
import BreadcrumbSkeleton from "~/components/Skeletons/BreadcrumbSkeleton/BreadcrumbSkeleton.vue";

const {t} = useI18n()

const cartStore = useCartStore()

const token = useCookie('token')

const slug = useRoute().params.slug

console.log('slug', slug);

const {data: productItem, pending, error} = await useAsyncData(
    'product slug',
    () => getProductBySlug(slug)
)
const isLoading = ref(pending.value)

const product = ref(productItem.value)

const images = ref([])

const galleryImages = ref([])

const getProductImages = (product, size) => {
  return product?.images?.length
      ? fullImageUrls(product.images, size)
      : [DefaultProductImage]
}

images.value = getProductImages(product.value, 'small')

galleryImages.value = getProductImages(product.value, 'thumb')

const {showProductAddedToast} = useToastManager()

const {viewed, removeProductFromViewedAndRedirect} = useViewedProducts()

const currencyStore = useCurrencyStore()

const recommended = ref([])

const selectedImage = ref(null)

const priceByCurrencyWithDiscount = computed(() => {
  return currencyStore.getCurrency === 'uah'
      ? product.value.price.uah - product.value.discount.uah
      : product.value.price.eur - product.value.discount.eur
})

const priceByCurrency = computed(() => {
  return currencyStore.getCurrency === 'uah' ? product.value.price?.uah : product.value.price?.eur
})

const hasDiscount = computed(() => {
  const price = priceByCurrency.value
  const discounted = priceByCurrencyWithDiscount.value
  return discounted !== null && discounted !== undefined && discounted < price
})

const addToCart = (product) => {
  cartStore.addToCart(product);
  showProductAddedToast(product);
}

const swiperOptions = {
  effect: 'creative',
  loop: true,
  autoplay: {
    delay: 1000,
  },
}

const recommendedProductsSwiperOptions = {
  slidesPerView: 4,
  loop: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    756: {
      slidesPerView: 2,
    },
    910: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 3,
    },
    1410: {
      slidesPerView: 4,
    },

  },
}

const slideChange = (direction) => {
  const imageIdx = images.value.findIndex(img => img === selectedImage.value)

  const nextIndex = direction === 'right' ? imageIdx + 1 : imageIdx - 1

  if (selectedImage.value) {
    selectedImage.value = images.value[nextIndex]
  }
}

const getSelectedImage = computed(() => selectedImage.value)

const handleGalleryClick = (index) => {
  selectedImage.value = images.value[index]
}

onMounted(async () => {
  try {
    isLoading.value = true
  } catch (error) {
    if (process.client && error?.status === 404) {
      // todo change to slug delete
      // await removeProductFromViewedAndRedirect(id)
    } else {
      console.error('Error when loading goods:', error)
    }
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
.send-review__btn {
  background: var(--color-primary-dark);
  width: 100%;
}

.send-review__btn:hover {
  background: var(--color-primary-dark);
}

.nav-panel:hover {
  color: darkred;
}

.product-buy-now__btn:hover {
  background: var(--color-primary-green);
  border: none;
}

.product-buy-now__btn {
  border: none;
}

.about-product-accordion {
  display: none;
}

.truncate-6-lines {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.amount-selector {
  width: 53px;
  height: 61px;
}

@media (max-width: 1400px) {
  .about-product-content {
    flex-wrap: wrap;
    flex-direction: column;
  }

  .article {
    align-self: flex-start;
  }

  .about-product-info {
    max-width: 100%;
  }

  .favorite-button-wrapper {
    top: -12px;
    right: -16px;
  }

}

@media (max-width: 920px) {
  .about-product-container {
    padding: 0;
  }

  .description p {
    font-size: 16px;
  }

  .about-product-accordion {
    display: block;
  }

  .tabs-wrapper {
    display: none;
  }

  .product-name {
    font-size: 20px;
  }

  .availability-grade {
    margin-bottom: 18px;
  }

  .price {
    margin-bottom: 20px;
  }

  .about-product-info {
    min-height: 500px;
  }

  .about-product-info__content {
    min-height: 500px;
    padding: 12px 10px 25px 10px;
  }
}

@media (max-width: 774px) {
  .about-product__image-wrapper {
    height: 390px;
    margin-bottom: 8px;
  }

  .image {
    width: 390px;
  }

  .about-product__image {
    height: 390px;
  }

  .action-button {
    display: flex;
    justify-content: center;
  }

  .price_and_discount {
    display: flex;
    align-items: center;
  }

  .price {
    justify-content: space-around;
  }

  .discount {
    margin-right: 20px;
  }

  .gallery-image {
    max-width: 81px;
    max-height: 83px;
  }
}

@media (max-width: 600px) {
  .about-product__image-wrapper {
    height: 290px;
  }

  .image {
    width: 290px;
  }

  .about-product__image {
    height: 290px;
  }

  .gallery-image {
    max-width: 61px;
    max-height: 63px;
  }

  .developer p {
    font-size: 16px;
  }

  .discount {
    font-size: 20px;
  }

  .price-with-discount {
    font-size: 20px;
  }
}

@media (max-width: 420px) {
  .gallery-container {
    gap: 15px;
  }

  .discount {
    font-size: 18px;
  }

  .price-with-discount {
    font-size: 18px;
  }

  .price_and_discount {
    margin-right: 20px;
  }
}


</style>
