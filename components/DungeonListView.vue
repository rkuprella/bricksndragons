<template>
  <main class="flex-1">
    <ThemeSwitcher
      :themes="themes"
      :searchResults="searchResults"
      type="dungeons"
    />
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
            :alt="`${dungeon.theme} ${dungeon.element} ${dungeon.name}`"
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
            class="flex items-center p-3 space-x-1 text-gray-900 transition transform rounded bg-primary-500 lg:py-1 lg:px-2 bg-opacity-90 hover:bg-opacity-100 active:scale-95"
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
              >Add all {{ getTotalModulesInDungeon(dungeon) }} modules to wanted
              list</span
            >
          </button>
        </li>
      </ul>
    </div>
  </main>
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
    },
    searchResults: {
      type: Set,
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
