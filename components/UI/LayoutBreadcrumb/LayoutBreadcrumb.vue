<template>
  <Breadcrumb :pt="{
    list: {
      style: {
        flexWrap: 'wrap'
      }
    }
  }" class="breadcrumb" :model="breadcrumbItems">
    <template #item="{ item }">
      <NuxtLink v-if="item.to" :to="item.to" class="cursor-pointer breadcrumb-text">
        {{ item.label }}
      </NuxtLink>
      <span class="breadcrumb-text" v-else>{{ item.label }}</span>
    </template>
    <template #separator> »</template>
  </Breadcrumb>
</template>

<script setup>
import {useRoute} from 'vue-router'

const props = defineProps({
  product: {
    type: Object,
    default: () => ({filters: [], productTitle: ''})
  }
})

const {t, locale} = useI18n()
const route = useRoute()

const breadcrumbItems = computed(() => {
  const mainPage = {
    label: t('navigation_home'),
    to: '/'
  }

  const hasProductData =
      props.product.productTitle?.trim()

  if (hasProductData) {
    const hasFilters = props.product.filters?.length > 0

    if (hasFilters) {
      const localizedFilters = props.product.filters.map(filter => ({
        label: filter.name?.[locale.value] || filter.name?.ru || '',
        to: `/catalog/${filter.code}`
      }))

      return [
        mainPage,
        ...localizedFilters,
        {label: props.product.productTitle, to: null}
      ]
    } else {
      return [
        mainPage,
        {label: props.product.productTitle, to: null}
      ]
    }
  }

  const routeCrumbs = route.matched
      .filter(r => r.meta?.breadcrumb !== false)
      .map(r => {
        let label = ''

        if (r.meta?.breadcrumb) {
          label = t(r.meta.breadcrumb)
        } else {
          const segments = r.path.split('/').filter(Boolean)
          label = segments[segments.length - 1]?.replace(/-/g, '_')
        }

        return {
          label: t(label),
          to: null
        }
      })

  return [mainPage, ...routeCrumbs]
})
</script>

<style scoped>
.breadcrumb {
  padding: 35px 10px;
}

.breadcrumb-text {
  font-weight: 200;
  font-size: 16px;
  line-height: 22px;
  color: var(--small-title-color);
}
</style>
