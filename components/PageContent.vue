<template>
  <div class="py-16 space-y-16 overflow-hidden">
    <div
      v-for="(item, i) in content"
      :key="i"
      class="flex flex-col-reverse items-center gap-16 xl:flex-row xl:even:flex-row-reverse"
    >
      <div class="flex-shrink-0 w-full xl:w-1/2" v-if="item.imgUrl">
        <NuxtImg
          loading="lazy"
          :src="item.imgUrl"
          alt=""
          width="1600"
          height="1200"
          class="object-cover w-full"
          sizes="sm:256px md:288px xl:540px"
        />
      </div>
      <div class="mx-auto space-y-6">
        <h3
          class="text-3xl font-bold text-gray-700 dark:text-gray-300 md:text-4xl xl:text-5xl"
          :class="{ 'xl:text-center': !item.imgUrl }"
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
        <div class="flex justify-center">
          <a
            key="href"
            target="_blank"
            rel="noopener noreferrer"
            v-if="item.outro"
            href="https://discord.gg/pGQundu7QT"
            class="flex items-center space-x-3 px-4 py-2 mt-8 text-lg text-white transition rounded-full bg-[#5865F2] bg-opacity-90 hover:bg-opacity-100"
          >
            <svg
              class="w-8 h-8"
              role="img"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Discord</title>
              <path
                d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"
              />
            </svg>
            <span>Join us on Discord</span>
          </a>
        </div>
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
