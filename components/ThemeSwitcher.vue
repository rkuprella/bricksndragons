<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="theme in sortedThemes"
      :key="theme"
      @click="setTheme({ type: type, theme: theme })"
      class="flex items-center gap-1 px-4 py-2 font-bold transition rounded-full"
      :class="
        theme === getTheme
          ? isPremium(theme)
            ? 'bg-secondary-700 text-secondary-50 dark:bg-secondary-500 dark:text-gray-900'
            : 'bg-primary-800 text-gray-100 dark:bg-primary-500 dark:text-gray-900'
          : isPremium(theme)
          ? 'bg-secondary-500/20 text-secondary-700 dark:bg-gray-500/10 dark:text-secondary-500'
          : 'bg-primary-800/5 text-primary-800 dark:bg-gray-500/10 dark:text-primary-500'
      "
    >
      <svg
        v-if="isPremium(theme)"
        class="w-3 h-3 -ml-1"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        ></path>
      </svg>
      <span>{{ theme }}</span>
    </button>
    <ModuleSearch :searchResults="searchResults" v-if="searchResults" />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  props: {
    themes: {
      type: Array,
      required: true
    },
    searchResults: {
      type: Set,
      required: false
    },
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(["themeModules", "themeDungeons", "themeCreatures", "premium"]),
    getTheme() {
      if (this.type === "modules") {
        return this.themeModules;
      } else if (this.type === "dungeons") {
        return this.themeDungeons;
      } else if (this.type === "creatures") {
        return this.themeCreatures;
      }
    },
    ...mapGetters(["isPremium"]),
    sortedThemes() {
      return this.themes.sort((a, b) =>
        this.isPremium(a) && !this.isPremium(b)
          ? 1
          : !this.isPremium(a) && this.isPremium(b)
          ? -1
          : 0
      );
    }
  },
  methods: {
    ...mapActions(["setTheme"])
  }
};
</script>
