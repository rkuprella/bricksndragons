<template>
  <div class="relative flex flex-wrap items-start gap-8 py-8">
    <main class="flex-1 py-12">
      <article class="container mx-auto prose max-w-prose">
        <h1>News &amp; updates</h1>
        <p>No content yet.</p>
      </article>
    </main>
  </div>
</template>

<script>
export default {
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
