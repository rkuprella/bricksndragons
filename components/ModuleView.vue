<template>
  <main class="flex-1">
    <div class="flex flex-wrap items-center justify-start gap-3">
      <nuxt-link
        to="/"
        class="flex items-center py-2 space-x-1 text-gray-400 transition rounded-full hover:text-gray-300"
      >
        <svg
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span>Modules</span>
      </nuxt-link>
      <nuxt-link
        :to="`/${item.type}`"
        class="flex items-center py-2 space-x-1 text-gray-400 transition rounded-full hover:text-gray-300"
      >
        <svg
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span>{{
          `${item.type.slice(0, 1).toUpperCase()}${item.type.slice(
            1,
            item.type.length
          )}s`
        }}</span>
      </nuxt-link>
      <h1 class="py-2 italic text-primary-500">
        {{ item.element }} {{ item.number }} ({{ item.theme }})
      </h1>
    </div>
    <div class="flex flex-col items-center py-8">
      <section class="flex flex-col items-center gap-4">
        <nuxt-picture
          loading="lazy"
          width="640"
          height="480"
          quality="90"
          :src="`/images/modules/${item.imagePath}`"
          :alt="`${item.theme} ${item.element} ${item.number}`"
          sizes="xs:640px"
        />

        <button
          @click="addModule(item)"
          class="flex items-center p-3 space-x-1 text-gray-900 transition rounded bg-primary-500 lg:py-1 lg:px-2 bg-opacity-90 hover:bg-opacity-100"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          <span>Add this module to wanted list</span>
        </button>
      </section>
    </div>
  </main>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions(["addModule"])
  }
};
</script>
