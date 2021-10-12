<template>
  <DungeonListView :dungeons="filteredItems(dungeons)" :themes="themes" />
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
        theme: wall.slug.split("_", 3)[0],
        element: wall.slug.split("_", 3)[1].replace(/-/g, " "),
        number: wall.slug.split("_", 3)[2],
        imagePath: wall.slug + ".png",
        parts: wall.body.splice(0, wall.body.length - 3)
      };
    });

    items = items.map(item => {
      return {
        id: item.slug,
        type: "item",
        theme: item.slug.split("_", 3)[0],
        element: item.slug.split("_", 3)[1].replace(/-/g, " "),
        number: item.slug.split("_", 3)[2],
        imagePath: item.slug + ".png",
        parts: item.body.splice(0, item.body.length - 3)
      };
    });

    monsters = monsters.map(monster => {
      return {
        id: monster.slug,
        type: "monster",
        theme: monster.slug.split("_", 3)[0],
        element: monster.slug.split("_", 3)[1].replace(/-/g, " "),
        number: monster.slug.split("_", 3)[2],
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
        theme: dungeon.slug.split("_", 3)[0],
        element: dungeon.slug.split("_", 3)[1].replace(/-/g, " "),
        number: dungeon.slug.split("_", 3)[2],
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
      "currentTheme",
      "wantedList",
      "userWantedList",
      "moduleSearch"
    ])
  },
  methods: {
    ...mapActions(["setTheme", "setModuleSearch"]),
    filteredItems(items) {
      return items.filter(item => {
        if (this.moduleSearch.length > 0 && this.currentTheme) {
          return (
            item.theme === this.currentTheme &&
            item.element.toLowerCase().includes(this.moduleSearch.toLowerCase())
          );
        } else if (this.moduleSearch.length > 0) {
          return item.element
            .toLowerCase()
            .includes(this.moduleSearch.toLowerCase());
        } else if (this.currentTheme) {
          return item.theme === this.currentTheme;
        } else {
          return item;
        }
      });
    }
  },
  mounted() {
    this.setTheme(null);
    this.setModuleSearch("");
  }
};
</script>
