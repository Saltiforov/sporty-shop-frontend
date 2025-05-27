<template>
  <div>
    <div
        v-if="isOpen"
        class="fixed inset-0 z-[400] bg-black bg-opacity-50 backdrop-blur-custom z-40"
        @click="emit('close')"
    ></div>
    <div
        class="fixed z-[500] border-top-radius top-0 right-0 h-full bg-[var(--color-gray-light-lavender)] shadow-lg transform transition-transform duration-300 z-50 shopping-cart  pt-[36px] pb-[28px] pl-[46px] pr-[30px] rounded-tl-[32px] rounded-bl-[32px]"
        :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
    >

      <div class="header flex justify-between pb-[49px] items-center">
        <div class="flex">
          <h1 class="large-title mr-[25px]">{{ t('cart_title') }}</h1>
          <p class="large-title" style="color: var(--color-muted-light-gray)">({{ cartStore.cartCount }})</p>
        </div>
        <div class="pr-[8px]">
          <Button :pt="{ root: { class: 'close-cart' } }" @click="$emit('close')">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M1.63597 1.63649L7.51465 7.51517M7.51465 7.51517L13.3933 13.3938M7.51465 7.51517L1.63597 13.3938M7.51465 7.51517L13.3933 1.63649"
                  stroke="#9E2B24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </Button>
        </div>
      </div>

      <div v-if="!cartItems.length" class="cart-empty-title">
        <h2 class="text-center text-[var(--color-gray-dark-charcoal)] text-[24px] py-[50px]">
          {{ t('empty_cart_text') }}
        </h2>
      </div>

      <ProductsOverview :products-overview="cartItems"/>
      <div class="make-order-block flex flex-col items-center">
        <div class="mb-[10px] w-full max-w-[423px]">
          <NuxtLink to="/checkout">
            <Button @click="$emit('close')" :pt="{ root: { class: 'make-order-button btn-hover-default' } }">
              <p class="fw-400 murecho-font text-[#FFFFFF] text-[14px] leading-[22px]">
                {{ t('make_order') }}
              </p>
            </Button>
          </NuxtLink>
        </div>
        <div>
          <Button @click="handleContinueShopping" :pt="{
            root: {
              style: {
                border: 'none',
                background: 'transparent',
                color: 'var(--small-title-color)',
              }
            }
          }" class="continue-shopping__btn" to="/">
            <p class="murecho-font">{{ t('continue_shopping') }}</p>
          </Button>
        </div>
      </div>

      <div class="recommended-products mt-[50px]">
        <div class="flex items-center gap-4">
          <div class="w-[152px] h-px bg-white"></div>
          <h2 class="h2-title text-center whitespace-nowrap">{{ t('recommended_products') }}</h2>
          <div class="w-[152px] h-px bg-white"></div>
        </div>
        <div class="recommended-products-cards mt-[22px] grid grid-cols-2 gap-[30px]">
          <ProductCard
              v-for="product in products"
              :key="product.id"
              variant="small"
              :product="product"
              @click="handleRecommendedProduct"
              @add-to-cart="showProductAddedToast"
          >
            <template #buy-button>
              <Button
                  @click="addToCart(product)"
                  :pt="{
                    root: {
                      style: {
                        backgroundColor: 'var(--color-primary-green)',
                        color: 'var(--color-primary-white)',
                        borderRadius: '100%',
                        border: 'none',
                        padding: '0',
                        width: '29px',
                        height: '29px',
                      }
                    }
                   }"
                  class="flex justify-center items-center"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 7.5H7.5M7.5 7.5H13.5M7.5 7.5V13.5M7.5 7.5V1.5"
                        stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </Button>
            </template>
          </ProductCard>
        </div>
      </div>

    </div>
  </div>
</template>


<script setup>
import ProductCard from "~/components/Cards/ProductCard/ProductCard.vue";
import { useToastManager } from "~/composables/useToastManager.js";

const emit = defineEmits(["continue-shopping", "handle-recommended-product", "close"]);

const cartStore = useCartStore();
const { showProductAddedToast } = useToastManager();
const { t } = useI18n();

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: true,
  },
  cartItems: {
    type: Array,
    default: () => [],
  },
});

