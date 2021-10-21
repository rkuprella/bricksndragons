<template>
  <div
    class="absolute z-40 flex flex-col items-center w-56 gap-3 p-3 text-sm transform -translate-x-1/2 bg-gray-800 text-primary-50 left-1/2 rounded-2xl top-full"
    v-click-outside="hide"
  >
    <h1>Unlock everything</h1>
    <button
      type="button"
      role="button"
      aria-label="Pro membership"
      class="flex items-center gap-2 p-3 text-base text-gray-900 transition transform rounded bg-primary-500 lg:py-1 hover:bg-primary-400 active:scale-95"
    >
      Pro membership
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ClickOutside from "vue-click-outside";

export default {
  directives: {
    ClickOutside
  },
  computed: {
    ...mapState(["showPremiumPopup"])
  },
  methods: {
    ...mapActions(["addModule", "toggleModuleSection", "closePremiumPopup"]),

    hide() {
      this.closePremiumPopup();
    }
  },

  mounted() {
    this.popupItem = this.$el;
  }
};
</script>
