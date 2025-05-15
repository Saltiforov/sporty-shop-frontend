<template>
  <footer class="pt-[21px] pr-3 pl-3">
    <div class="footer-container flex justify-between flex-wrap items-center max-w-[1190px] px-[15px] mx-auto">
      <div class="left-side flex w-full max-w-[661px] justify-between flex-wrap sm:flex-nowrap gap-2">
        <img src="@/assets/images/footer-logo.svg" alt="footer-logo.svg">
        <div class="links-list flex w-full max-w-[411px] justify-between flex-wrap sm:flex-nowrap gap-2">
          <div v-for="(list, index) in links" :key="index">
            <h2 class="mb-2 small-title">{{ list.title }}</h2>
            <LinksList :links="list.links" :parentClasses="['']"
                       :linkClass="['text-[var(--color-primary-pure-white)]', 'last:mr-0', 'mb-[6px]', 'link-text']"/>
          </div>
        </div>
      </div>
      <div class="right-side w-full max-w-[393px] justify-between flex-wrap sm:flex-nowrap gap-2  flex">
        <div class="contacts-wrapper">
          <div class="contacts ml-4 mb-3">
            <p class="small-title">{{ t('footer_contacts_title') }}</p>
            <NuxtLink class="text-[var(--color-primary-pure-white)] link-text" to="/news">qwerty@gmail.com</NuxtLink>
          </div>
          <div class="contacts-links w-[182px] flex justify-between items-center">
            <NuxtLink to="https://www.instagram.com/" class="flex flex-col items-center text-center gap-1">
              <img src="@/assets/images/social-instagram.svg" alt="social-instagram.svg">
              <p class="link-text">Instagram</p>
            </NuxtLink>
            <NuxtLink to="https://web.telegram.org/a/" class="flex flex-col items-center text-center gap-1">
              <img src="@/assets/images/social-telegram.svg" alt="social-telegram.svg">
              <p class="link-text">Telegram</p>
            </NuxtLink>
          </div>
        </div>
        <div class="our-social max-w-[102px] w-full">
          <div><p class="small-title mb-5">{{ t('footer_social_networks') }}</p></div>
          <div class="flex justify-between">
            <NuxtLink to="https://www.instagram.com/" class="flex flex-col items-center text-center gap-1">
              <img src="@/assets/images/social-instagram.svg" alt="social-instagram.svg">
            </NuxtLink>
            <NuxtLink to="https://web.telegram.org/a/" class="flex flex-col items-center text-center gap-1">
              <img src="@/assets/images/social-telegram.svg" alt="social-telegram.svg">
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

  </footer>
</template>

<script setup lang="ts">

const { t } = useI18n()

const links = ref([
  {
    title: computed(() => t('footer_about_us')),
    links: [
      { label: computed(() => t('footer_about_us')), page: '/page1' },
      { label: computed(() => t('footer_warranties')), page: '/page1' },
      { label: computed(() => t('footer_terms_of_use')), page: '/page1' },
    ]
  },
  {
    title: computed(() => t('footer_payment_methods')),
    links: [
      { label: computed(() => t('footer_payment_methods')), page: '/page3' },
      { label: computed(() => t('footer_delivery')), page: '/page3' },
      { label: computed(() => t('footer_faq')), page: '/page3' },
    ]
  },
]);

</script>

<style scoped>
@media (max-width: 1300px) {
  .links-list {
    justify-content: space-around;
  }
}

@media (max-width: 1130px) {
  .footer-container {
    flex-direction: column;
  }
  .left-side {
    margin-bottom: 10px;
  }

  footer {
    padding-top: 12px;
    padding-right: 8px;
    padding-left: 8px;
  }
}

@media (max-width: 671px) {
  footer {
    display: none;
  }
}

@media (max-width: 650px) {
  .footer-container {
    flex-direction: column-reverse;
  }
  .left-side {
    flex-direction: column-reverse;
  }
  .right-side {
    max-width: 100%;
    justify-content: space-evenly;
    margin-bottom: 10px;
  }
  .contacts {
    margin-left: 0px;
  }
  .links-list {
    max-width: 100%;
    justify-content: space-around;
  }
}


</style>