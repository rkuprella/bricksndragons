<template>
  <section class="py-8" v-if="items.length > 0">
    <div class="flex items-center justify-between w-full">
      <h2 class="text-sm text-gray-400">
        {{ title }}
        (<span class="font-bold text-gray-200">{{ items.length }}</span
        >)
      </h2>
      <button
        type="button"
        role="button"
        :title="`Hide/Show ${title}`"
        :aria-label="`Hide/Show ${title}`"
        @click="toggleModuleSection(title)"
        class="p-3 text-gray-400 transition duration-150 hover:text-gray-300"
      >
        <svg
          class="w-5 h-5 transition-transform duration-100 transform"
          :class="isVisible ? '' : '-rotate-90'"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
    </div>
    <ul
      class="grid grid-cols-2 mt-8 md:grid-cols-4 2xl:grid-cols-6"
      v-if="isVisible"
    >
      <li v-for="item in items" :key="item.id" class="relative max-h-40'">
        <button
          @click="addModule(item)"
          class="transition-transform duration-100 ease-in-out transform scale-95 hover:scale-100 active:scale-110"
        >
          <nuxt-picture
            loading="lazy"
            fit="cover"
            width="640"
            height="480"
            quality="70"
            :src="`/images/modules/${item.imagePath}`"
            :alt="`${item.theme} ${item.element} ${item.number}`"
            sizes="xs:100vw sm:300px"
            class="w-full"
          />
        </button>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState(["showWalls", "showSets", "showMicrofigs", "showMonsters"]),
    isVisible() {
      if (this.title === "Walls and floor tiles") {
        return this.showWalls;
      } else if (this.title === "Item sets") {
        return this.showSets;
      } else if (this.title === "Microfigs") {
        return this.showMicrofigs;
      } else {
        return this.showMonsters;
      }
    }
  },
  methods: {
    ...mapActions(["addModule", "toggleModuleSection"])
  }
};
</script>
