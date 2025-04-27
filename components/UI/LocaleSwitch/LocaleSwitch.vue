<template>
  <div class="flex locale-switch items-center">
    <Select
        :pt="{
        root: { class: 'bg-transparent border-0' },
        label: { class: 'text-[var(--color-gray-pale-lavender)] leading-[22px] fw-600 text-[20px]' },
        dropdown: { class: 'w-5' }
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

const {locales, locale, setLocale, defaultLocale} = useI18n()

const storedLocale = computed(() =>  locale.value || localStorage.getItem('locale'))

const languages = computed(() =>
    locales.value.map(lang => ({
      name: lang.name,
      code: lang.code,
    }))
)

const defaultLanguage = computed(() => languages.value.find(l => l.code === defaultLocale))

const selectedLanguage = ref(
    languages.value.find(l => l.code === storedLocale.value) || defaultLanguage.value
)

const switchLocale = () => {
  if (!selectedLanguage.value) return

  localStorage.setItem('locale', selectedLanguage.value.code)
  setLocale(selectedLanguage.value.code)
}
</script>
