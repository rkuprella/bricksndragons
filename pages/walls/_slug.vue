<template>
  <ModuleView :item="wall" />
</template>

<script>
export default {
  head() {
    return {
      title: `${this.wall.theme} ${this.wall.element} ${this.wall.number} - Bricks & Dragons`,
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
    let wall = await $content("walls", params.slug).fetch();

    wall = {
      id: wall.slug,
      type: "wall",
      theme: wall.slug.split("_", 3)[0].replace(/-/g, " "),
      element: wall.slug.split("_", 3)[1].replace("-", " "),
      name: wall.slug.split("_", 3)[2].replace(/-/g, " "),
      imagePath: wall.slug + ".png",
      parts: wall.body.splice(0, wall.body.length - 3)
    };

    return { wall };
  }
};
</script>
