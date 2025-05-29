<template>
  <footer class="fixed bottom-0 left-0 w-full z-[1000] responsive-footer flex flex-col p-4 shadow">
    <div class="responsive-footer-container w-full flex justify-between">


      <div class="actions-wrapper w-full flex justify-between items-center">

        <ActionPanel
            :cartCount="useCartStore().cartCount"
            :responsive="true"
            :is-open-mobile-menu="isOpen"
            @showShoppingCart="showShoppingCart"
            @handle-mobile-sidebar="$emit('handle-mobile-sidebar')"
        />
      </div>
    </div>
  </footer>
</template>

<script setup>

import {useCartStore} from "~/stores/cart.js";

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
    default: false
  }
})

const emit = defineEmits(['handle-mobile-sidebar'])

const cartStore = useCartStore();

const token = useCookie('token')

const { t } = useI18n()

const showShoppingCart = () => {
  cartStore.open()
};



</script>


<style scoped>
.action-panel-icon {
  background: transparent;
  border: none;
  width: 36px;
  height: 36px;
}

button {
  padding: 0;
}

.action-panel-icon:last-child {
  margin: 0px;
}

.action-panel-icon:hover {
  background: transparent;
  border: none;
}

@media (min-width: 670px) {
  .responsive-footer {
    display: none !important;
  }
}

</style>