const addToCart = (product) => {
  showProductAddedToast(product);
  cartStore.addToCart(product);
};

const handleContinueShopping = () => {
  emit("continue-shopping");
};

const handleRecommendedProduct = () => {
  cartStore.close();
};

// watch(() => props.isOpen, (newVal) => {
//   document.body.style.overflow = newVal ? 'hidden' : '';
// });
//
// onUnmounted(() => {
//   document.body.style.overflow = '';
// });

const products = ref([
  {
    _id: '680be0d6e0a2df86dc64154e',
    name: "Енергетичний напій MOXY Power+",
    rating: '4.6',
    price_uah: 65,
    price_eur: 1.63,
    price: 70,
    images: [
      "/uploads/icons/581f66ac553b0d4f31d43869575c76c391c2876f6cf2258a842d97f7affd4722.webp",
      "/uploads/icons/3382c9ae21b4f6cd49e2f42f1e0bc453bc87e3241310f8cf0aa24d5e7b2a6ded.webp",
      "/uploads/icons/3d0f3bd3e1d69aa7db5c7eabe117eff5664a87d4c80d2c6b3434a5a5a91244d3.webp",
      "/uploads/icons/7f784dd57f85b4fbf98d3fd0aa38abaefe40f7a7c7ae8fff53c38b4b8d35233c.webp"
    ],
    discount: 10,
    isFavorite: false,
  },
  {
    _id: "680bdf7fe0a2df86dc6414ec",
    name: "Креатин моногідрат - OstroVit",
    rating: '4.1',
    price_uah: 895,
    price_eur: 18,
    images: [
      "/uploads/icons/0a0773098658f21b18b20988c7c04d04eae01210a0dd55452dff452dce6ef68a.webp",
      "/uploads/icons/3d0b0070887319eb85f0a5704918dbedace22f615db060b8c6fb874b894b1e78.webp",
      "/uploads/icons/0b2b224e67639bacc9fb17209c3d36114967fb649f10d132f11e8f9e3f6254ca.webp",
      "/uploads/icons/26e81294fed5013c4714bff7634f9438d3247b0e5558ab8c1cbde67f7bfc8233.webp"
    ],
    discount: 100,
    price: 699,
    isFavorite: true,
  },
]);
</script>

<style scoped>
.make-order-button {
  width: 100%;
  border-radius: var(--default-rounded);
  background: var(--color-primary-dark);
}

.make-order-button:hover {
  background: var(--color-primary-dark);
}

.card-buy__small__btn:hover {
  background: var(--color-primary-green);
  border: none;
}

.close-cart {
  background: transparent;
  border: none;
  padding: 0;
}

.close-cart:hover {
  background: transparent;
  border: none;
  padding: 0;
}

.shopping-cart {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  max-width: 619px;
  width: 100%;
  background-color: #E6E7F8;
  z-index: 1000;
  box-shadow: -4px 0px 8px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
}

@media (max-width: 1700px) {
  .shopping-cart {
    padding: 18px 14px 23px 24px;
    width: 40%;
  }
}

@media (max-width: 1300px) {
  .shopping-cart {
    width: 45%;
    padding: 18px 14px 23px 14px;
  }
}

@media (max-width: 1000px) {
  .shopping-cart {
    width: 50%;

  }
}
@media (max-width: 1000px) {
  .shopping-cart {
    width: 60%;
  }
}

@media (max-width: 800px) {
  .shopping-cart {
    width: 65%;
  }
}

@media (max-width: 700px) {
  .recommended-products {
  }
  .shopping-cart {
    width: 80%;
  }
}

@media (max-width: 610px) {
  .shopping-cart {
    padding-right: 8px;
    padding-left: 8px;
  }
  .header {
    padding: 0 10px 20px 10px;
  }
}

@media (max-width: 475px) {
  .shopping-cart {
    width: 90%;

  }
}



.cart-slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.cart-slide-enter-active {
  transition: transform 0.4s ease, opacity 0.3s ease;
}
.cart-slide-enter-to {
  transform: translateX(0%);
  opacity: 1;
}
.cart-slide-leave-from {
  transform: translateX(0%);
  opacity: 1;
}
.cart-slide-leave-active {
  transition: transform 0.4s ease, opacity 0.3s ease;
}
.cart-slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
