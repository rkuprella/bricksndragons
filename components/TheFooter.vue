<template>
  <footer class="pb-12 text-gray-300 lg:pt-12 bg-gray-500/10">
    <div class="container px-4 py-8 mx-auto md:px-8">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <div class="prose dark:prose-dark">
            <h3>
              About
            </h3>
            <p>
              This web app provides custom built brick modules for a modular
              micro-scale LEGO® dungeon system. Each module can be added to a
              wanted list in XML format. All LEGO® parts can then be ordered on
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.bricklink.com/v2/wanted/upload.page?utm_content=subnav"
                >bricklink</a
              >
              by pasting the XML data into the form field provided (requires a
              bricklink account).
            </p>
            <!-- <div class="flex items-center gap-2 mt-4">
              <nuxt-link
                v-for="link in bottomNav"
                :key="link.name"
                :to="link.to"
                >{{ link.name }}</nuxt-link
              >
            </div> -->
          </div>
        </div>
        <div>
          <div class="prose dark:prose-dark">
            <h3>
              Disclaimer
            </h3>
            <p>
              Bricks &amp; Dragons is not affiliated with The LEGO Group. LEGO®
              is a trademark of The LEGO Group of companies which does not in
              anyway sponsor, authorize, or endorse this content. All other
              original logos and/or brands used are property of their respective
              owners.
            </p>
          </div>
        </div>
      </div>
      <div
        class="flex items-center justify-between mt-8 text-xs text-gray-600 dark:text-gray-400"
      >
        <p class="flex-1">
          Bricks &amp; Dragons ©{{ new Date().getFullYear() }} by
          <span class="text-primary-800 dark:text-primary-400">Quabbe</span>
        </p>

        <SocialMedia />
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      bottomNav: [
        { to: "/about", name: "About" },
        { to: "/blog", name: "Blog" }
      ]
    };
  }
};
</script>
