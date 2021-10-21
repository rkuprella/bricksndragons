<template>
  <ModuleView :item="wall" :relatedItems="getRelatedItems" type="modules" />
</template>

<script>
export default {
  head() {
    return {
      title: `${this.wall.theme} ${this.wall.element} ${this.wall.name} - Bricks & Dragons`,
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

    let walls = await $content("walls")
      .only(["slug", "body"])
      .sortBy("slug")
      .fetch();

    walls = walls.map(wall => {
      return {
        id: wall.slug,
        type: "wall",
        theme: wall.slug.split("_", 3)[0].replace(/-/g, " "),
        element: wall.slug.split("_", 3)[1].replace("-", " "),
        name: wall.slug.split("_", 3)[2].replace(/-/g, " "),
        imagePath: wall.slug + ".png",
        parts: wall.body.splice(0, wall.body.length - 3)
      };
    });

    return { wall, walls };
  },
  computed: {
    getRelatedItems() {
      return this.walls.filter(
        item =>
          item.element === this.wall.element && item.theme === this.wall.theme
      );
    }
  }
};
</script>
