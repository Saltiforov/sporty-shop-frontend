<template>
  <div class="cart-product flex">
    <div class="flex flex-1">
      <div
          :class="[
          'card-image shadow-xl rounded-[16px] shrink-0',
          isHistoryView ? 'max-w-[145px] mb-[22px] h-[210px] mr-[36px]' : 'h-[156px] max-w-[156px] mr-[22px]'
        ]"
      >
        <img
            :class="[
            'rounded-[16px]',
            isHistoryView ? 'h-[210px] object-cover' : ''
          ]"
            :src="imageSource"
            alt="product-image.png"
        />
      </div>

      <div
          :class="[
          isHistoryView ? 'items-start' : 'flex-col'
        ]"
          class="card-content flex flex-1 justify-between"
      >
        <p
            :class="[
            isHistoryView ? 'text-[20px]' : 'text-[16px]'
          ]"
            class="card-title max-w-[276px] w-full fw-500 leading-[var(--line-height-base)]"
        >
          {{ cartProduct.name }}
        </p>

        <div v-if="isHistoryView" class="card-quantity w-full flex justify-end">
          <p class="text-medium-20">{{ cartProduct.quantity }} {{ t('unit') }}.</p>
        </div>

        <div :class="[
            isHistoryView ? 'flex-col items-end h-full' : 'pb-4'
        ]" class="card-content__footer flex justify-between w-full">
          <div v-if="!isHistoryView" class="card-product-count">
            <AmountSelector v-model="cartProduct.quantity" min="1" max="100"/>
          </div>


          <div :class="[
              'card-product-price flex',
              isHistoryView ? 'items-start' : 'items-center'
          ]">
            <div
                :class="[
                isHistoryView ? 'discount-price__history-view' : 'fw-600 leading-[34px]',
                cartProduct?.discount
                  ? 'line-through text-[#8E8E93] text-[13px] mr-[14px]'
                  : 'text-[16px]'
              ]"
            >
              {{ cartProduct?.price || '1121' }} {{ t('currency') }}
            </div>

            <div
                v-if="cartProduct?.discount"
                :class="[
                    isHistoryView ? 'text-medium-20' : 'fw-600 text-[16px] leading-[34px]',
                ]"
                class="discount-price text-[var(--color-primary-pink)]"
            >
              {{ discountPrice || '600' }} <span class="text-[18px]">{{ t('currency') }}</span>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div v-if="!isHistoryView" class="pl-10 flex flex-col justify-center ml-auto">
      <Button
          :pt="{
          root: {
            class: 'cart-item__delete-btn'
          }
        }"
          @click="handleRemoveProduct(cartProduct._id)"
      >
        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
              fill="#ADADAD"
          />
        </svg>
      </Button>
    </div>
  </div>
</template>


<script setup>
import AmountSelector from "~/components/UI/AmountSelector/AmountSelector.vue";

const { t } = useI18n();

const emit = defineEmits(["remove-product"]);

const handleRemoveProduct = (id) => {
  emit('remove-product', id);
}

const {cartProduct} = defineProps({
  cartProduct: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  isHistoryView: {
    type: Boolean,
    required: false,
  }
})

const imageSource = computed(() => fullImageUrls(cartProduct.images || [])[0] || cartProduct.image)

const discountPrice = computed(() => cartProduct?.price - cartProduct?.discount)

</script>


<style scoped>
.discount-price__history-view {
  font-size: 17px;
  line-height: 22px;
}

.cart-item__delete-btn {
  background: transparent;
  border: none;
  padding: 0;
}

.cart-item__delete-btn:hover {
  background: transparent;
  border: none;
  padding: 0;
}

</style>