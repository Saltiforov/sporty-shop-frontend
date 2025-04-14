<template>
  <ul :class="parentClasses" class="links">
    <li
        v-for="item in links"
        :key="item.label"
        :class="linkClass"
        class="link"
    >
      <NuxtLink :to="item.page">{{ item.label }}</NuxtLink>
    </li>
  </ul>
</template>

<script setup>

const props = defineProps({
  links: {
    type: Array,
    required: true,
    default: () => []
  },
  parentClasses: {
    type: [Array, String],
    required: false
  },
  linkClass: {
    type: [Array, String],
    required: false
  }
})

const parentClasses = computed(() => {
  return Array.isArray(props.parentClasses) ? props.parentClasses.join(' ') : props.parentClasses
})

const linkClass = computed(() => {
  return Array.isArray(props.linkClass) ? props.linkClass.join(' ') : props.linkClass
})

</script>


<style scoped>
.router-link-active {
  color: orange;
}
</style>