<template>
  <div class="flex flex-col min-h-screen text-gray-200 bg-gray-900">
    <header class="relative text-primary-50 bg-primary-600">
      <div class="absolute inset-0">
        <transition
          mode="out-in"
          enter-active-class="transition ease-out"
          enter-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition ease-in"
          leave-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <nuxt-img
            v-if="$nuxt.$route.path === '/'"
            fill="cover"
            width="1875"
            height="708"
            quality="90"
            src="/images/header-microfigs.png"
            alt="LEGO® microfigs"
            sizes="xs:100vw lg:100vw xl:100vw"
            class="object-cover w-full h-full"
          />
          <nuxt-img
            v-else
            fill="cover"
            width="1875"
            height="708"
            quality="90"
            src="/images/header-dungeons.png"
            alt="LEGO® microfigs"
            sizes="xs:100vw lg:100vw xl:100vw"
            class="object-cover w-full h-full"
          />
        </transition>
      </div>

      <div class="absolute inset-x-0 bottom-0 header-bricks"></div>
      <div class="container relative flex flex-col px-4 py-4 mx-auto md:px-8">
        <nav class="flex items-center justify-between w-full">
          <nuxt-link
            to="/"
            class="relative transition duration-150 ease-in-out w-36"
          >
            <nuxt-picture
              fill="cover"
              width="840"
              height="453"
              quality="70"
              src="/images/logo-bricksanddragons.png"
              alt="Bricks and Dragons Logo"
              sizes="xs:288px"
              class="w-full"
            />
            <span
              class="absolute bottom-0 right-0 inline-block px-3 py-1 text-xs text-red-100 transform bg-red-700 rounded-full -rotate-12"
              >Beta</span
            >
          </nuxt-link>
          <div class="flex items-center gap-1">
            <nuxt-link
              v-for="link in topNav"
              :key="link.name"
              :to="link.to"
              class="relative px-2 py-3 text-lg "
              exact-active-class="after:absolute after:rounded-full hover:after:bg-white/100 after:bg-white/100 after:w-6 after:h-2 after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2"
              >{{ link.name }}</nuxt-link
            >
          </div>
        </nav>
        <div
          class="flex flex-col items-start justify-center flex-1 py-16 lg:items-center"
        >
          <h1 class="text-5xl font-display lg:text-7xl">
            A Modular LEGO® Dungeon System
          </h1>
          <ul class="flex flex-wrap gap-2 mt-2">
            <li
              v-for="tag in tags"
              :key="tag"
              class="flex items-center gap-1 px-2 py-1 text-sm transition transform -skew-x-12 lg:px-3 lg:text-xl"
              :class="
                $nuxt.$route.path === '/' ? 'bg-primary-800' : 'bg-gray-800/70'
              "
            >
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="">{{ tag }}</span>
            </li>
          </ul>
          <nuxt-link
            to="/dungeons"
            class="flex items-center gap-1 px-4 py-2 mt-8 text-lg text-gray-800 transition rounded-full bg-primary-50/90 hover:bg-primary-50/100"
            ><span>Explore all dungeon maps</span
            ><svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path></svg
          ></nuxt-link>
        </div>
      </div>
    </header>
    <div class="container flex-1 w-full px-4 mx-auto md:px-8">
      <transition
        enter-active-class="transition ease-out"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <button
          type="button"
          role="button"
          aria-label="Hide wanted list"
          v-show="showWantedList"
          @click="toggleWantedList"
          class="fixed inset-0 z-10 w-full h-full bg-black/50 lg:hidden focus:outline-none"
          style="-webkit-tap-highlight-color: transparent;"
        ></button>
      </transition>
      <transition
        mode="out-in"
        enter-active-class="transition ease-out transform"
        enter-class="-translate-x-16 opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transition ease-in transform"
        leave-class="translate-x-0 opacity-100"
        leave-to-class="translate-x-16 opacity-0"
      >
        <Nuxt />
      </transition>
    </div>
    <footer class="pb-12 text-gray-300 lg:pt-12 bg-gray-500/10">
      <div class="container px-4 py-8 mx-auto md:px-8">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <div class="prose">
              <h3 class="font-display">
                About
              </h3>
              <p>
                This web app,
                <em>which is currently in beta</em>, provides custom built brick
                modules for a modular micro-scale LEGO® dungeon system. Each
                module can be added to a wanted list in XML format. All LEGO®
                parts can then be ordered on
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.bricklink.com/v2/wanted/upload.page?utm_content=subnav"
                  >bricklink</a
                >
                by pasting the XML data into the form field provided (requires a
                registration on bricklink).
              </p>
            </div>
            <ul class="flex items-center gap-2 mt-4">
              <li v-for="link in bottomNav" :key="link.name">
                <nuxt-link :to="link.to" class="underline">{{
                  link.name
                }}</nuxt-link>
              </li>
            </ul>
          </div>
          <div>
            <div class="prose">
              <h3 class="font-display">
                Disclaimer
              </h3>
              <p>
                Bricks &amp; Dragons is not affiliated with The LEGO Group.
                LEGO® is a trademark of The LEGO Group of companies which does
                not in anyway sponsor, authorize, or endorse this content. All
                other original logos and/or brands used are property of their
                respective owners.
              </p>
            </div>
          </div>
        </div>
        <div
          class="flex items-center justify-between mt-8 text-xs text-gray-400"
        >
          <p>
            Bricks &amp; Dragons ©{{ new Date().getFullYear() }} by
            <span class="text-primary-500">Quabbe</span>
          </p>

          <SocialMedia />
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      topNav: [
        { to: "/", name: "Modules" },
        { to: "/dungeons", name: "Dungeons" },
        { to: "/about", name: "About" }
      ],
      bottomNav: [
        { to: "/about", name: "About" },
        { to: "/news", name: "News" }
      ],
      tags: ["micro-scale", "durable", "customizable"]
    };
  },
  computed: {
    ...mapState(["showWantedList"])
  },
  methods: {
    ...mapActions(["toggleWantedList"])
  }
};
</script>

<style>
.header-microfigs {
  background: url("/images/header-microfigs.png") 50% 50% no-repeat;
  background-size: cover;
}
.header-bricks {
  background: url("/images/header-bricks.png") 50% 0 repeat-x;
  height: 31px;
}
</style>
