<template>
  <ModuleListView :items="items" />
</template>

<script>
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
            "Bricks & Dragons item sets - A modular micro-scale LEGO® dungeon system"
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

    return { items };
  }
};
</script>
