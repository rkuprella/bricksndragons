<template>
  <ModuleListView :items="microfigs" type="creatures" />
</template>

<script>
export default {
  head() {
    return {
      title: "microfigs - Bricks & Dragons",
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
    let microfigs = await $content("microfigs").fetch();

    microfigs = microfigs.list.map(microfig => {
      return {
        id: microfig.BLItemNo,
        type: "microfig",
        theme: microfig.theme,
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

    return { microfigs };
  }
};
</script>
