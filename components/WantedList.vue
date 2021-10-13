<template>
  <aside
    class="fixed bottom-0 z-40 px-4 py-1 bg-gray-700 shadow-lg inset-x-4 lg:py-6 lg:sticky rounded-xl lg:w-1/3 xl:w-1/4 lg:bottom-auto lg:top-8 lg:inset-x-auto"
    :class="
      showWantedList
        ? 'top-32 lg:top-8 h-full pb-20 overflow-y-auto lg:overflow-y-visible'
        : ''
    "
  >
    <div
      class="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between px-4 py-1 bg-gray-800 border-t border-gray-600 lg:border-t-0 lg:px-0 lg:py-0 lg:bg-transparent lg:inset-x-auto lg:static lg:bottom-auto"
    >
      <h2 class="text-gray-400">
        <span class="font-bold text-gray-100">Wanted list</span> (<span
          class="font-bold text-gray-100"
          >{{ getTotalModulesInWantedList }}</span
        >
        modules,
        <span class="font-bold text-gray-100">{{
          getTotalPartsInWantedList
        }}</span>
        parts)
      </h2>
      <button
        type="button"
        role="button"
        title="Hide/Show wanted list"
        aria-label="Hide/Show wanted list"
        @click="toggleWantedList"
        class="p-3 text-gray-400 transition duration-150 hover:text-gray-300 lg:hidden"
      >
        <svg
          class="w-5 h-5 transition-transform duration-100 transform"
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
    </div>
    <div :class="showWantedList ? '' : 'hidden lg:block'">
      <div
        class="flex items-center justify-between my-2 lg:my-6"
        v-if="wantedList.length > 0"
      >
        <button
          title="Bookmark"
          @click="saveUserWantedList"
          class="flex items-center gap-1 py-2 pl-2 pr-4 transition ease-in-out"
          :class="
            isWantedListBookmarked
              ? 'text-green-400 hover:text-green-300'
              : 'text-gray-300 hover:text-gray-200'
          "
        >
          <svg
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
          </svg>
          <span>Bookmark</span>
        </button>
        <button
          title="Reset"
          @click="resetWantedList"
          class="flex items-center gap-1 py-2 pl-2 pr-4 text-gray-300 transition ease-in-out hover:text-gray-200"
        >
          <svg
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span>Reset</span>
        </button>
      </div>
      <transition-group
        tag="ul"
        move-class="transition-transform duration-300"
        enter-active-class="transition duration-100 ease-out transform"
        enter-class="scale-50 opacity-0"
        enter-to-class="scale-100 opacity-100"
        leave-active-class="absolute inset-0 w-1/2 transition ease-in transform sm:w-1/4 md:w-1/5 lg:w-1/3 duration-50"
        leave-class="scale-100 opacity-100"
        leave-to-class="scale-50 opacity-0"
        class="relative grid h-full grid-cols-2 mb-6 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-3 place-items-center"
      >
        <li
          v-for="item in wantedList"
          :key="item.id"
          class="flex flex-col items-center pb-4"
        >
          <nuxt-link
            v-if="item.type != 'microfig'"
            title="Instructions"
            @click.native="closeWantedList"
            :to="`/${item.type}/${item.id}`"
            class="transition duration-100 ease-in-out hover:opacity-80"
          >
            <nuxt-picture
              loading="lazy"
              fit="cover"
              width="640"
              height="480"
              quality="70"
              :src="`/images/modules/${item.imagePath}`"
              :alt="`${item.theme} ${item.element} ${item.number}`"
              sizes="xs:100vw sm:300px"
              class="w-full"
            />
          </nuxt-link>
          <div v-else>
            <nuxt-picture
              loading="lazy"
              fit="cover"
              width="640"
              height="480"
              quality="70"
              :src="`/images/modules/${item.imagePath}`"
              :alt="`${item.theme} ${item.element} ${item.number}`"
              sizes="xs:100vw sm:300px"
              class="w-full"
            />
          </div>
          <div class="flex items-center justify-around w-full">
            <button
              @click="removeModule(item)"
              class="p-3 text-gray-900 transition rounded bg-primary-500 lg:p-1 bg-opacity-90 hover:bg-opacity-100"
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
                  d="M20 12H4"
                ></path>
              </svg>
            </button>
            <div>{{ item.total }}</div>
            <button
              @click="addModule(item)"
              class="p-3 text-gray-900 transition rounded bg-primary-500 lg:p-1 bg-opacity-90 hover:bg-opacity-100"
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
            </button>
          </div>
        </li>
      </transition-group>
      <div v-if="wantedList.length > 0">
        <div class="flex divide-x divide-gray-700/80">
          <button
            @click="copyToClipboard('wanted')"
            class="flex-1 p-3 transition ease-out bg-gray-800/80 hover:bg-gray-800/60"
          >
            <div
              v-if="copied"
              class="flex items-center justify-center space-x-1 text-green-300"
            >
              <svg
                class="w-5 h-5"
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
              <span>Copied</span>
            </div>
            <div v-else class="flex items-center justify-center space-x-1">
              <svg
                class="w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                <path
                  d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"
                ></path>
              </svg>
              <span>Copy XML</span>
            </div>
          </button>
          <button
            type="button"
            role="button"
            title="Hide/Show XML"
            aria-label="Hide/Show XML"
            @click="toggleXML"
            class="p-3 text-gray-400 transition duration-150 bg-gray-800/80 hover:bg-gray-800/60 hover:text-gray-300"
          >
            <svg
              class="w-5 h-5 transition-transform duration-100 transform"
              :class="showXML ? '' : '-rotate-90'"
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
        <div
          class="h-48 p-2 overflow-y-auto text-xs font-bold text-blue-400 bg-gray-800 bg-opacity-25"
          :class="showXML ? '' : 'sr-only'"
          id="wanted"
        >
          &lt;INVENTORY&gt;<br />
          <div v-for="part in getPartList" :key="part.id" class="ml-4">
            &lt;ITEM&gt;<br />
            <div class="ml-4">
              &lt;ITEMTYPE&gt;<span class="font-normal text-gray-300">{{
                part.itemType
              }}</span
              >&lt;/ITEMTYPE&gt;<br />
              &lt;ITEMID&gt;<span class="font-normal text-gray-300">{{
                part.itemId
              }}</span
              >&lt;/ITEMID&gt;<br />
              <div v-if="part.color">
                &lt;COLOR&gt;<span class="font-normal text-gray-300">{{
                  part.color
                }}</span
                >&lt;/COLOR&gt;<br />
              </div>
              &lt;MINQTY&gt;<span class="font-normal text-gray-300">{{
                part.minQty
              }}</span
              >&lt;/MINQTY&gt;<br />
            </div>
            &lt;/ITEM&gt;
          </div>
          &lt;/INVENTORY&gt;
        </div>
        <div class="pb-32 mt-6 text-center lg:pb-0">
          <p>
            Order parts on
            <a
              target="_blank"
              href="https://www.bricklink.com/v2/wanted/upload.page?utm_content=subnav"
              class="text-blue-300 underline transition hover:text-blue-200"
              >bricklink</a
            >. For instructions click on the thumbnails.
          </p>
        </div>
      </div>
      <div v-else class="flex flex-col items-center space-y-6">
        <p class="text-center">
          Start adding modules to your wanted list.
        </p>
        <button
          @click="loadWantedList"
          v-if="userWantedList.length > 0"
          class="flex items-center justify-center p-3 space-x-1 text-gray-200 transition ease-out bg-gray-800/80 hover:bg-gray-800/60"
        >
          <svg
            class="w-5 h-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
          </svg>
          <span>Load bookmarked wanted list</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      copied: false,
      copyTimer: null
    };
  },
  computed: {
    ...mapState(["wantedList", "userWantedList", "showWantedList", "showXML"]),
    ...mapGetters([
      "getPartList",
      "isWantedListBookmarked",
      "getTotalModulesInWantedList",
      "getTotalPartsInWantedList"
    ])
  },
  methods: {
    ...mapActions([
      "setTheme",
      "addModule",
      "removeModule",
      "resetWantedList",
      "saveWantedList",
      "loadWantedList",
      "toggleWantedList",
      "toggleXML",
      "closeWantedList"
    ]),
    saveUserWantedList() {
      localStorage.setItem("userWantedList", JSON.stringify(this.wantedList));
      this.saveWantedList(null);
    },
    copyToClipboard(containerId) {
      if (window.getSelection) {
        if (window.getSelection().empty) {
          // Chrome
          window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) {
          // Firefox
          window.getSelection().removeAllRanges();
        }
      } else if (document.selection) {
        // IE?
        document.selection.empty();
      }

      if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerId));
        range.select().createTextRange();
        document.execCommand("copy");
      } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(containerId));
        window.getSelection().addRange(range);
        document.execCommand("copy");
      }
      if (window.getSelection) {
        window.getSelection().removeAllRanges();
      } else if (document.selection) {
        document.selection.empty();
      }

      this.copied = true;
      clearTimeout(this.copyTimer);
      this.copyTimer = setTimeout(() => {
        this.copied = false;
      }, 1000);
    }
  },
  mounted() {
    if (localStorage.getItem("userWantedList") != null) {
      this.saveWantedList(JSON.parse(localStorage.getItem("userWantedList")));
    }
  }
};
</script>
