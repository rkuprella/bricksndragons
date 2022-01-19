<template>
  <main class="flex-1 pb-12">
    <PageContent :content="content" />
    <PageFeatures :features="features" />
    <PageContent :content="outro" />
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
            "Wall modules can easily be plugged together via side studs. When reconnected in any figure, floor plates are kept in place.",
          imgUrl: "/images/connectable.png"
        },
        {
          title: "Durability over aesthetics",
          text:
            "Since modules might get rearranged and shoved around, the usage of loose or easily torn off parts is reduced to a minimum.",
          imgUrl: "/images/durable.png"
        },
        {
          title: "Common parts",
          text:
            "Most parts used are common LEGO® bricks. Very few modules contain rare or expensive parts and are labeled as such.",
          imgUrl: "/images/common.png"
        },
        {
          title: "Reusable parts",
          text:
            "No need to rebuy base plates for every theme. All wall modules use the same base plates.",
          imgUrl: "/images/reusable.png"
        },
        {
          title: "2x2 grid",
          text:
            "Floor plates used in all modules are always of the same type and color - to display the 2x2 grid. Feel free to customize!",
          imgUrl: "/images/grid.png"
        },
        {
          title: "Customizable",
          text:
            "Of course, any module can easily be extended and modified. It's still LEGO® bricks!",
          imgUrl: "/images/custom.png"
        }
      ],
      content: [
        {
          title: "Welcome to Bricks & Dragons",
          text:
            "This web app provides instructions and part lists for custom built LEGO® dungeon modules. By copying the XML data of your wanted list, you can easily order the needed LEGO® bricks from bricklink."
        },
        {
          imgUrl: "/images/dungeon2.png",
          title: "Modular Brick Dungeons",
          text:
            "Build your own modular dungeon and choose from many different themes like castle, cave or tavern.",
          link: {
            title: "All dungeons",
            to: "/dungeons"
          }
        },
        {
          imgUrl: "/images/modules2.png",
          title: "Microscale Modules",
          text:
            'The system is built around a 2x2 studs grid (15.8mm). Common battle map tile size is 1" or 25.4mm, which would correspond closer to a 3x3 or 4x4 grid. Please be aware that standard RPG miniatures or LEGO® minifigures do not fit, unless the grid size is extended (which is possible).',
          link: {
            title: "All modules",
            to: "/modules"
          }
        },
        {
          imgUrl: "/images/beholders.png",
          title: "Monsters & Heroes",
          text:
            "Brickbuilt microscale monsters and buyable LEGO® Heroica microfigures.",
          link: {
            title: "All creatures",
            to: "/creatures"
          }
        }
      ],
      outro: [
        {
          // imgUrl: "/images/allmodules.png",
          title: "Become a Brick Dungeon Master",
          text:
            "More content to come in the future. Feel free to join our Discord to share your thoughts, ideas and feedback!",
          outro: true
        }
      ]
    };
  }
};
</script>
