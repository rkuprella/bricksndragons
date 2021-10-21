<template>
  <ModuleView :item="item" :relatedItems="getRelatedItems" type="modules" />
</template>

<script>
export default {
  head() {
    return {
      title: `${this.item.theme} ${this.item.element} ${this.item.name} - Bricks & Dragons`,
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
  async asyncData({ $content, params }) {
    let item = await $content("items", params.slug).fetch();

    item = {
      id: item.slug,
      type: "item",
      theme: item.slug.split("_", 3)[0].replace(/-/g, " "),
      element: item.slug.split("_", 3)[1].replace("-", " "),
      name: item.slug.split("_", 3)[2].replace(/-/g, " "),
      imagePath: item.slug + ".png",
      parts: item.body.splice(0, item.body.length - 3)
    };

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

    return { item, items };
  },
  computed: {
    getRelatedItems() {
      return this.items.filter(
        item =>
          item.element === this.item.element && item.theme === this.item.theme
      );
    }
  }
};
</script>
