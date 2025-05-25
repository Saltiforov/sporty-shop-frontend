<template>
  <Accordion :value="['0']" multiple>
    <AccordionPanel :pt="{
        root: {
          class: 'border-0'
        }
      }" class="mb-5" v-for="(order, idx) in orderList" :value="idx" :key="order.id">
      <AccordionHeader :pt="{
          root: {
            class: 'pt-[14px] accordion-header-style pb-[14px]',
            style: {
              borderTopRightRadius: '12px',
              borderTopLeftRadius: '12px',
            }
          }
        }">
        <div class="flex w-full items-center justify-between">
          <p class="title-lg-20 order-number">{{ t('order_number', {number: order.orderNumber}) }}</p>
          <div
              class="order-status  text-white px-[12px] bg-[var(--color-primary-purple)] rounded-[var(--default-rounded)] py-[10px] mx-[20px]">
            {{ capitalizeFirstLetter(order?.status) }}
          </div>
        </div>
      </AccordionHeader>
      <AccordionContent>
        <div class="order-item-content-wrapper px-[48px] pb-[46px]">
          <div class="card-item grid gap-7 mb-[27px]">
            <div class="flex items-center justify-between">
              <div class="">
                <h2 class="timer-title text-[var(--color-primary-pink)] mb-2 title-lg-20 p-2">{{ t('payment_timer_warning') }}</h2>
                <div class="confirmation-hint text-[14px]">
                  <p class="text-[var(--color-muted-gray)] text-center">
                    {{ t('payment_instruction_text_part1') }}
                    <a
                        href="https://t.me/your_bot"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-[#007AFF] hover:underline"
                    >
                      @your_bot
                    </a>
                    {{ t('payment_instruction_text_part2') }}
                  </p>
                </div>
              </div>
              <CountdownTimer
                  :orderCreatedAt="new Date(order.createdAt)"
              />
            </div>

            <CartItem
                v-for="item in order?.products"
                :cart-product="item"
                :key="item.id"
                :is-history-view="true"
                :currency="order.currency"
            />
            <div class="history-view-price justify-end text-[var(--color-primary-red)] title-lg-20 flex">
              <p class="mr-5">{{ t('total') }}:</p>
              <p>{{ order.pricing?.totalOrderPrice }} {{
                  t(order.currency === 'uah' ? 'currency_uah' : 'currency_eur')
                }}</p>
            </div>
          </div>
          <div class="flex text-[var(--color-gray-dark-charcoal)] max-w-[890px] justify-between">
            <div class="flex delivery-info__item flex-col gap-6 w-full max-w-[427px]">
              <p v-for="(labelKey, index) in userInfoLabels" :key="index">{{ t(labelKey) }}</p>
            </div>

            <div class="flex delivery-info__item flex-col gap-6 w-full max-w-[427px]">
              <p v-for="(value, label) in order.userInfo" :key="label">{{ value }}</p>
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>

<script setup>
import CartItem from "~/components/Cards/CartItem/CartItem.vue";
import {calculateTotal, capitalizeFirstLetter} from "~/utils/index.js";
import CountdownTimer from "~/components/UI/CountdownTimer/CountdownTimer.vue";

const {t} = useI18n();

const currencyStore = useCurrencyStore()

defineProps({
  orderList: {
    type: Array,
    required: true,
    default: () => []
  }
})

const userInfoLabels = [
  'user_info_first_name',
  'user_info_last_name',
  'user_info_email',
  'user_info_phone',
  'user_info_address',
  'user_info_delivery_comment'
];

const statusLocalization = {
  'Відправлено': 'status_sent',
  'В обробці': 'status_processing',
  'Доставлено': 'status_delivered',
  'Скасовано': 'status_cancelled',
  'Очікує обробки': 'status_pending',
  'Відправлений': 'status_shipped',
  'Завершено': 'status_completed',
  'Повернуто': 'status_returned'
};

const localizeStatus = (status) => {
  return statusLocalization[status];
}

</script>

<style scoped>
.accordion-header-style {
  color: var(--color-primary-dark);
}

@media (max-width: 1000px) {
  .order-item-content-wrapper {
    padding: 0;
  }
}

@media (max-width: 500px) {
  .order-number {
    font-size: 14px;
  }

  .order-status {
    font-size: 12px;
    margin: 0 10px;
  }

  .history-view-price {
    font-size: 16px;
  }

  .delivery-info__item p {
    font-size: 14px;
  }

  .delivery-info__item {
    gap: 16px;
  }
}


</style>