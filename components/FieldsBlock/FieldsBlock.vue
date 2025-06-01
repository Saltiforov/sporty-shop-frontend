<template>
  <form class="fields-block">
    <div class="container">
      <div
          :class="{
          'fields-block-content': true,
          'form-content': true,
          'grid-cols-1': !leftFullFields.length || !rightFullFields.length,
          'grid-cols-2': leftFullFields.length && rightFullFields.length
        }"
          class="grid gap-6"
      >
        <div class="block flex flex-col gap-6">
          <template v-for="field in leftFullFields" :key="field.name">
            <fieldset class="form-group">
              <legend class="form__title mb-[11px] flex items-center gap-2">
                <span class="whitespace-nowrap">{{ field.label }}:</span>
                <component
                    v-if="field.tooltipComponent"
                    :is="field.tooltipComponent"
                    v-bind="field.tooltipProps"
                    class="self-start"
                />
              </legend>
              <div>
                <DynamicRenderField
                    v-if="field.render"
                    :field="field"
                    v-model="formData[field.name]"
                />
                <component
                    v-else
                    class="w-full"
                    :is="field.type"
                    v-bind="field.props"
                    v-model="formData[field.name]"
                />
              </div>
              <Message
                  v-if="errors && errors[field.code]"
                  severity="error"
                  size="small"
                  variant="simple"
                  class="message-error"
              >
                {{ errors[field.code] }}
              </Message>
            </fieldset>
          </template>

          <template v-for="(pair, index) in leftHalfPairs" :key="'lh' + index">
            <div class="flex gap-6">
              <template v-for="field in pair" :key="field.name">
                <fieldset class="form-group w-1/2">
                  <legend class="form__title mb-[11px] flex items-center gap-2">
                    <span class="whitespace-nowrap">{{ field.label }}:</span>
                    <component
                        v-if="field.tooltipComponent"
                        :is="field.tooltipComponent"
                        v-bind="field.tooltipProps"
                        class="self-start"
                    />
                  </legend>
                  <div>
                    <DynamicRenderField
                        v-if="field.render"
                        :field="field"
                        v-model="formData[field.name]"
                    />
                    <component
                        v-else
                        class="w-full"
                        :is="field.type"
                        v-bind="field.props"
                        v-model="formData[field.name]"
                    />
                  </div>
                  <Message
                      v-if="errors && errors[field.code]"
                      severity="error"
                      size="small"
                      variant="simple"
                      class="message-error"
                  >
                    {{ errors[field.code] }}
                  </Message>
                </fieldset>
              </template>
            </div>
          </template>
        </div>

        <div class="block flex flex-col gap-6">
          <template v-for="(pair, index) in rightHalfPairs" :key="'rh' + index">
            <div class="flex gap-6 responsive-pair">
              <template v-for="field in pair" :key="field.name">
                <fieldset class="half-field form-group w-1/2">
                  <legend class="form__title mb-[11px] flex items-center gap-2">
                    <span class="whitespace-nowrap">{{ field.label }}:</span>
                    <component
                        v-if="field.tooltipComponent"
                        :is="field.tooltipComponent"
                        v-bind="field.tooltipProps"
                        class="self-start"
                    />
                  </legend>
                  <div>
                    <DynamicRenderField
                        v-if="field.render"
                        :field="field"
                        v-model="formData[field.name]"
                    />
                    <component
                        v-else
                        class="w-full"
                        :is="field.type"
                        v-bind="field.props"
                        v-model="formData[field.name]"
                    />
                  </div>
                  <Message
                      v-if="errors && errors[field.code]"
                      severity="error"
                      size="small"
                      variant="simple"
                      class="message-error"
                  >
                    {{ errors[field.code] }}
                  </Message>
                </fieldset>
              </template>
            </div>
          </template>

          <template v-for="field in rightFullFields" :key="field.name">
            <fieldset class="form-group">
              <legend class="form__title mb-[11px] flex items-center gap-2">
                <span class="whitespace-nowrap">{{ field.label }}:</span>
                <component
                    v-if="field.tooltipComponent"
                    :is="field.tooltipComponent"
                    v-bind="field.tooltipProps"
                    class="self-start"
                />
              </legend>
              <div>
                <DynamicRenderField
                    v-if="field.render"
                    :field="field"
                    v-model="formData[field.name]"
                />
                <component
                    v-else
                    class="w-full"
                    :is="field.type"
                    v-bind="field.props"
                    v-model="formData[field.name]"
                />
              </div>
              <Message
                  v-if="errors && errors[field.code]"
                  severity="error"
                  size="small"
                  variant="simple"
                  class="message-error"
              >
                {{ errors[field.code] }}
              </Message>
            </fieldset>
          </template>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import {ref, computed, onMounted} from "vue";

import DynamicRenderField from "~/components/UI/DynamicRenderField/DynamicRenderField.vue";
import {useFieldValidation} from '~/composables/useFieldValidation.js'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  config: {
    type: Object,
    required: true,
  },
  errors: {
    type: Object,
    required: true,
  },
  shouldResetOnConfigChange: {
    type: Boolean,
    required: true,
    default: true,
  }
});


const formData = ref({});

const configRef = toRef(props, 'config')

const shouldReset = toRef(props, 'shouldResetOnConfigChange')

const {errors, validateFields, resetErrors,} = useFieldValidation(formData, configRef)

const leftFullFields = computed(() =>
    props.config.items.filter(f => f.props?.side === 'left' && !f.props?.half)
)

const rightFullFields = computed(() =>
    props.config.items.filter(f => f.props?.side === 'right' && !f.props?.half)
)

const leftHalfPairs = computed(() => {
  const leftHalfs = props.config.items.filter(f => f.props?.side === 'left' && f.props?.half)
  return chunkArray(leftHalfs, 2)
})

const rightHalfPairs = computed(() => {
  const rightHalfs = props.config.items.filter(f => f.props?.side === 'right' && f.props?.half)
  return chunkArray(rightHalfs, 2)
})

function chunkArray(arr, size) {
  const chunks = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

onMounted(() => {
  props.config.items.forEach(field => {
    const code = field.code
    if (!code) return

    formData.value[code] = props.data?.[code] ?? null
  })
});

watch(
    () => props.config.items,
    (val) => {
      if (!shouldReset.value) return
      formData.value = {}
      val.forEach(field => {
        formData.value[field.code] = null
      })
    },
    {deep: true}
)

defineExpose({
  getData: () => formData.value,
  clearFormData: () => formData.value = {},
  validateFields,
})
</script>

<style scoped>
@media (max-width: 800px) {
  .fields-block-content {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 670px) {
  .fields-block-content {
    gap: 0;
    margin-bottom: 36px;
  }
}

@media (max-width: 600px) {
  .form__title {
    margin-bottom: 0;
  }

  .block {
    margin-bottom: 26px;
  }

  .block:last-child {
    margin-bottom: 0px;
  }

  .fields-block-content {
    gap: 0;
  }

  .responsive-pair {
    flex-direction: column !important;
  }
  .half-field {
    width: 100%;
  }
}

@media (max-width: 500px) {
  .block:first-child {
    margin-bottom: 0px;
  }

  .form-group {
    width: 269px;
    margin: 0 auto;
  }
}


</style>
