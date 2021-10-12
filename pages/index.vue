<template>
  <div class="relative flex flex-wrap items-start gap-8 py-8">
    <main class="flex-1">
      <ThemeSwitcher :themes="themes" />
      <div v-if="currentTheme === 'Creatures'" class="divide-y divide-gray-800">
        <ModuleSection title="Microfigs" :items="filteredItems(microfigs)" />
        <ModuleSection title="Monsters" :items="filteredItems(monsters)" />
      </div>
      <div class="divide-y divide-gray-800" v-else>
        <ModuleSection
          title="Walls and floor tiles"
          :items="filteredItems(walls)"
        />
        <ModuleSection title="Item sets" :items="filteredItems(items)" />
        <ModuleSection title="Microfigs" :items="filteredItems(microfigs)" />
        <ModuleSection title="Monsters" :items="filteredItems(monsters)" />
      </div>
    </main>
    <WantedList />
  </div>
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

    const modules = [...walls, ...items];

    const themes = [...new Set(modules.map(item => item.theme)), "Creatures"];

    return {
      walls,
      items,
      monsters,
      themes,
      modules,
      microfigs
    };
  },
  // head() {
  //   return {
  //     title: "Bricks & Dragons - A Modular LEGO® Dungeon System",
  //     meta: [
  //       {
  //         hid: "description",
  //         name: "description",
  //         content:
  //           "Explore modular micro-scale dungeons built with LEGO® bricks, fully customizable, compatible with LEGO® heroica and standard RPG miniatures"
  //       },
  //       {
  //         hid: "og:title",
  //         name: "og:title",
  //         content: "Bricks & Dragons - A Modular LEGO® Dungeon System"
  //       },
  //       {
  //         hid: "og:image",
  //         property: "og:image",
  //         content: "/images/header-microfigs.png"
  //       },
  //       {
  //         hid: "og:description",
  //         property: "og:description",
  //         content:
  //           "Explore modular micro-scale dungeons built with LEGO® bricks, fully customizable, compatible with LEGO® heroica and standard RPG miniatures"
  //       },
  //       {
  //         hid: "og:url",
  //         property: "og:url",
  //         content: "https://www.bricksanddragons.com"
  //       }
  //     ]
  //   };
  // },
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
        if (item.type != "monster" && item.type != "microfig") {
          if (this.moduleSearch.length > 0 && this.currentTheme) {
            return (
              item.theme === this.currentTheme &&
              item.element
                .toLowerCase()
                .includes(this.moduleSearch.toLowerCase())
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
        } else {
          if (!this.currentTheme || this.currentTheme === "Creatures") {
            if (this.moduleSearch.length > 0) {
              return item.element
                .toLowerCase()
                .includes(this.moduleSearch.toLowerCase());
            } else {
              return item;
            }
          }
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
