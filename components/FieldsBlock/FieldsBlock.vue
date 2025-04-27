<template>
  <div class="fields-block">
    <div class="container">
      <div
          :class="{
      'form-content': true,
      'grid-cols-1': !leftFullFields.length || !rightFullFields.length,
      'grid-cols-2': leftFullFields.length && rightFullFields.length
      }"
          class="grid gap-6">
        <div class="flex flex-col gap-6">
          <template v-for="field in leftFullFields" :key="field.name">
            <div class="form-group">
              <p class="form__title mb-[11px] flex items-center gap-2">
                {{ field.label }}:
                <component
                    v-if="field.tooltipComponent"
                    :is="field.tooltipComponent"
                    v-bind="field.tooltipProps"
                    class="self-start"
                />
              </p>
              <div>
                <component
                    class="w-full"
                    :is="field.render || field.type"
                    v-bind="field.props"
                    :config="field.props"
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
            </div>
          </template>

          <template v-for="(pair, index) in leftHalfPairs" :key="'lh' + index">
            <div class="flex gap-6">
              <template v-for="field in pair" :key="field.name">
                <div class="form-group w-1/2">
                  <p class="form__title mb-[11px] flex items-center gap-2">
                    {{ field.label }}:
                    <component
                        v-if="field.tooltipComponent"
                        :is="field.tooltipComponent"
                        v-bind="field.tooltipProps"
                        class="self-start"
                    />
                  </p>
                  <div>
                    <component
                        class="w-full"
                        :is="field.render || field.type"
                        v-bind="field.props"
                        :config="field.props"
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
                </div>
              </template>
            </div>
          </template>
        </div>

        <div class="flex flex-col gap-6">

          <template v-for="(pair, index) in rightHalfPairs" :key="'rh' + index">
            <div class="flex gap-6">
              <template v-for="field in pair" :key="field.name">
                <div class="form-group w-1/2">
                  <p class="form__title mb-[11px] flex items-center gap-2">
                    {{ field.label }}:
                    <component
                        v-if="field.tooltipComponent"
                        :is="field.tooltipComponent"
                        v-bind="field.tooltipProps"
                        class="self-start"
                    />
                  </p>
                  <div>
                    <component
                        class="w-full"
                        :is="field.render || field.type"
                        v-bind="field.props"
                        :config="field.props"
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
                </div>
              </template>
            </div>
          </template>

          <template v-for="field in rightFullFields" :key="field.name">
            <div class="form-group">
              <p class="form__title mb-[11px] flex items-center gap-2">
                {{ field.label }}:
                <component
                    v-if="field.tooltipComponent"
                    :is="field.tooltipComponent"
                    v-bind="field.tooltipProps"
                    class="self-start"
                />
              </p>
              <div>
                <component
                    class="w-full"
                    :is="field.render || field.type"
                    v-bind="field.props"
                    :config="field.props"
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
            </div>
          </template>

        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import {ref, computed, onMounted} from "vue";

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
  }
});

const formData = ref({});

onMounted(() => {
  props.config.items.forEach((field) => {
    if (field.code && props?.data?.[field?.code]) {
      formData.value[field.code] =
          props.data[field.code] !== undefined ? props.data[field.code] : "";
    }
  });
});

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

const getData = () => {
  return { ...formData.value };
};

defineExpose({
  getData
});
</script>
