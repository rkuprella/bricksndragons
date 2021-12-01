<template>
  <div class="grid gap-6 py-16 overflow-hidden md:grid-cols-2 xl:grid-cols-3">
    <div
      v-for="(item, i) in features"
      :key="i"
      class="flex flex-col items-center gap-6"
    >
      <div class="p-3 mx-auto space-y-4">
        <div class="flex items-center gap-3 md:flex-col">
          <div class="flex-shrink-0 w-24 md:w-48" v-if="item.imgUrl">
            <NuxtImg
              loading="lazy"
              :src="item.imgUrl"
              alt=""
              width="1600"
              height="1200"
              class="object-cover w-full"
              sizes="sm:192px md:384px"
            />
          </div>
          <h4
            class="self-start text-2xl font-bold text-gray-700 dark:text-gray-300 md:text-3xl xl:text-4xl"
          >
            {{ item.title }}
          </h4>
        </div>
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
