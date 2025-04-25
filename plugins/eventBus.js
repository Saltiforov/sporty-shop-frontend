import mitt from "mitt";

export default defineNuxtPlugin(nuxtApp => {
    const eventBus = mitt();

    nuxtApp.provide('eventBus', eventBus);
});