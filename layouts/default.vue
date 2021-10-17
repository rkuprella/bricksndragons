<template>
  <div :class="darkMode && 'dark'">
    <div
      class="flex flex-col min-h-screen antialiased text-gray-800 bg-primary-100 dark:text-gray-200 dark:bg-gray-900"
    >
      <header
        class="relative text-primary-50 bg-primary-600 min-h-[480px] lg:h-[480px]"
      >
        <transition
          enter-active-class="transition ease-out"
          enter-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition ease-in"
          leave-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="showMenu"
            @click="setMenu(false)"
            class="absolute inset-0 z-20 w-full h-full bg-black/20 lg:hidden"
          ></div>
        </transition>
        <transition-group
          tag="nav"
          :style="{ '--total': topNav.length }"
          class="absolute right-0 z-40 flex flex-col items-end gap-4 overflow-hidden text-primary-900/80 top-32 lg:hidden dark:text-gray-400"
          enter-active-class="transition transform duration-300 ease-[cubic-bezier(0.2,0.5,0.1,1)] delay-[calc(0.12s*var(--i))]"
          enter-class="-translate-x-8 opacity-0"
          enter-to-class="translate-x-0"
          leave-active-class="transition transform ease-[cubic-bezier(0.5,0,0.7,0.4)] delay-[calc(0.12s*(var(--total)-var(--i)))]"
          leave-class="translate-x-0"
          leave-to-class="translate-x-full"
        >
          <template v-if="showMenu">
            <nuxt-link
              :to="link.to"
              v-for="(link, i) in topNav"
              :key="link.name"
              :style="{ '--i': i }"
              @click.native="setMenu(false)"
              class="px-6 py-2 text-lg uppercase border-r-8 border-transparent bg-primary-100 dark:bg-gray-800"
              exact-active-class="!border-gray-900 dark:!border-primary-500 text-gray-900 dark:text-primary-500 font-bold"
              :class="
                hasAlias(link) &&
                  '!border-gray-900 dark:!border-primary-500 text-gray-900 dark:text-primary-500 font-bold'
              "
              >{{ link.name }}</nuxt-link
            >
          </template>
        </transition-group>
        <div class="absolute inset-0">
          <nuxt-img
            fill="cover"
            width="1875"
            height="708"
            quality="90"
            :src="getCurrentPage.bgImage"
            :alt="getCurrentPage.bgImageAlt"
            sizes="xs:100vw lg:100vw xl:100vw"
            class="object-cover w-full h-full"
          />
        </div>

        <div class="absolute inset-x-0 bottom-0 z-30 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            class="w-full h-[31px] text-primary-100 dark:text-gray-900"
          >
            <defs>
              <pattern
                fill="currentColor"
                id="bricks"
                x="0"
                y="0"
                width="970"
                height="31"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M275 31V5.21c1.53-.12 3.09-.24 5-.38V0h13v5.02c3.23-.07 6.13.05 9-.07V0h13v5.02c3.23-.07 6.13.05 9-.07V0h13v4.76c1.21.13 2.45.26 4 .42V31h-66zM923 31V5.21c1.53-.12 3.09-.23 5-.38V0h13v4.81c1.58.17 2.81.3 4 .43V31h-22z"
                />
                <path
                  d="M647 31v-4.78c2.21-.46 4.5-.15 6.75-.21 2.3-.06 4.61-.01 7.25-.01v5h-14zM496 31v-4.78c2.21-.46 4.49-.15 6.75-.21 2.3-.06 4.61-.01 7.25-.01v5h-14zM107 31v-4.78c2.21-.46 4.5-.15 6.75-.21 2.3-.06 4.61-.01 7.25-.01v5h-14zM21 31v-4.78c2.21-.46 4.5-.15 6.75-.21 2.3-.05 4.61-.01 7.25-.01v5H21zM388 31v-4.78c2.21-.46 4.49-.15 6.75-.21 2.3-.06 4.61-.01 7.25-.01v5h-14zM64 31v-4.78c2.21-.46 4.5-.15 6.75-.21 2.3-.05 4.61-.01 7.25-.01v5H64zM345 31v-4.78c2.21-.46 4.49-.15 6.75-.21 2.3-.06 4.61-.01 7.25-.01v5h-14zM798 31v-4.78c2.21-.46 4.5-.15 6.75-.21 2.3-.06 4.61-.01 7.25-.01v5h-14zM841 31v-4.78c2.21-.46 4.5-.15 6.75-.21 2.3-.06 4.61-.01 7.25-.01v5h-14zM86 31v-4.98c2.07-.01 4.16-.02 6.25-.02H99v5H86zM129 31v-4.98c2.07-.01 4.16-.02 6.25-.02H142v5h-13zM151 31v-4.98c2.07-.01 4.16-.02 6.25-.02H164v5h-13zM172 31v-4.98c2.07-.01 4.16-.02 6.25-.02H185v5h-13zM194 31v-4.98c2.07-.01 4.16-.02 6.25-.02H207v5h-13zM215 31v-4.98c2.07-.01 4.16-.02 6.25-.02H228v5h-13zM237 31v-4.98c2.07-.01 4.16-.02 6.25-.02H250v5h-13zM258 31v-4.98c2.07-.01 4.16-.02 6.25-.02H271v5h-13zM367 31v-4.98c2.07-.01 4.16-.02 6.25-.02H380v5h-13zM410 31v-4.98c2.07-.01 4.16-.02 6.25-.02H423v5h-13zM432 31v-4.98c2.07-.01 4.16-.02 6.25-.02H445v5h-13zM453 31v-4.98c2.07-.01 4.16-.02 6.25-.02H466v5h-13zM475 31v-4.98c2.07-.01 4.16-.02 6.25-.02H488v5h-13zM518 31v-4.98c2.07-.01 4.16-.02 6.25-.02H531v5h-13zM540 31v-4.98c2.07-.01 4.16-.02 6.25-.02H553v5h-13zM561 31v-4.98c2.07-.01 4.16-.02 6.25-.02H574v5h-13zM583 31v-4.98c2.07-.01 4.16-.02 6.25-.02H596v5h-13zM604 31v-4.98c2.07-.01 4.16-.02 6.25-.02H617v5h-13zM626 31v-4.98c2.07-.01 4.16-.02 6.25-.02H639v5h-13zM0 26h13v5H0v-5zM691 31v-4.98c2.07-.01 4.16-.02 6.25-.02H704v5h-13zM712 31v-4.98c2.07-.01 4.16-.02 6.25-.02H725v5h-13zM734 31v-4.98c2.07-.01 4.16-.02 6.25-.02H747v5h-13zM755 31v-4.98c2.07-.01 4.16-.02 6.25-.02H768v5h-13zM777 31v-4.98c2.07-.01 4.16-.02 6.25-.02H790v5h-13zM669 31v-4.98c2.07-.01 4.16-.02 6.25-.02H682v5h-13zM820 31v-4.98c2.07-.01 4.16-.02 6.25-.02H833v5h-13zM43 31v-4.98c2.07-.01 4.16-.02 6.25-.02H56v5H43zM863 31v-4.98c2.07-.01 4.16-.02 6.25-.02H876v5h-13zM885 31v-4.98c2.07-.01 4.16-.02 6.25-.02H898v5h-13zM906 31v-4.98c2.07-.01 4.16-.02 6.25-.02H919v5h-13zM949 31v-4.98c2.07-.01 4.16-.02 6.25-.02H962v5h-13z"
                />
              </pattern>
            </defs>

            <rect x="0" y="0" width="100%" height="100%" fill="url(#bricks)" />
          </svg>
        </div>
        <div
          class="container relative flex flex-col h-full px-4 py-4 mx-auto md:px-8"
        >
          <nav class="flex items-center justify-between w-full">
            <nuxt-link
              to="/"
              @click.native="setMenu(false)"
              class="relative z-30 transition duration-150 ease-in-out w-36"
            >
              <nuxt-picture
                fill="cover"
                width="840"
                height="453"
                quality="70"
                src="/images/logo-bricksanddragons.png"
                alt="Bricks and Dragons Logo"
                sizes="xs:288px"
                class="w-full"
              />
              <span
                class="absolute bottom-0 right-0 inline-block px-3 py-1 text-xs text-red-100 transform bg-red-700 rounded-full -rotate-12"
                >Beta</span
              >
            </nuxt-link>
            <div class="items-center hidden gap-1 lg:flex">
              <nuxt-link
                v-for="link in topNav"
                :key="link.name"
                :to="link.to"
                class="relative px-2 py-3 text-lg uppercase"
                exact-active-class="after:absolute after:rounded-full hover:after:bg-primary-100/100 after:bg-primary-100/100 after:w-6 after:h-2 after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2"
                :class="
                  hasAlias(link) &&
                    'after:absolute after:rounded-full hover:after:bg-primary-100/100 after:bg-primary-100/100 after:w-6 after:h-2 after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2'
                "
                >{{ link.name }}</nuxt-link
              >
              <button
                @click="toggleDarkMode"
                type="button"
                role="button"
                aria-label="Toggle dark mode"
                title="Toggle dark mode"
                class="relative flex items-center justify-center w-12 h-12 ml-8 transition transform text-primary-50 hover:scale-110 active:scale-125"
                style="-webkit-tap-highlight-color: transparent;"
              >
                <transition
                  mode="out-in"
                  enter-active-class="transition ease-out transform"
                  enter-class="scale-50 -translate-x-6 -translate-y-6 opacity-0"
                  enter-to-class="scale-100 translate-x-0 opacity-100"
                  leave-active-class="transition ease-in transform"
                  leave-class="scale-100 translate-x-0 opacity-100"
                  leave-to-class="scale-50 translate-x-6 translate-y-6 opacity-0"
                >
                  <svg
                    v-if="darkMode"
                    class="absolute w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                    ></path>
                  </svg>
                  <div class="absolute w-8 h-8" v-else>
                    <svg
                      fill="currentColor"
                      class="w-8 h-8"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </transition>
              </button>
            </div>
            <button
              type="button"
              role="button"
              aria-label="Toggle menu"
              class="relative z-30 w-12 h-12 text-primary-100 lg:hidden"
              @click="setMenu(showMenu ? false : true)"
            >
              <div
                class="absolute inset-x-0 -mt-1 text-sm tracking-wider uppercase top-full text-primary-50"
              >
                Menu
              </div>
              <div
                class="absolute inset-0 flex flex-col items-center gap-1 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 720.000000 216.000000"
                  preserveAspectRatio="xMidYMid meet"
                  class="w-12 h-3 transition duration-75 ease-in transform"
                  :class="!showMenu && 'translate-y-2'"
                >
                  <g
                    transform="translate(0.000000,216.000000) scale(0.100000,-0.100000)"
                    fill="currentColor"
                    stroke="none"
                  >
                    <path
                      d="M720 1800 l0 -360 -360 0 -360 0 0 -720 0 -720 3600 0 3600 0 0 720
