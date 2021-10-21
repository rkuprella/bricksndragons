<template>
  <div class="relative w-48 rounded-full dark:bg-gray-800 group">
    <input
      @focus="hasFocus = true"
      type="text"
      aria-label="Search"
      placeholder="Search"
      v-model="updateModuleSearch"
      class="w-full py-2 pl-4 pr-12 transition rounded-full placeholder-gray-800/40 dark:placeholder-gray-400 bg-primary-800/20 focus:bg-primary-800/10 text-primary-800/80 dark:text-gray-200 dark:bg-gray-200/20 dark:focus:bg-gray-200/30"
    />
    <ul
      v-if="hasFocus"
      class="absolute inset-x-0 z-20 flex flex-col mt-1 overflow-y-auto bg-gray-600 divide-y divide-gray-200 dark:divide-gray-600 top-full max-h-96"
    >
      <li
        v-for="result in showSearchResults"
        :key="result"
        v-click-outside="hide"
      >
        <nuxt-link
          :title="result.name"
          :to="`/${getType(result.type)}/${result.type}s/${result.id}`"
          @click.native="[(hasFocus = false), setModuleSearch('')]"
          class="flex items-center w-full gap-1 px-2 py-1 text-left bg-gray-100 border-0 focus:bg-opacity-70 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <nuxt-picture
            width="800"
            height="600"
            quality="90"
            :src="`/images/modules/${result.imagePath}`"
            :alt="`${result.theme} ${result.name}`"
            sizes="xs:64px"
            class="w-16"
          />
          <div class="flex flex-col flex-1 overflow-hidden">
            <span class="text-xs italic text-gray-600/90 dark:text-gray-400">{{
              result.element
            }}</span>
            <span class="truncate">{{ result.name }}</span>
          </div>
        </nuxt-link>
      </li>
    </ul>
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
</template>

<script>
import { mapState, mapActions } from "vuex";
import ClickOutside from "vue-click-outside";

export default {
  props: {
    searchResults: {
      type: Set,
      required: true
    }
  },
  data() {
    return {
      hasFocus: false
    };
  },
  directives: {
    ClickOutside
  },
  computed: {
    ...mapState(["moduleSearch"]),
    showSearchResults() {
      return (
        this.moduleSearch.length > 1 &&
        this.hasFocus &&
        Array.from(this.searchResults).sort()
      );
    },
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
    ...mapActions(["setModuleSearch"]),
    hide() {
      this.hasFocus = false;
    },
    getType(type) {
      if (type === "microfig" || type === "monster" || type === "minifig") {
        return "creatures";
      } else if (type === "wall" || type === "item") {
        return "modules";
      }
    }
  },

  mounted() {
    this.popupItem = this.$el;
  }
};
</script>
