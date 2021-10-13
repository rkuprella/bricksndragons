<template>
  <div v-if="showMenu" class="absolute right-0 z-50 top-32 lg:hidden">
    <nav class="flex flex-col items-end gap-2">
      <nuxt-link
        :to="link.to"
        v-for="link in nav"
        :key="link.name"
        @click.native="setMenu(false)"
        class="px-6 py-3 text-lg text-blue-500 bg-gray-900"
        exact-active-class="border-r-8 border-blue-500"
        >{{ link.name }}</nuxt-link
      >
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: {
    nav: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState(["showMenu"])
  },
  methods: {
    ...mapActions(["setMenu"])
  }
};
</script>
