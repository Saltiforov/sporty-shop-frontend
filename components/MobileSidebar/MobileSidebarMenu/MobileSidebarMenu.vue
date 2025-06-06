<template>
  <div class="m-0">
    <nav class="p-4 bg-[var(--color-primary-lavender)]">
      <LinksList
          :links="links"
          parent-classes="links-container"
          link-class="link-item text-[var(--color-gray-pale-lavender)]  mb-6 mr-[32px] text-[var(--color-primary-black)] sm:mr-[32px] md:mr-[53px] last:mr-0"
          :label-style="['font-weight: 700']"
      />
    </nav>
  </div>
</template>

<script setup>

const {t} = useI18n();

const links = ref([
  {
    label: computed(() => t('catalog')),
    icon: "pi pi-filter",
    page: "/content/catalog",
  },
  {
    label: computed(() => t('promotions')),
    icon: "pi pi-shopping-cart",
    page: "/content/promotions",
  },
  {
    label: computed(() => t('shipping_and_payment')),
    icon: "pi pi-user",
    page: "/content/shipping-and-payment",
  },
  {
    label: computed(() => t('about_us')),
    icon: "pi pi-user",
    page: "/content/about-us",
  },
  {
    label: computed(() => t('frequently_questions')),
    icon: "pi pi-user",
    page: "/content/frequently-questions",
  },
])
</script>


<style scoped>

</style>