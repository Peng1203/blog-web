import { defineValaxyConfig } from 'valaxy'
import type { UserThemeConfig } from 'valaxy-theme-yun'

// add icons what you will need
const safelist = [
  'i-ri-home-line',
]

/**
 * User Config
 */
export default defineValaxyConfig<UserThemeConfig>({
  // site config see site.config.ts
  theme: "yun",
  themeConfig: {
    banner: {
      enable: true,
      title: "Peng的小站",
      cloud: {
        enable: true,
      },
    },
    notice: {
      enable: false,
      content: '114514'
    },
    pages: [
      {
        name: "我的小伙伴们",
        url: "/links/",
        icon: "i-ri-genderless-line",
        color: "dodgerblue",
      },
      {
        name: "喜欢的女孩子",
        url: "/girls/",
        icon: "i-ri-women-line",
        color: "hotpink",
      },
    ],

    footer: {
      since: 2023,
      beian: {
        enable: true,
        icp: "豫ICP备2023037704号",
      },
      
      icon: {
        // enable: true,
        name: 'Copyright © 2022 - 2023',
        title: 'Copyright © 2022 - 2023',
      },
      // powered: false,
    },
  },

  unocss: { safelist },
});
