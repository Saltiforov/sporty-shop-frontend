<template>
  <div class="flex locale-switch items-center">
    <Select
        :pt="{
        root: {
          style: 'background-color: transparent; border: none; w-auto'
        },
        label: {
          style: labelStyles
        },
        dropdown: {
          style: 'width: 1.25rem;'
        }
      }"
        class="w-full"
        v-model="selectedLanguage"
        optionLabel="name"
        :options="languages"
        @change="switchLocale"
    />
  </div>
</template>

<script setup>
import {ref, computed} from 'vue'
import Select from 'primevue/select'
import {useWindowWidthWatcher} from "~/composables/useWindowWidthWatcher.js";

const {locales, locale, setLocale, defaultLocale} = useI18n()

const getWidth = useWindowWidthWatcher()

const windowWidth = computed(() => getWidth())

const storedLocale = computed(() =>  locale.value || localStorage.getItem('locale'))

const languages = computed(() =>
    locales.value.map(lang => ({
      name: lang.name,
      code: lang.code,
    }))
)

const defaultLanguage = computed(() => languages.value.find(l => l.code === defaultLocale))

const labelStyles = computed(() => {
  return {
    color: 'var(--color-gray-pale-lavender)',
    textAlign: 'end',
    lineHeight: '22px',
    fontWeight: 600,
    fontSize: windowWidth.value < 500 ? '12px' : '20px',
  }
})

const selectedLanguage = ref(
    languages.value.find(l => l.code === storedLocale.value) || defaultLanguage.value
)

const switchLocale = () => {
  if (!selectedLanguage.value) return

  localStorage.setItem('locale', selectedLanguage.value.code)
  setLocale(selectedLanguage.value.code)
}
</script>
