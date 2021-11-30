<template>
  <div class="grid gap-16 py-16 overflow-hidden md:grid-cols-2">
    <div
      v-for="(item, i) in features"
      :key="i"
      class="flex flex-col items-center gap-16"
    >
      <div class="p-3 mx-auto space-y-6">
        <h4
          class="text-2xl font-bold text-gray-700 dark:text-gray-300 md:text-3xl xl:text-4xl"
        >
          {{ item.title }}
        </h4>
        <p
          class="text-lg leading-7 text-gray-600 dark:text-gray-400 md:text-xl md:leading-8"
        >
          {{ item.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    features: {
      type: Array
    }
  }
};
</script>
