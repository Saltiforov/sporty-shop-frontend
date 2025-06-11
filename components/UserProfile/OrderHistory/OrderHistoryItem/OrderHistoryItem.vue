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
          <span
              class="order-status text-white px-[12px] bg-[var(--color-primary-purple)] rounded-[var(--default-rounded)] py-[10px] mx-[20px]">
            {{ t(localizeStatus(order?.status)) }}
          </span>
        </div>
      </AccordionHeader>
      <AccordionContent>
        <section class="order-item-content-wrapper px-[48px] pb-[46px]">
          <section class="card-item grid gap-7 mb-[27px]">
            <div class="order-countdown-timer flex items-center justify-between">
              <div>
                <h2 v-if="!isTimerExpired" class="timer-title text-[var(--color-primary-pink)] mb-2 title-lg-20 p-2">
                  {{ t('confirmation_order_accepted') }}
                </h2>
                <p v-else class="text-red-500 timer-title text-[var(--color-primary-pink)] mb-2 title-lg-20 p-2">
                  {{ t('confirmation_time_expired') }}
                </p>
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
              <CountdownTimer :orderCreatedAt="new Date(order.createdAt)" @expired="timerExpired"/>
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
          </section>

          <section
              class="flex md:flex-row text-[var(--color-gray-dark-charcoal)] max-w-[890px] justify-between gap-6"
          >
            <address class="flex delivery-info__item flex-col gap-5 w-full max-w-[427px] not-italic mr-0 md:mr-[36px]">
              <p
                  v-for="(item, index) in localizedUserInfo(order.userInfo)"
                  :key="index"
                  class="text-base font-semibold tracking-wide leading-6 text-[var(--color-gray-dark-charcoal)]"
              >
                {{ t(item.label) }}
              </p>
            </address>

            <address class="flex delivery-info__item flex-col gap-5 w-full max-w-[427px] not-italic">
              <p
                  v-for="(item, index) in localizedUserInfo(order.userInfo)"
                  :key="index"
                  class="text-base font-medium leading-6 text-[var(--color-primary-dark)] whitespace-nowrap"
              >
                {{ item.value || '-----' }}
              </p>
            </address>
          </section>


        </section>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>


<script setup>
import CartItem from "~/components/Cards/CartItem/CartItem.vue";
import {calculateTotal, capitalizeFirstLetter} from "~/utils/index.js";
import CountdownTimer from "~/components/UI/CountdownTimer/CountdownTimer.vue";
import {useCurrencyStore} from "~/stores/currency.js";

const {t} = useI18n();

const isTimerExpired = ref(false)

const timerExpired = () => {
  isTimerExpired.value = true
}

defineProps({
  orderList: {
    type: Array,
    required: true,
    default: () => []
  }
})

function localizedUserInfo(userInfo) {
  const userInfoMap = {
    user_info_first_name: 'firstName',
    user_info_last_name: 'lastName',
    user_info_phone: 'phone',
    user_info_email: 'email',
    user_info_address: 'address',
    user_info_delivery_comment: 'description'
  };

  return Object.entries(userInfoMap).reduce((acc, [labelKey, dataKey]) => {
    acc.push({
      label: labelKey,
      value: userInfo?.[dataKey] || '-----'
    });
    return acc;
  }, []);
}

const statusLocalization = {
  pending: 'status_pending',
  processing: 'status_processing',
  shipped: 'status_shipped',
  sent: 'status_sent',
  delivered: 'status_delivered',
  completed: 'status_completed',
  cancelled: 'status_cancelled',
  returned: 'status_returned'
};

const localizeStatus = (status) => {
  return statusLocalization[status];
}

</script>

<style scoped>
.accordion-header-style {
  color: var(--color-primary-dark);
}

.order-status {
  color: #fff;
  background-color: var(--color-primary-purple);
  padding: 10px 12px;
  margin: 0 20px;
  border-radius: var(--default-rounded);
  font-weight: 500;
  display: inline-block;
  line-height: 22px;
}

@media (max-width: 1000px) {
  .order-item-content-wrapper {
    padding: 0;
  }
}

@media (max-width: 800px) {
  .order-countdown-timer {
    flex-direction: column-reverse;
    margin-bottom: 12px;
  }
}

@media (max-width: 750px) {
  .timer-title {
    font-size: 14px;
    text-align: center;
  }
}

@media (max-width: 500px) {
  .order-number {
    font-size: 13px;
  }

  .order-status {
    font-size: 11px;
    margin: 0 10px;
    padding: 0px 14.5px;
  }

  .discount-price {
    font-size: 14px;
  }

  .history-view-price {
    font-size: 14px;
  }

  .delivery-info__item p {
    font-size: 14px;
  }

  .delivery-info__item {
    gap: 16px;
  }
}


</style>