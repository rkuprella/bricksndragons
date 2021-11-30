<template>
  <div class="py-16 space-y-16 overflow-hidden">
    <div
      v-for="(item, i) in content"
      :key="i"
      class="flex flex-col-reverse items-center gap-16 xl:flex-row xl:odd:flex-row-reverse"
    >
      <div
        class="flex-shrink-0 w-72 h-72 overflow-hidden rounded-full xl:w-96 xl:h-96 2xl:w-[500px] 2xl:h-[500px] bg-gray-500/20"
        v-if="item.imgUrl"
      >
        <NuxtImg
          loading="lazy"
          :src="item.imgUrl"
          alt=""
          width="1600"
          height="1200"
          class="object-cover w-full h-full"
          sizes="sm:256px md:288px xl:540px"
        />
      </div>
      <div class="mx-auto space-y-6 xl:space-y-10">
        <h3
          class="text-3xl font-bold text-gray-700 dark:text-gray-300 md:text-4xl xl:text-5xl"
          :class="{ 'md:text-center': !item.imgUrl }"
        >
          {{ item.title }}
        </h3>
        <p
          class="text-lg leading-7 text-gray-600 dark:text-gray-400 md:text-xl md:leading-8"
        >
          {{ item.text }}
        </p>
        <nuxt-link
          v-if="item.link"
          :to="item.link.to"
          class="inline-flex items-center px-8 py-3 space-x-3 text-xl font-bold transition ease-in-out border-4 rounded-lg text-primary-700 dark:text-primary-400 whitespace-nowrap border-primary-700 hover:border-primary-700/80 dark:border-primary-400 group dark:hover:border-primary-400/80 md:text-2xl"
        >
          <span>{{ item.link.title }}</span>
          <svg
            class="w-6 h-6 transition-transform duration-150 ease-in-out transform translate-y-px md:w-8 md:h-8 xl:w-10 xl:h-10 group-hover:translate-x-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Array
    }
  }
};
</script>