0 720 -360 0 -360 0 0 360 0 360 -1080 0 -1080 0 0 -360 0 -360 -720 0 -720 0
0 360 0 360 -1080 0 -1080 0 0 -360z"
                    />
                  </g>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 720.000000 216.000000"
                  preserveAspectRatio="xMidYMid meet"
                  class="w-12 h-3"
                >
                  <g
                    transform="translate(0.000000,216.000000) scale(0.100000,-0.100000)"
                    fill="currentColor"
                    stroke="none"
                  >
                    <path
                      d="M720 1800 l0 -360 -360 0 -360 0 0 -720 0 -720 3600 0 3600 0 0 720
0 720 -360 0 -360 0 0 360 0 360 -1080 0 -1080 0 0 -360 0 -360 -720 0 -720 0
0 360 0 360 -1080 0 -1080 0 0 -360z"
                    />
                  </g>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 720.000000 216.000000"
                  preserveAspectRatio="xMidYMid meet"
                  class="w-12 h-3 transition duration-75 ease-in transform"
                  :class="!showMenu && '-translate-y-2'"
                >
                  <g
                    transform="translate(0.000000,216.000000) scale(0.100000,-0.100000)"
                    fill="currentColor"
                    stroke="none"
                  >
                    <path
                      d="M720 1800 l0 -360 -360 0 -360 0 0 -720 0 -720 3600 0 3600 0 0 720
