<template>
  <div v-if="isOpen" class="overlay">
    <div class="shopping-cart pt-[36px] pb-[28px] pl-[46px] pr-[30px] rounded-tl-[32px] rounded-bl-[32px]">
      <div class="header flex justify-between pb-[49px] items-center">
        <div class="flex">
          <h1 class="large-title mr-[25px]">Кошик</h1>
          <p class="large-title" style="color: #999999">({{ totalCount }})</p>
        </div>
        <div class="pr-[8px]">
          <Button :pt="{
            root: {
              class: 'close-cart'
            }
          }" @click="$emit('close')">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M1.63597 1.63649L7.51465 7.51517M7.51465 7.51517L13.3933 13.3938M7.51465 7.51517L1.63597 13.3938M7.51465 7.51517L13.3933 1.63649"
                  stroke="#9E2B24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </Button>
        </div>
      </div>
      <ProductsOverview :products-overview="cartItems"/>
      <div class="make-order-block flex flex-col items-center ">
        <div class="mb-[10px] w-full max-w-[423px]">
          <Button :pt="{
            root: {
              class: 'make-order-button',
            }
          }"><p class="fw-400 murecho-font text-[#FFFFFF] text-[14px] leading-[22px]">
          Оформити замовлення</p></Button>
        </div>
        <div>
          <NuxtLink to="/product">
            <p class="text-[#A3A3A7] murecho-font">Продовжити покупки</p>
          </NuxtLink>
        </div>
      </div>
      <div class="recommended-products mt-[50px]">
        <div class="flex items-center gap-4">
          <div class="w-[152px] h-px bg-white"></div>
          <h2 class="h2-title text-center whitespace-nowrap">Рекомендовані товари</h2>
          <div class="w-[152px] h-px bg-white"></div>
        </div>
        <div class="recommended-products-cards mt-[22px] grid grid-cols-2 gap-[30px]">
          <ProductCard v-for="product in products" variant="small" :key="product.id" :product="product">
            <template #buy-button>
              <Button :pt="{
                root: {
                  class: 'card-buy__small__btn',
                }
              }" class="flex justify-center items-center w-[29px] h-[29px]">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 7.5H7.5M7.5 7.5H13.5M7.5 7.5V13.5M7.5 7.5V1.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: true,
  },
  cartItems: {
    type: Array,
    required: false,
    default: () => [],
  }
})

const products = ref([
  {
    id: 1,
    title: "Nutrex Research Anabol Hardcore - 60 капс",
    grade: '4.6',
    countOfReviews: 10,
    price: 1116,
    discountPrice: 768,
    isFavorite: false,
  },
  {
    id: 2,
    title: "Nutrex Research Anabol Hardcore - 60 капс",
    grade: '4.1',
    countOfReviews: 5,
    price: 3241,
    isFavorite: true,
  },
])

const totalCount = computed(() => {
  return props.cartItems.reduce((acc, item) => {
    return acc + item.quantity
  }, 0)
})
</script>

<style scoped>
.make-order-button {
  width: 100%;
  border-radius: var(--default-rounded);
  background: var(--color-primary-dark);
}
.make-order-button:hover {
  width: 100%;
  background: var(--color-primary-dark);
}

.card-buy__small__btn {
  background: var(--color-primary-green);
  color: var(--color-primary-white);
  border-radius: 100%;
  border: none;
  padding: 0;
}
.card-buy__small__btn:hover {
  background: var(--color-primary-green);
  border: none;
  padding: 0;
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

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.shopping-cart {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 620px;
  background-color: #E6E7F8;
  z-index: 1000;
  box-shadow: -4px 0px 8px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
}
</style>
