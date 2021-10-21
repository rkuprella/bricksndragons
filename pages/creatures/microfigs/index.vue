<template>
  <ModuleListView
    :items="filteredItems(microfigs)"
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
      title: "microfigs - Bricks & Dragons",
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
    let microfigs = await $content("microfigs").fetch();

    microfigs = microfigs.list.map(microfig => {
      return {
        id: microfig.BLItemNo,
        type: "microfig",
        theme: "Microfigure",
        element: microfig.element,
        name: microfig.name,
        imagePath: microfig.BLItemNo + ".png",
        parts: [
          {
            BLItemNo: microfig.BLItemNo,
            Qty: 1
          }
        ]
      };
    });

    const themes = [...new Set(microfigs.map(item => item.theme))];

    return { microfigs, themes };
  },
  computed: {
    ...mapState(["themeCreatures", "moduleSearch"]),
    getSearchResults() {
      return new Set(
        this.filteredItems(this.microfigs)
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
