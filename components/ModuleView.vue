<template>
  <main class="flex-1">
    <BreadCrumbs
      :item="item"
      :type="type"
      deep
      :title="`${item.theme} - ${item.element} - ${item.name}`"
    />
    <div class="flex flex-col items-center gap-8 py-8">
      <section class="flex flex-col items-center gap-4">
        <nuxt-picture
          width="800"
          height="600"
          quality="90"
          :src="`/images/modules/${item.imagePath}`"
          :alt="`${item.theme} ${item.element} ${item.name}`"
          sizes="xs:640px sm:800px"
        />
        <div v-if="isExpensive(item.id)" class="flex items-center gap-2">
          <svg
            class="w-6 h-6 text-red-600"
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
          <span>Contains rare and/or expensive parts</span>
        </div>
        <button
          @click="!isPremium(item.theme) && addModule(item)"
          title="Add module to your wanted list"
          class="flex items-center gap-2 p-3 text-gray-900 transition transform rounded bg-primary-500 lg:py-1 hover:bg-primary-400 active:scale-95"
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
          <span v-if="isPremium(item.theme)">Currently not available</span>
          <span v-else>Add module to your wanted list</span>
        </button>
      </section>
      <ModuleSection
        :items="relatedItems"
        title="Related modules"
        :type="type"
      />
      <section
        class="flex flex-col gap-4"
        v-if="item.type != 'microfig' && !isPremium(item.theme)"
      >
        <h3 class="text-sm text-gray-600 dark:text-gray-400">
          Instructions
        </h3>

        <nuxt-picture
          loading="lazy"
          width="1684"
          height="1192"
          quality="90"
          :src="`/images/instructions/${item.imagePath}`"
          :alt="`${item.theme} ${item.element} ${item.name}`"
          sizes="xs:640px xl:1200px"
          class="mix-blend-multiply dark:mix-blend-normal"
        />
      </section>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    relatedItems: {
      type: Array,
      required: false
    },
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(["isExpensive", "isPremium"]),
    getTotalParts() {
      let total = 0;

      this.item.parts.map(part => {
        total += part.Qty * 1;
      });

      return total;
    }
  },
  methods: {
    ...mapActions(["addModule"])
  }
};
</script>
