<template>
  <div class="catalog">
    <StaticInformationBlock/>
  </div>
</template>

<script setup>
import StaticInformationBlock from "~/components/StaticInformation/StaticInformationBlock/StaticInformationBlock.vue";
definePageMeta({
  layout: 'static',
})
</script>