<template>
  <div class="flex flex-wrap items-center justify-start gap-3 pb-4">
    <nuxt-link
      :to="`/${type}`"
      class="flex items-center px-1 py-3 space-x-1 text-sm text-gray-600 transition dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
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
      <span>{{
        `${type.slice(0, 1).toUpperCase()}${type.slice(1, type.length)}`
      }}</span>
    </nuxt-link>
    <nuxt-link
      v-if="deep"
      :to="`/${type}/${item.type}s`"
      class="flex items-center px-1 py-3 space-x-1 text-sm text-gray-600 transition dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
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
      <span>{{
        `${item.type.slice(0, 1).toUpperCase()}${item.type.slice(
          1,
          item.type.length
        )}s`
      }}</span>
    </nuxt-link>
    <h2 v-if="!deep" class="text-sm">
      {{
        `${item.type.slice(0, 1).toUpperCase()}${item.type.slice(
          1,
          item.type.length
        )}s`
      }}
    </h2>
    <h2 v-else class="text-sm">{{ title }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
    deep: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: false
    }
  }
};
</script>
