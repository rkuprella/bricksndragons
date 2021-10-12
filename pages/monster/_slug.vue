<template>
  <ModuleView :item="monster" />
</template>

<script>
export default {
  head() {
    return {
      title: `${this.monster.theme} ${this.monster.element} ${this.monster.number} - Bricks & Dragons`,
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
    let monster = await $content("monsters", params.slug).fetch();

    monster = {
      id: monster.slug,
      type: "monster",
      theme: monster.slug.split("_", 3)[0],
      element: monster.slug.split("_", 3)[1].replace("-", " "),
      number: monster.slug.split("_", 3)[2],
      imagePath: monster.slug + ".png",
      parts: monster.body.splice(0, monster.body.length - 3)
    };

    return { monster };
  }
};
</script>
