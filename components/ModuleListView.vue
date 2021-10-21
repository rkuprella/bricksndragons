<template>
  <main class="flex-1">
    <BreadCrumbs :type="type" :item="items[0]" />
    <ThemeSwitcher
      :themes="themes"
      :searchResults="searchResults"
      :type="type"
    />
    <ModuleSection
      :items="items"
      :title="
        `${items[0].type.slice(0, 1).toUpperCase()}${items[0].type.slice(
          1,
          items[0].type.length
        )}s`
      "
      :type="type"
    />
  </main>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    items: {
      type: Array,
      required: false
    },
    themes: {
      type: Array,
      required: true
    },
    searchResults: {
      type: Set,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions(["addModule"])
  }
};
</script>
