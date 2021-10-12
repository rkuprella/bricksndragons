<template>
  <div class="relative flex flex-wrap items-start gap-8 py-8">
    <main class="flex-1">
      <div class="flex flex-wrap items-center justify-start gap-3 pb-8">
        <nuxt-link
          to="/"
          class="flex items-center py-2 space-x-1 text-gray-400 transition rounded-full hover:text-gray-300"
        >
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span>Modules</span>
        </nuxt-link>
        <h2 class="py-2 italic text-primary-500">
          Dungeons
        </h2>
      </div>
      <ThemeSwitcher :themes="themes" />
      <div class="py-8">
        <ul class="grid grid-cols-1 mt-8 2xl:grid-cols-2">
          <li
            v-for="dungeon in dungeons"
            :key="dungeon.id"
            class="flex flex-col items-center gap-4"
          >
            <nuxt-picture
              loading="lazy"
              fit="cover"
              width="1600"
              height="1200"
              quality="70"
              :src="`/images/dungeons/${dungeon.imagePath}`"
              :alt="`${dungeon.theme} ${dungeon.element} ${dungeon.number}`"
              sizes="xs:100vw lg:1720"
              class="w-full"
            />
            <div class="flex flex-col items-center">
              <h2 class="text-2xl font-bold text-primary-50">
                {{ dungeon.element }}
              </h2>
              <div>
                (<span class="font-bold text-gray-100">{{
                  getTotalModulesInDungeon(dungeon)
                }}</span>
                modules,
                <span class="font-bold text-gray-100">{{
                  getTotalPartsInDungeon(dungeon)
                }}</span>
                parts)
              </div>
            </div>
            <button
              @click="addMap(dungeon)"
              class="flex items-center p-3 space-x-1 text-gray-900 transition rounded bg-primary-500 lg:py-1 lg:px-2 bg-opacity-90 hover:bg-opacity-100"
            >
              <svg
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
              <span
                >Add all {{ getTotalModulesInDungeon(dungeon) }} modules to
                wanted list</span
              >
            </button>
          </li>
        </ul>
      </div>
    </main>
    <WantedList />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    dungeons: {
      type: Array,
      required: true
    },
    themes: {
      type: Array,
      required: true
    }
  },
  methods: {
    ...mapActions(["addMap"]),
    getTotalModulesInDungeon(dungeon) {
      let total = 0;
      dungeon.modules.map(list => {
        total += list.total;
      });
      return total;
    },
    getTotalPartsInDungeon(dungeon) {
      let total = 0;
      dungeon.modules.map(list => {
        list.parts.map(part => {
          total += part.Qty * list.total;
        });
      });
      return total;
    }
  }
};
</script>
