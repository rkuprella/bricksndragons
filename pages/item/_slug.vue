<template>
  <ModuleView :item="item" />
</template>

<script>
export default {
  head() {
    return {
      title: `${this.item.theme} ${this.item.element} ${this.item.number} - Bricks & Dragons`,
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
      theme: item.slug.split("_", 3)[0],
      element: item.slug.split("_", 3)[1].replace("-", " "),
      number: item.slug.split("_", 3)[2],
      imagePath: item.slug + ".png",
      parts: item.body.splice(0, item.body.length - 3)
    };

    return { item };
  }
};
</script>
