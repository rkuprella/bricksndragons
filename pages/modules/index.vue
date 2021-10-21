<template>
  <main class="flex-1">
    <ThemeSwitcher
      :themes="themes"
      :searchResults="getSearchResults"
      type="modules"
    />
    <div class="divide-y divide-gray-800/20 dark:divide-gray-800">
      <ModuleSection
        title="Walls and floor tiles"
        type="modules"
        to="walls"
        :items="filteredItems(walls)"
      />
      <LazyModuleSection
        title="Item sets"
        type="modules"
        to="items"
        :items="filteredItems(items)"
      />
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";

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

    const modules = [...walls, ...items];

    const themes = [...new Set(modules.map(item => item.theme))];

    return {
      walls,
      items,
      themes
    };
  },
  computed: {
    ...mapState(["themeModules", "moduleSearch"]),
    getSearchResults() {
      return new Set(
        [...this.walls, ...this.items].filter(
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
        if (this.themeModules) {
          return item.theme === this.themeModules;
        } else {
          return item;
        }
      });
    }
  }
};
</script>
