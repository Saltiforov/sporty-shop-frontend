<template>
  <div class="countdown-wrapper">
    <Countdown
        :time="deadline.getTime() - Date.now()"
        :auto-start="true"
        @end="handleEnd"
        v-slot="{ hours, minutes }"
    >
      <div class="timer-wrapper">
        <div class="timer-blocks">
          <div v-for="(digit, index) in splitDigits(hours)" :key="'h' + index" class="digit-box">
            {{ digit }}
          </div>

          <div class="separator">
            <span class="dot"></span>
            <span class="dot"></span>
          </div>

          <div v-for="(digit, index) in splitDigits(minutes)" :key="'m' + index" class="digit-box">
            {{ digit }}
          </div>
        </div>

        <div class="label-blocks flex justify-around w-full mt-2">
          <div class="label">{{ t('timer_hours') }}</div>
          <div class="label">{{ t('timer_minutes') }}</div>
        </div>
      </div>
    </Countdown>
  </div>
</template>

<script setup>
import Countdown from '@chenfengyuan/vue-countdown'
import { ref, computed } from 'vue'

const emit = defineEmits(['expired'])

const { t } = useI18n()

const props = defineProps({
  orderCreatedAt: {
    type: Date,
    required: true,
    default: () => new Date('2025-05-24T11:00:00')
  },
})

const TOTAL_DURATION_MS = 12 * 60 * 60 * 1000

const deadline = computed(() => new Date(props.orderCreatedAt.getTime() + TOTAL_DURATION_MS))

const isExpired = ref(false)

function handleEnd() {
  isExpired.value = true
}

function splitDigits(value) {
  return value.toString().padStart(2, '0').split('')
}

watch(() => isExpired.value, (newValue) => {
  if (newValue) emit('expired')
})
</script>



<style scoped>
.countdown-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

.label {
  font-weight: 400;
  font-size: 15px;
  color: var(--small-title-color);
}

.title {
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
}

.timer-blocks {
  display: flex;
  gap: 0.5rem;
}

.digit-box {
  width: 41px;
  height: 49px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  background: linear-gradient(135deg, #212094, #817FDF);
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}

.time-pair {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.time-pair > .digits {
  display: flex;
  gap: 0.25rem;
}

.separator {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  padding: 0 8px;
}

.dot {
  width: 3px;
  height: 3px;
  background-color: #5856D6;
  border-radius: 50%;
}

@media (max-width: 675px) {
  .digit-box {
    width: 31px;
    height: 39px;
    font-size: 1.5rem;
  }
}

</style>
