<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="theme in themes"
      :key="theme"
      @click="setTheme(theme)"
      class="relative px-6 py-2 font-bold transition rounded-full"
      :class="
        theme === currentTheme
          ? theme === 'Creatures'
            ? 'theme__creatures--active'
            : 'bg-primary-800/90 text-primary-50 dark:bg-primary-500 dark:text-gray-900'
          : theme === 'Creatures'
          ? 'theme__creatures'
          : 'bg-primary-800/10 hover:bg-primary-600/10 text-primary-800 dark:bg-gray-700 dark:bg-opacity-30 dark:hover:bg-opacity-50 dark:text-primary-500'
      "
    >
      <span>{{ theme }}</span>
      <transition
        enter-active-class="transition ease-out transform"
        enter-class="rotate-0 opacity-0"
        enter-to-class="rotate-180 opacity-100"
        leave-active-class="transition ease-in transform"
        leave-class="rotate-0 opacity-100"
        leave-to-class="-rotate-180 opacity-0"
      >
        <svg
          v-if="theme === currentTheme"
          class="absolute w-3 h-3 transform -translate-y-1/2 right-2 top-1/2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </transition>
    </button>
    <div class="relative w-48 overflow-hidden rounded-full dark:bg-gray-800">
      <input
        type="text"
        aria-label="Search"
        placeholder="Search"
        v-model="updateModuleSearch"
        class="w-full py-2 pl-4 pr-12 transition placeholder-gray-800/40 dark:placeholder-gray-400 bg-primary-800/20 focus:bg-primary-800/10 text-primary-800/80 dark:text-gray-200 dark:bg-gray-200/20 dark:focus:bg-gray-200/30"
      />
      <transition
        mode="out-in"
        enter-active-class="transition ease-out transform"
        enter-class="translate-x-4 opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transition ease-in transform"
        leave-class="translate-x-0 opacity-100"
        leave-to-class="translate-x-4 opacity-0"
      >
        <svg
          v-if="moduleSearch.length === 0"
          class="absolute w-5 h-5 transform -translate-y-1/2 opacity-25 right-4 top-1/2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <button
          @click="setModuleSearch('')"
          class="absolute right-0 flex items-center justify-center w-12 py-2 transition transform -translate-y-1/2 opacity-25 hover:opacity-50 top-1/2"
          style="-webkit-tap-highlight-color: transparent;"
          v-else
        >
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 2.414a1 1 0 00-1.414 1.414L10.586 10l-1.293 1.293a1 1 0 101.414 1.414L12 11.414l1.293 1.293a1 1 0 001.414-1.414L13.414 10l1.293-1.293a1 1 0 00-1.414-1.414L12 8.586l-1.293-1.293z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: {
    themes: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState(["currentTheme", "moduleSearch"]),
    updateModuleSearch: {
      get() {
        return this.moduleSearch;
      },
      set(value) {
        this.setModuleSearch(value);
      }
    }
  },
  methods: {
    ...mapActions(["setTheme", "setModuleSearch"])
  }
};
</script>
