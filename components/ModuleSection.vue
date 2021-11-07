<template>
  <section class="w-full py-4" v-if="items.length > 0">
    <div
      class="flex items-center justify-between w-full"
      v-if="to || title === 'Related modules'"
    >
      <nuxt-link
        :to="`/${type}/${to}`"
        class="px-1 py-3 group"
        :title="`All ${title}`"
      >
        <h2 class="text-sm text-gray-600 dark:text-gray-400">
          <span class="group-hover:underline">{{ title }}</span>
          (<span class="font-bold text-gray-600 dark:text-gray-200">{{
            items.length
          }}</span
          >)
        </h2>
      </nuxt-link>
      <button
        type="button"
        role="button"
        :title="`Hide/Show ${title}`"
        :aria-label="`Hide/Show ${title}`"
        @click="toggleModuleSection(title)"
        class="p-3 text-gray-700 transition duration-150 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
      >
        <svg
          class="w-5 h-5 transition-transform duration-100 transform"
          :class="isVisible ? '' : '-rotate-90'"
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
    </div>
    <ul
      class="grid grid-cols-2 gap-3 mt-8 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
      v-if="isVisible"
    >
      <li v-for="item in items" :key="item.id" class="flex flex-col">
        <nuxt-link
          :title="item.name"
          :to="`/${type}/${item.type}s/${item.id}`"
          class="relative transition transform hover:scale-105 active:scale-100"
          :class="
            $nuxt.$route.path === `/${type}/${item.type}s/${item.id}` &&
              'disabled'
          "
        >
          <div
            class="absolute inset-0 pointer-events-none"
            :class="
              animateItem === item.id && !isPremium(item.theme)
                ? 'transition transform duration-300 translate-y-16 lg:translate-y-0 lg:translate-x-16 opacity-0'
                : 'invisible opacity-50'
            "
          >
            <nuxt-picture
              fit="cover"
              width="800"
              height="600"
              quality="80"
              :src="`/images/modules/${item.imagePath}`"
              :alt="`${item.theme} ${item.element} ${item.name}`"
              sizes="xs:300px sm:200px"
              class="w-full"
            />
          </div>
          <nuxt-picture
            fit="cover"
            width="800"
            height="600"
            quality="80"
            :src="`/images/modules/${item.imagePath}`"
            :alt="`${item.theme} ${item.element} ${item.name}`"
            sizes="xs:300px sm:200px"
            class="relative w-full"
          />
        </nuxt-link>
        <div class="relative flex items-center gap-2 py-1 pl-3">
          <button
            @click="add(item)"
            :title="
              isPremium(item.theme)
                ? 'Requires pro membership'
                : `Add ${item.name} to your wanted list`
            "
            class="p-3 text-gray-900 transition transform rounded bg-primary-500 lg:p-1 hover:bg-primary-400 hover:scale-110 active:scale-100"
          >
            <svg
              v-if="isPremium(item.theme)"
              class="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              v-else
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
          </button>
          <transition
            enter-active-class="transition transform duration-300 ease-[cubic-bezier(0.2,0.5,0.1,1)]"
            enter-class="scale-50 -translate-y-8 opacity-0"
            enter-to-class="scale-100 translate-y-0"
            leave-active-class="transition transform ease-[cubic-bezier(0.5,0,0.7,0.4)]"
            leave-class="translate-y-0"
            leave-to-class="translate-y-16 opacity-0"
          >
            <PremiumPopup v-if="showPremiumPopup === item.id" />
          </transition>
          <div class="flex flex-col flex-1 overflow-hidden">
            <div
              class="flex gap-1"
              :title="isExpensive(item.id) && 'Rare parts'"
              :class="isExpensive(item.id) && 'cursor-help'"
            >
              <span
                class="text-xs italic text-gray-600/90 dark:text-gray-400"
                >{{ item.element }}</span
              >
              <svg
                v-if="isExpensive(item.id)"
                class="w-4 h-4 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <span class="truncate">{{ item.name }}</span>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: false
    },
    items: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState([
      "showWalls",
      "showSets",
      "showMicrofigs",
      "showMonsters",
      "showPremiumPopup",
      "animateTimer",
      "animateItem"
    ]),
    ...mapGetters(["isExpensive", "isPremium"]),
    isVisible() {
      if (this.title === "Walls and floor tiles") {
        return this.showWalls;
      } else if (this.title === "Item sets") {
        return this.showSets;
      } else if (this.title === "Microfigs") {
        return this.showMicrofigs;
      } else {
        return this.showMonsters;
      }
    }
  },
  methods: {
    ...mapActions([
      "addModule",
      "toggleModuleSection",
      "setAnimateTimer",
      "setAnimateItem"
    ]),
    add(item) {
      this.addModule(item);
      this.setAnimateItem(null);
      this.setAnimateTimer(
        setTimeout(() => {
          this.setAnimateItem(item.id);
        }, 1)
      );
      this.setAnimateTimer(
        setTimeout(() => {
          this.setAnimateItem(null);
        }, 300)
      );
    }
  }
};
</script>
