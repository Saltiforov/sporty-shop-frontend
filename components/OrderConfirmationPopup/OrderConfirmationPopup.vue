<template>
  <div class="confirmation-popup murecho-font bg-[var(--color-gray-lavender)] rounded-[20px] p-20 flex justify-center max-w-[814px] w-full">
    <div class="confirmation-popup-container w-full">
      <div class="confirmation-popup-header">
        <h1 v-if="!isTimerExpired" class="confirmation-large-text mb-5 text-center">
          {{ t('confirmation_order_accepted') }}
        </h1>
        <p v-else class="text-red-500 confirmation-large-text font-bold text-center mt-4">
          {{ t('confirmation_time_expired') }}
        </p>
      </div>
      <div class="confirmation-popup-content">
        <div class="order-meta flex justify-between">
          <div class="order-number p-2 confirmation-large-text text-[var(--color-primary-green)]">
            {{ t('confirmation_order_number', { orderNumber }) }}
          </div>
          <div class="order-number">
            <CountdownTimer
                :orderCreatedAt="new Date(orderCreatedAt)"
                @expired="timerExpired"
            />
          </div>
        </div>
        <div class="payment-instruction max-w-[576px] mx-auto mb-10">
          <div class="flex flex-col">
            <div class="instruction-text">
              <div class="flex mb-3">
                <img src="/assets/icons/instruction-btn.svg" alt="instruction-btn">
                <p class="instruction-title ml-2">{{ t('confirmation_instruction_title') }}</p>
              </div>
              <ol class="list-decimal list-inside">
                <li>{{ t('confirmation_instruction_step_1') }}</li>
                <li>{{ t('confirmation_instruction_step_2') }}</li>
              </ol>
            </div>
          </div>

        </div>
        <div class="confirmation-button-wrapper max-w-[439px] w-full mb-3 mx-auto">
          <Button :pt="{
            root: {
              style: {
                padding: '3px',
                borderRadius: '8px',
                width: '100%',
              },
              class: 'confirmation__btn btn-hover-default'
            }
          }" >
            {{ t('confirmation_pay_button') }}
            <div class="icon">
              <img class="w-[36px] h-[36px]" src="/assets/icons/telegram-black-icon.png" alt="">
            </div>
          </Button>
        </div>
        <div class="confirmation-hint text-[14px]">
          <p class="text-[var(--color-muted-gray)] text-center">
            {{ t('confirmation_hint') }}
            <a
                :href="`https://t.me/${managerName}`"
                target="_blank"
                rel="noopener noreferrer"
                class="text-[#007AFF] hover:underline"
            >
              @{{ managerName }}
            </a>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  managerName: {
    type: String,
    required: true,
    default: 'Manager'
  },
  order: {
    type: Object,
    required: true,
    default: {}
  },

})

const { t } = useI18n()

const orderNumber = computed(() => props.order.orderNumber)

const orderCreatedAt = computed(() => props.order.createdAt)

const isTimerExpired = ref(false)

const timerExpired = () => {
  isTimerExpired.value = true
}

import CountdownTimer from "~/components/UI/CountdownTimer/CountdownTimer.vue";
</script>

<style scoped>
.confirmation__btn {
  background-color: var(--color-primary-dark);
}
.instruction-text {
  font-size: 24px;
}
ol li {
  margin-bottom: 8px;
}
.confirmation-large-text {
  font-weight: 500;
  font-size: 36px;
}

@media (max-width: 650px) {
  .order-meta {
    flex-direction: column;
  }
  .order-meta {
    align-items: center;
  }
  .confirmation-popup {
    padding: 20px;
  }
  .payment-instruction {
    margin-bottom: 12px;
  }
  .confirmation-large-text {
    font-size: 28px;
  }
  .instruction-text {
    font-size: 20px;
  }
}
</style>