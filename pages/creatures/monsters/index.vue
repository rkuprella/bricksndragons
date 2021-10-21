<template>
  <ModuleListView
    :items="filteredItems(monsters)"
    :themes="themes"
    :searchResults="getSearchResults"
    type="creatures"
  />
</template>

<script>
import { mapState } from "vuex";

export default {
  head() {
    return {
      title: "Monsters - Bricks & Dragons",
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
    let monsters = await $content("monsters")
      .sortBy("slug")
      .fetch();

    monsters = monsters.map(monster => {
      return {
        id: monster.slug,
        type: "monster",
        theme: monster.slug.split("_", 3)[0].replace(/-/g, " "),
        element: monster.slug.split("_", 3)[1].replace("-", " "),
        name: monster.slug.split("_", 3)[2].replace(/-/g, " "),
        imagePath: monster.slug + ".png",
        parts: monster.body.splice(0, monster.body.length - 3)
      };
    });

    const themes = [...new Set(monsters.map(item => item.theme))];

    return { monsters, themes };
  },
  computed: {
    ...mapState(["themeCreatures", "moduleSearch"]),
    getSearchResults() {
      return new Set(
        this.filteredItems(this.monsters)
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
        if (this.moduleSearch.length > 1 && this.themeCreatures) {
          return (
            item.theme === this.themeCreatures &&
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
        } else if (this.themeCreatures) {
          return item.theme === this.themeCreatures;
        } else {
          return item;
        }
      });
    }
  }
};
</script>
