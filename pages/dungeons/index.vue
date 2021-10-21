<template>
  <DungeonListView
    :dungeons="filteredItems(dungeons)"
    :themes="themes"
    :searchResults="getSearchResults"
    type="dungeons"
  />
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  async asyncData({ $content }) {
    let walls = await $content("walls")
      .only(["slug", "body"])
      .sortBy("slug")
      .fetch();

    let items = await $content("items")
      .only(["slug", "body"])
      .sortBy("slug")
      .fetch();

    let dungeons = await $content("dungeons")
      .sortBy("slug")
      .fetch();

    let monsters = await $content("monsters")
      .sortBy("slug")
      .fetch();

    let microfigs = await $content("microfigs").fetch();

    walls = walls.map(wall => {
      return {
        id: wall.slug,
        type: "wall",
        theme: wall.slug.split("_", 3)[0].replace(/-/g, " "),
        element: wall.slug.split("_", 3)[1].replace(/-/g, " "),
        name: wall.slug.split("_", 3)[2].replace(/-/g, " "),
        imagePath: wall.slug + ".png",
        parts: wall.body.splice(0, wall.body.length - 3)
      };
    });

    items = items.map(item => {
      return {
        id: item.slug,
        type: "item",
        theme: item.slug.split("_", 3)[0].replace(/-/g, " "),
        element: item.slug.split("_", 3)[1].replace(/-/g, " "),
        name: item.slug.split("_", 3)[2].replace(/-/g, " "),
        imagePath: item.slug + ".png",
        parts: item.body.splice(0, item.body.length - 3)
      };
    });

    monsters = monsters.map(monster => {
      return {
        id: monster.slug,
        type: "monster",
        theme: monster.slug.split("_", 3)[0].replace(/-/g, " "),
        element: monster.slug.split("_", 3)[1].replace(/-/g, " "),
        name: monster.slug.split("_", 3)[2].replace(/-/g, " "),
        imagePath: monster.slug + ".png",
        parts: monster.body.splice(0, monster.body.length - 3)
      };
    });

    microfigs = microfigs.list.map(microfig => {
      return {
        id: microfig.BLItemNo,
        type: "microfig",
        element: microfig.element,
        imagePath: microfig.BLItemNo + ".png",
        parts: [
          {
            BLItemNo: microfig.BLItemNo,
            Qty: 1
          }
        ]
      };
    });

    const modules = [...walls, ...items, ...monsters, ...microfigs];

    dungeons = dungeons.map(dungeon => {
      return {
        id: dungeon.slug,
        type: "dungeon",
        theme: dungeon.slug.split("_", 3)[0].replace(/-/g, " "),
        element: dungeon.slug.split("_", 3)[1].replace(/-/g, " "),
        name: dungeon.slug.split("_", 3)[2].replace(/-/g, " "),
        imagePath: dungeon.slug + ".png",
        modules: dungeon.modules.map(itm => {
          return {
            ...modules.find(item => item.id === itm.id),
            total: itm.total
          };
        })
      };
    });

    const themes = [...new Set(dungeons.map(dungeon => dungeon.theme))];

    return {
      dungeons,
      themes
    };
  },
  head() {
    return {
      title: "Dungeons - Bricks & Dragons",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Explore all the dungeons for Bricks & Dragons - A modular micro-scale LEGO® dungeon system"
        }
      ]
    };
  },
  computed: {
    ...mapState([
      "themeDungeons",
      "wantedList",
      "userWantedList",
      "moduleSearch"
    ]),
    getSearchResults() {
      return new Set(
        this.filteredItems(this.dungeons)
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
    ...mapActions(["setTheme", "setModuleSearch"]),
    filteredItems(items) {
      return items.filter(item => {
        if (this.moduleSearch.length > 0 && this.themeDungeons) {
          return (
            item.theme === this.themeDungeons &&
            item.element.toLowerCase().includes(this.moduleSearch.toLowerCase())
          );
        } else if (this.moduleSearch.length > 0) {
          return item.element
            .toLowerCase()
            .includes(this.moduleSearch.toLowerCase());
        } else if (this.themeDungeons) {
          return item.theme === this.themeDungeons;
        } else {
          return item;
        }
      });
    }
  }
};
</script>
