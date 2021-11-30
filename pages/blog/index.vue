<template>
  <main class="flex-1 py-12">
    <ContentProse>
      <h1>Blog</h1>
      <p>No content yet.</p>
    </ContentProse>
  </main>
</template>

<script>
export default {
  scrollToTop: true,
  head() {
    return {
      title: "News - Bricks & Dragons",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: "Blogging about Bricks & Dragons"
        }
      ]
    };
  }
};
</script>
