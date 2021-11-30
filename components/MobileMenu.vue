<template>
  <div
    class="fixed inset-x-0 bottom-0 z-40 flex flex-col max-h-full pointer-events-none lg:hidden"
  >
    <transition
      enter-active-class="transition ease-out transform"
      enter-class="translate-y-16 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition ease-in transform"
      leave-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-16 opacity-0"
    >
      <div
        v-if="showWantedList"
        class="relative flex-1 mx-4 mt-8 overflow-y-auto bg-gray-200 pointer-events-auto dark:bg-gray-700 rounded-tl-2xl rounded-tr-2xl"
      >
        <WantedList />
        <button
          role="button"
          type="button"
          aria-label="Close login"
          @click="setWantedList(false)"
          class="absolute p-2 text-gray-200 transition transform top-1 right-1 hover:scale-110 active:scale-90"
        >
          <svg
            class="w-8 h-8"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </transition>

    <!-- button group -->
    <div
      class="relative flex items-center justify-between px-4 py-1 mt-auto border-t pointer-events-auto border-primary-200 dark:border-gray-600 bg-primary-50 dark:bg-gray-800"
    >
      <button
        type="button"
        role="button"
        title="Hide/Show wanted list"
        aria-label="Hide/Show wanted list"
        @click="
          [
            setWantedList(showWantedList ? false : true),
            setUserLogin(false),
            setMenu(false)
          ]
        "
        class="flex items-center justify-between w-full gap-3 p-3 text-gray-400 transition hover:text-gray-300"
      >
        <div class="text-sm dark:text-gray-400">
          <span class="text-lg font-bold text-primary-800 dark:text-blue-300"
            >Wanted list</span
          >
          <span v-show="getTotalModulesInWantedList"
            >(<span
              class="inline-block font-bold transition duration-300 transform dark:text-gray-100"
              :class="animateItem ? 'scale-[2]' : 'scale-100'"
              >{{ getTotalModulesInWantedList }}</span
            >
            {{ getTotalModulesInWantedList == 1 ? "module" : "modules" }},
            <span class="font-bold dark:text-gray-100">{{
              getTotalPartsInWantedList
            }}</span>
            {{ getTotalPartsInWantedList == 1 ? "part" : "parts" }})</span
          >
        </div>

        <svg
          class="w-5 h-5 transition-transform transform"
          :class="showWantedList ? '-rotate-180' : '-rotate-90'"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <!-- <button
        type="button"
        role="button"
        aria-label="Toggle login"
        class="grid w-12 h-12 place-items-center"
        @click="setUserLogin(showLogin ? false : true)"
      >
        <div v-if="user">{{ user.uid.slice(0, 3) }}</div>
        <svg
          v-else
          class="w-8 h-8"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button> -->
    </div>
    <!-- // button group -->
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState(["showWantedList", "animateItem", "user"]),
    ...mapGetters(["getTotalModulesInWantedList", "getTotalPartsInWantedList"])
  },
  methods: {
    ...mapActions(["setWantedList", "setUserLogin", "setMenu"])
  }
};
</script>
