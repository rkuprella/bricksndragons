<template>
  <div class="lg:text-lg" :class="darkMode && 'dark'">
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
        v-if="showWantedList || showLogin || showMenu"
        @click="hideModals"
        class="fixed inset-0 z-30 w-full h-full bg-black/40 focus:outline-none"
        :class="!showLogin && 'lg:hidden'"
        style="-webkit-tap-highlight-color: transparent;"
      ></button>
    </transition>
    <UserLogin />
    <div
      class="flex flex-col min-h-screen antialiased text-gray-800 bg-primary-50 dark:text-gray-200 dark:bg-gray-900"
    >
      <TheHeader />

      <div
        class="container relative flex flex-wrap items-start flex-1 w-full gap-8 px-4 py-8 mx-auto md:px-8"
      >
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
        <div
          class="bg-primary-50 dark:bg-gray-700 rounded w-[340px] hidden lg:block"
        >
          <WantedList />
        </div>
      </div>

      <TheFooter />
    </div>
    <MobileMenu />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["showWantedList", "showMenu", "showLogin", "darkMode"])
  },
  methods: {
    ...mapActions(["setWantedList", "setMenu", "setUserLogin"]),
    hideModals() {
      this.setMenu(false);
      this.setUserLogin(false);
      this.setWantedList(false);
    }
  }
};
</script>
