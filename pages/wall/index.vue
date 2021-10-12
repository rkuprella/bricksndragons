<template>
  <ModuleListView :items="walls" />
</template>

<script>
export default {
  head() {
    return {
      title: "Wall elements - Bricks & Dragons",
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
  async asyncData({ $content }) {
    let walls = await $content("walls")
      .only(["slug", "body"])
      .sortBy("slug")
      .fetch();

    walls = walls.map(wall => {
      return {
        id: wall.slug,
        type: "wall",
        theme: wall.slug.split("_", 3)[0],
        element: wall.slug.split("_", 3)[1].replace("-", " "),
        number: wall.slug.split("_", 3)[2],
        imagePath: wall.slug + ".png",
        parts: wall.body.splice(0, wall.body.length - 3)
      };
    });

    return { walls };
  }
};
</script>
