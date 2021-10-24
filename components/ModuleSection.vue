<template>
  <section class="w-full py-4" v-if="items.length > 0">
    <div class="flex items-center justify-between w-full">
      <nuxt-link :to="`/${type}/${to}`" class="px-1 py-3 group" v-if="to">
        <h2 class="text-sm text-gray-600 dark:text-gray-400">
          <span class="group-hover:underline">{{ title }}</span>
          (<span class="font-bold text-gray-600 dark:text-gray-200">{{
            items.length
          }}</span
          >)
        </h2>
      </nuxt-link>
      <h2 v-else class="text-sm text-gray-600 dark:text-gray-400">
        <span class="group-hover:underline">{{ title }}</span>
        (<span class="font-bold text-gray-600 dark:text-gray-200">{{
          items.length
        }}</span
        >)
      </h2>
      <button
        type="button"
        role="button"
        :title="`Hide/Show ${title}`"
        :aria-label="`Hide/Show ${title}`"
        @click="toggleModuleSection(title)"
        class="p-3 text-gray-700 transition duration-150 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
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
      class="grid grid-cols-2 gap-3 mt-8 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
      v-if="isVisible"
    >
      <li v-for="item in items" :key="item.id" class="flex flex-col">
        <nuxt-link
          :title="item.name"
          :to="`/${type}/${item.type}s/${item.id}`"
          class="transition hover:opacity-80"
          :class="
            $nuxt.$route.path === `/${type}/${item.type}s/${item.id}` &&
              'disabled'
          "
        >
          <nuxt-picture
            loading="lazy"
            fit="cover"
            width="800"
            height="600"
            quality="70"
            :src="`/images/modules/${item.imagePath}`"
            :alt="`${item.theme} ${item.element} ${item.name}`"
            sizes="xs:300px sm:200px md:170px xl:160px 2xl:175px"
            class="w-full"
          />
        </nuxt-link>
        <div class="relative flex items-center gap-2 py-1 pl-3">
          <button
            @click="addModule(item)"
            :title="
              isPremium(item.theme)
                ? 'Requires pro membership'
                : `Add ${item.name} to your wanted list`
            "
            class="p-3 text-gray-900 transition transform rounded bg-primary-500 lg:p-1 hover:bg-primary-400 hover:scale-105 active:scale-95"
          >
            <svg
              v-if="isPremium(item.theme)"
              class="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              v-else
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
          </button>
          <transition
            enter-active-class="transition transform duration-300 ease-[cubic-bezier(0.2,0.5,0.1,1)]"
            enter-class="scale-50 -translate-y-8 opacity-0"
            enter-to-class="scale-100 translate-y-0"
            leave-active-class="transition transform ease-[cubic-bezier(0.5,0,0.7,0.4)]"
            leave-class="translate-y-0"
            leave-to-class="translate-y-16 opacity-0"
          >
            <PremiumPopup v-if="showPremiumPopup === item.id" />
          </transition>
          <div class="flex flex-col flex-1 overflow-hidden">
            <span class="text-xs italic text-gray-600/90 dark:text-gray-400">{{
              item.element
            }}</span>
            <span class="truncate">{{ item.name }}</span>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: false
    },
    items: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState([
      "showWalls",
      "showSets",
      "showMicrofigs",
      "showMonsters",
      "showPremiumPopup"
    ]),
    ...mapGetters(["isPremium"]),
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
