<template>
  <main class="flex-1 pb-12">
    <PageContent :content="content" />
    <PageFeatures :features="features" />
    <!-- <PageContent :content="outro" /> -->
  </main>
</template>

<script>
export default {
  data() {
    return {
      features: [
        {
          title: "Connectable",
          text:
            "Wall modules can be plugged together via technic bricks. When reconnected in any figure, floor plates are kept in place."
        },
        {
          title: "Durability over aesthetics",
          text:
            "Since modules might get rearranged and shoved around, the usage of loose or easily torn off parts is reduced to a minimum."
        },
        {
          title: "Common parts",
          text:
            "Most parts used are common LEGO® bricks. Modules that contain rare or expensive parts are labeled."
        },
        {
          title: "Reusable parts",
          text:
            "No need to rebuy base plates for every theme. All wall modules use the same base plates."
        },
        {
          title: "2x2 grid",
          text:
            "Floor plates used in all modules are always of the same type and color - to display the 2x2 grid."
        },
        {
          title: "Customizable",
          text:
            "Of course, any module can easily be extended and modified. It's still LEGO® bricks!"
        }
      ],
      content: [
        {
          imgUrl: "/images/dungeon2.png",
          title: "Modular Brick Dungeons",
          text:
            "Welcome to Bricks & Dragons, a system for custom brick dungeons. Build your own modular dungeons with LEGO® bricks.",
          link: {
            title: "All dungeons",
            to: "/dungeons"
          }
        },
        {
          imgUrl: "/images/allmodules.png",
          title: "Microscale Modules",
          text:
            'The system is built around a 2x2 studs grid (15.8mm). Common battle map tile size is 1" or 25.4mm, which would correspond closer to a 3x3 or 4x4 grid. Please be aware that standard RPG miniatures or LEGO® minifigures do not fit, unless the grid size is extended (which is possible).',
          link: {
            title: "All modules",
            to: "/modules"
          }
        }
      ],
      outro: [
        {
          // imgUrl: "/images/allmodules.png",
          title: "Have fun",
          text: "",
          link: {
            title: "All modules",
            to: "/modules"
          }
        }
      ]
    };
  }
};
</script>
