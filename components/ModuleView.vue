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
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span>Contains rare or expensive part(s)</span>
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
