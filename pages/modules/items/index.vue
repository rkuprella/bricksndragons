<template>
  <ModuleListView
    :items="filteredItems(items)"
    :themes="themes"
    :searchResults="getSearchResults"
    type="modules"
  />
</template>

<script>
import { mapState } from "vuex";

export default {
  head() {
    return {
      title: "Item sets - Bricks & Dragons",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content:
            "About Bricks & Dragons - A modular micro-scale LEGO® dungeon system"
        }
      ]
    };
  },
  async asyncData({ $content }) {
    let items = await $content("items")
      .only(["slug", "body"])
      .sortBy("slug")
      .fetch();

    items = items.map(item => {
      return {
        id: item.slug,
        type: "item",
        theme: item.slug.split("_", 3)[0].replace(/-/g, " "),
        element: item.slug.split("_", 3)[1].replace("-", " "),
        name: item.slug.split("_", 3)[2].replace(/-/g, " "),
        imagePath: item.slug + ".png",
        parts: item.body.splice(0, item.body.length - 3)
      };
    });

    const themes = [...new Set(items.map(item => item.theme))];

    return { items, themes };
  },
  computed: {
    ...mapState(["themeModules", "moduleSearch"]),
    getSearchResults() {
      return new Set(
        this.filteredItems(this.items)
          .filter(
            item =>
              item.name
                .toLowerCase()
                .includes(this.moduleSearch.toLowerCase()) ||
              item.element
                .toLowerCase()
                .includes(this.moduleSearch.toLowerCase())
          )
          .map(item =>
            item.name.toLowerCase().includes(this.moduleSearch.toLowerCase())
              ? item.name
              : item.element
          )
      );
    }
  },
  methods: {
    filteredItems(items) {
      return items.filter(item => {
        if (this.moduleSearch.length > 1 && this.themeModules) {
          return (
            item.theme === this.themeModules &&
            (item.element
              .toLowerCase()
              .includes(this.moduleSearch.toLowerCase()) ||
              item.name.toLowerCase().includes(this.moduleSearch.toLowerCase()))
          );
        } else if (this.moduleSearch.length > 1) {
          return (
            item.element
              .toLowerCase()
              .includes(this.moduleSearch.toLowerCase()) ||
            item.name.toLowerCase().includes(this.moduleSearch.toLowerCase())
          );
        } else if (this.themeModules) {
          return item.theme === this.themeModules;
        } else {
          return item;
        }
      });
    }
  }
};
</script>
