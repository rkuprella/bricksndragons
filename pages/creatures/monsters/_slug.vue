<template>
  <ModuleView
    :item="monster"
    :relatedItems="getRelatedItems"
    type="creatures"
  />
</template>

<script>
export default {
  head() {
    return {
      title: `${this.monster.theme} ${this.monster.element} ${this.monster.name} - Bricks & Dragons`,
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
      theme: monster.slug.split("_", 3)[0].replace(/-/g, " "),
      element: monster.slug.split("_", 3)[1].replace("-", " "),
      name: monster.slug.split("_", 3)[2].replace(/-/g, " "),
      imagePath: monster.slug + ".png",
      parts: monster.body.splice(0, monster.body.length - 3)
    };

    let monsters = await $content("monsters")
      .sortBy("slug")
      .fetch();

    monsters = monsters.map(monster => {
      return {
        id: monster.slug,
        type: "monster",
        theme: monster.slug.split("_", 3)[0].replace(/-/g, " "),
        element: monster.slug.split("_", 3)[1].replace("-", " "),
        name: monster.slug.split("_", 3)[2].replace(/-/g, " "),
        imagePath: monster.slug + ".png",
        parts: monster.body.splice(0, monster.body.length - 3)
      };
    });

    return { monster, monsters };
  },
  computed: {
    getRelatedItems() {
      return this.monsters.filter(
        item =>
          item.element === this.monster.element &&
          item.theme === this.monster.theme
      );
    }
  }
};
</script>