0 720 -360 0 -360 0 0 360 0 360 -1080 0 -1080 0 0 -360 0 -360 -720 0 -720 0
0 360 0 360 -1080 0 -1080 0 0 -360z"
                    />
                  </g>
                </svg>
              </div>
            </button>
          </nav>
          <transition-group
            tag="div"
            move-class="transition duration-300"
            enter-active-class="transition ease-out delay-300"
            enter-class="scale-50 opacity-0"
            enter-to-class="scale-100 opacity-100"
            leave-active-class="absolute transition duration-150 ease-linear transform"
            leave-class="opacity-100"
            leave-to-class="translate-y-32 opacity-0"
            class="flex flex-col items-start justify-center flex-1 py-16 lg:items-center"
          >
            <h1
              key="slogan"
              class="text-5xl font-display text-primary-50 lg:text-7xl"
              v-if="getCurrentPage.slogan"
            >
              {{ getCurrentPage.slogan }}
            </h1>
            <ul
              key="tags"
              class="flex flex-wrap gap-2 mt-2"
              v-if="getCurrentPage.tags"
            >
              <li
                v-for="tag in getCurrentPage.tags"
                :key="tag"
                class="flex items-center gap-1 px-2 py-1 text-sm text-gray-800 transition transform -skew-x-12 dark:text-primary-50 bg-white/50 dark:bg-black/50 lg:px-3 lg:text-xl"
              >
                <svg
                  class="w-6 h-6"
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
                <span class="">{{ tag }}</span>
              </li>
            </ul>
            <nuxt-link
              key="link"
              v-if="getCurrentPage.linkTo"
              :to="getCurrentPage.linkTo"
              class="flex items-center gap-1 px-4 py-2 mt-8 text-lg text-gray-700 transition rounded-full bg-primary-100/90 hover:bg-primary-100/100"
            >
              <span>{{ getCurrentPage.linkTitle }}</span
              ><svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path></svg
            ></nuxt-link>
            <a
              key="href"
              target="_blank"
              rel="noopener noreferrer"
              v-if="getCurrentPage.linkHref"
              :href="getCurrentPage.linkHref"
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
              <span>{{ getCurrentPage.linkTitle }}</span>
            </a>
          </transition-group>
        </div>
      </header>

      <div
        class="container relative flex flex-wrap items-start flex-1 w-full gap-8 px-4 py-8 mx-auto md:px-8"
      >
        <transition
          enter-active-class="transition ease-out"
          enter-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition ease-in"
          leave-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <button
            type="button"
            role="button"
            aria-label="Hide wanted list"
            v-show="showWantedList"
            @click="toggleWantedList"
            class="fixed inset-0 z-30 w-full h-full bg-black/50 lg:hidden focus:outline-none"
            style="-webkit-tap-highlight-color: transparent;"
          ></button>
        </transition>
        <transition
          mode="out-in"
          enter-active-class="transition ease-out transform"
          enter-class="-translate-x-16 opacity-0"
          enter-to-class="translate-x-0 opacity-100"
          leave-active-class="transition ease-in transform"
          leave-class="translate-x-0 opacity-100"
          leave-to-class="translate-x-16 opacity-0"
        >
          <Nuxt />
        </transition>
        <WantedList />
      </div>

      <footer class="pb-12 text-gray-300 lg:pt-12 bg-gray-500/10">
        <div class="container px-4 py-8 mx-auto md:px-8">
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <div class="prose dark:prose-dark">
                <h3 class="font-display">
                  About
                </h3>
                <p>
                  This web app,
                  <em>which is currently in beta</em>, provides custom built
                  brick modules for a modular micro-scale LEGO® dungeon system.
                  Each module can be added to a wanted list in XML format. All
                  LEGO® parts can then be ordered on
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.bricklink.com/v2/wanted/upload.page?utm_content=subnav"
                    >bricklink</a
                  >
                  by pasting the XML data into the form field provided (requires
                  a registration on bricklink).
                </p>
              </div>
              <ul class="flex items-center gap-2 mt-4">
                <li v-for="link in bottomNav" :key="link.name">
                  <nuxt-link :to="link.to" class="underline">{{
                    link.name
                  }}</nuxt-link>
                </li>
              </ul>
            </div>
            <div>
              <div class="prose dark:prose-dark">
                <h3 class="font-display">
                  Disclaimer
                </h3>
                <p>
                  Bricks &amp; Dragons is not affiliated with The LEGO Group.
                  LEGO® is a trademark of The LEGO Group of companies which does
                  not in anyway sponsor, authorize, or endorse this content. All
                  other original logos and/or brands used are property of their
                  respective owners.
                </p>
              </div>
            </div>
          </div>
          <div
            class="flex items-center justify-between mt-8 text-xs text-gray-400"
          >
            <p class="flex-1">
              Bricks &amp; Dragons ©{{ new Date().getFullYear() }} by
              <span class="text-primary-500">Quabbe</span>
            </p>

            <SocialMedia />
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      topNav: [
        {
          to: "/",
          aliases: [],
          name: "Home",
          slogan: "A Modular LEGO® Dungeon System",
          tags: ["micro-scale", "durable", "connectible"],
          linkTitle: "Explore all dungeon maps",
          linkTo: "/dungeons",
          bgImage: "/images/header-microfigs.png",
          bgImageAlt: "LEGO® Microfig Heads"
        },
        {
          to: "/modules",
          aliases: ["/walls", "/monsters", "/items"],
          name: "Modules",
          slogan: "Build any dungeon for your RPG",
          linkTitle: "Explore all dungeon maps",
          linkTo: "/dungeons",
          bgImage: "/images/header-microfigs.png",
          bgImageAlt: "LEGO® Microfig Heads"
        },
        {
          to: "/dungeons",
          aliases: [],
          name: "Dungeons",
          slogan: "Inspiration for your campaign",
          tags: ["pre-built", "customizable"],
          bgImage: "/images/header-dungeons.png",
          bgImageAlt: "A modular LEGO® dungeon"
        },
        {
          to: "/about",
          aliases: [],
          name: "About",
          slogan: "About Bricks & Dragons",
          bgImage: "/images/header-microfigs.png",
          bgImageAlt: "LEGO® Microfig Heads",
          linkTitle: "Join us on Discord",
          linkHref: "https://discord.gg/pGQundu7QT"
        }
      ],
      bottomNav: [
        { to: "/about", name: "About" },
        { to: "/news", name: "News" }
      ],
      tags: ["micro-scale", "durable", "customizable"]
    };
  },
  computed: {
    ...mapState(["showWantedList", "showMenu", "darkMode"]),
    getCurrentPage() {
      return (
        this.topNav.find(
          link =>
            link.to === this.$nuxt.$route.path ||
            link.aliases.find(alias => alias === this.$nuxt.$route.path)
        ) || this.topNav[0]
      );
    }
  },
  methods: {
    ...mapActions(["toggleWantedList", "setMenu", "toggleDarkMode"]),
    hasAlias(link) {
      return (
        this.$nuxt.$route.path.length > 1 &&
        link.aliases.find(alias => this.$nuxt.$route.path.includes(alias))
      );
    }
  }
};
</script>
