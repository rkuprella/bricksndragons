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
      <h2 class="py-2 italic text-primary-500">
        {{
          `${items[0].type.slice(0, 1).toUpperCase()}${items[0].type.slice(
            1,
            items[0].type.length
          )}s`
        }}
      </h2>
    </div>
    <div class="py-8">
      <ul class="grid grid-cols-2 mt-8 md:grid-cols-4 2xl:grid-cols-6">
        <li v-for="item in items" :key="item.id" class="max-h-40">
          <nuxt-link
            title="Instructions"
            :to="`/${item.type}/${item.id}`"
            class="transition duration-100 ease-in-out bg-red-200 hover:opacity-80"
          >
            <nuxt-picture
              loading="lazy"
              width="640"
              height="480"
              quality="90"
              :src="`/images/modules/${item.imagePath}`"
              :alt="`${item.theme} ${item.element} ${item.number}`"
              sizes="xs:512px"
              class="w-full"
            />
          </nuxt-link>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    ...mapActions(["addModule"])
  }
};
</script>
