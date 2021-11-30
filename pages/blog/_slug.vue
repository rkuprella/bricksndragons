<template>
  <main class="flex-1">
    <article class="p-8 bg-primary-100">
      <nuxt-content :document="article" class="prose" />
    </article>
  </main>
</template>

<script>
export default {
  head() {
    return {
      title: "Bricks & Dragons - News",
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
    const article = await $content("blog", params.slug).fetch();

    return { article };
  }
};
</script>
