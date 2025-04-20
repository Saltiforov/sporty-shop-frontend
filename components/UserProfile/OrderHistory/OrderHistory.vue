<template>
  <div class="order-history">
    <h1 class="title-lg-20 mb-[30px]">Контактна інформація</h1>
    <Accordion value="0">
      <AccordionPanel value="0">
        <AccordionHeader >
          <div class="flex w-full justify-between">
           <p>Замовлення №{{ orderList[0].orderNumber }}</p>
            <div class="order-status text-white px-[12px] bg-[var(--color-primary-purple)] rounded-[var(--default-rounded)] py-[10px]">
              Відправлено
            </div>
          </div>
        </AccordionHeader>
        <AccordionContent>
          fds
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>

<script setup lang="ts">

const orderList = [
  { orderNumber: 1111115,  },
]

</script>

<style scoped>

</style>