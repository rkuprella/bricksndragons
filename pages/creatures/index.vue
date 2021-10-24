<template>
  <main class="flex-1">
    <ThemeSwitcher
      :themes="themes"
      :searchResults="getSearchResults"
      type="creatures"
    />
    <div class="divide-y divide-gray-800/20 dark:divide-gray-800">
      <ModuleSection
        title="Microfigs"
        :items="filteredItems(microfigs)"
        to="microfigs"
        type="creatures"
      />
      <LazyModuleSection
        title="Monsters"
        to="monsters"
        :items="filteredItems(monsters)"
        type="creatures"
      />
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";

export default {
  async asyncData({ $content }) {
    let monsters = await $content("monsters")
      .sortBy("slug")
      .fetch();

    let microfigs = await $content("microfigs").fetch();

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
        theme: microfig.theme,
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

    const modules = [...monsters, ...microfigs];

    const themes = [...new Set(modules.map(item => item.theme))].sort();

    return {
      monsters,
      microfigs,
      themes
    };
  },
  computed: {
    ...mapState(["themeCreatures", "moduleSearch"]),
    getSearchResults() {
      return new Set(
        [...this.microfigs, ...this.monsters].filter(
          item =>
            item.name.toLowerCase().includes(this.moduleSearch.toLowerCase()) ||
            item.element.toLowerCase().includes(this.moduleSearch.toLowerCase())
        )
      );
    }
  },
  methods: {
    filteredItems(items) {
      return items.filter(item => {
        if (this.themeCreatures) {
          return item.theme === this.themeCreatures;
        } else {
          return item;
        }
      });
    }
  }
};
</script>
