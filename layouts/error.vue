<template>
  <main class="flex-1">
    <ContentProse>
      <h1 v-if="error.statusCode === 404">Page not found</h1>
      <h1 v-else>An error occurred</h1>

      <nuxt-picture
        width="800"
        height="600"
        quality="90"
        src="/images/spider.png"
        alt="LEGO spider"
        sizes="xs:700px"
      />
    </ContentProse>
  </main>
</template>

<script>
export default {
  props: ["error"],
  layout: "error"
};
</script>
