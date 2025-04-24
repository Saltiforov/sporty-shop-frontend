<template>
  <div class="flex locale-switch items-center">
    <Select :pt="{
      root: {
        class: 'bg-transparent border-0 '
      },
      label: {
        class: 'text-[var(--color-gray-pale-lavender)] leading-[22px] fw-600 text-[20px]'
      },
      dropdown: {
        class: 'w-5'
      }
    }"
            class="w-full"
            v-model="selectedLanguage"
            optionLabel="name"
            :options="languages"
            @change="switchLocale"
    ></Select>
  </div>

</template>

<script setup>
import {ref} from "vue";
import Select from 'primevue/select';


const switchLocale = () => {
  localStorage.setItem('locale', selectedLanguage.value.code);
};

const selectedLanguage = ref({name: 'EN', code: 'en'});
const languages = ref([
  {name: 'UA', code: 'uk'},
  {name: 'RU', code: 'ru'},
  {name: 'EN', code: 'en'},
]);
</script>

<style scoped>

</style>