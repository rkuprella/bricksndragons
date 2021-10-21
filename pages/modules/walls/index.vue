<template>
  <ModuleListView
    :items="filteredItems(walls)"
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
      title: "Wall elements - Bricks & Dragons",
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
    let walls = await $content("walls")
      .only(["slug", "body"])
      .sortBy("slug")
      .fetch();

    walls = walls.map(wall => {
      return {
        id: wall.slug,
        type: "wall",
        theme: wall.slug.split("_", 3)[0].replace(/-/g, " "),
        element: wall.slug.split("_", 3)[1].replace("-", " "),
        name: wall.slug.split("_", 3)[2].replace(/-/g, " "),
        imagePath: wall.slug + ".png",
        parts: wall.body.splice(0, wall.body.length - 3)
      };
    });

    const themes = [...new Set(walls.map(item => item.theme))];

    return { walls, themes };
  },
  computed: {
    ...mapState(["themeModules", "moduleSearch"]),
    getSearchResults() {
      return new Set(
        this.filteredItems(this.walls)
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
