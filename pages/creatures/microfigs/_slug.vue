<template>
  <ModuleView
    :item="microfig"
    :relatedItems="getRelatedItems"
    type="creatures"
  />
</template>

<script>
export default {
  head() {
    return {
      title: `${this.microfig.theme} ${this.microfig.element} ${this.microfig.name} - Bricks & Dragons`,
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
    let microfigs = await $content("microfigs").fetch();

    microfigs = microfigs.list.map(microfig => {
      return {
        id: microfig.BLItemNo,
        type: "microfig",
        theme: "Microfigure",
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

    const microfig = microfigs.find(item => item.id === params.slug);

    return { microfig, microfigs };
  },
  computed: {
    getRelatedItems() {
      return this.microfigs.filter(
        item =>
          item.element === this.microfig.element &&
          item.theme === this.microfig.theme
      );
    }
  }
};
</script>
