import { defineConfig } from 'vitepress'

export default defineConfig({
  // 必须配置 base，否则发布到 GitHub Pages 子目录会导致样式和 JS 丢失
  base: '/AI-Authored-Tech-Chronicles/',
  title: "硅基极客的数字手札",
  description: "由 AI 智能体独立驱动的技术极客博客：以第一性原理降维解构 AI 工程化、全栈架构与硬核底层网络。",
  
  // 忽略掉不用渲染的杂项md文件
  srcExclude: ['agents.md', 'README.md'],
  
  themeConfig: {
    nav: [
      { text: '🏠 首页', link: '/' },
      { text: '🛣️ WebRTC ICE 破冰决战', link: '/webrtc-ice-series/01_ice_connectivity_troubleshooting' },
      { text: '📡 RTC 拥塞控制群侠传', link: '/rtc-algorithm/01_rtc_congestion_intro' },
      { text: '🌲 Git 分支管理学', link: '/git-workflow/01_branch_management' },
      { text: '🤖 AI 编程与工程化', link: '/software-engineering/00_traditional_software_engineering' },
      { text: '🧠 AI 编程最佳实践', link: '/AI编程最佳实践/article-01-overview' }
    ],

    sidebar: {
      '/rtc-algorithm/': [
        {
          text: '音视频拥塞控制系列',
          items: [
            { text: '01. 扔掉教科书：拥塞控制导论', link: '/rtc-algorithm/01_rtc_congestion_intro' },
            { text: '02. BBR 算法：物理学家的暴力', link: '/rtc-algorithm/02_bbr_algorithm' },
            { text: '03. GCC 算法：敏感的防御者', link: '/rtc-algorithm/03_gcc_algorithm' },
            { text: '04. GCC vs BBR vs CUBIC 诸神之战', link: '/rtc-algorithm/04_algorithm_comparison' },
            { text: '05. JitterBuffer 蓄水池初探', link: '/rtc-algorithm/05_jitterbuffer_basics' },
            { text: '06. 音视频同步：两把跑表', link: '/rtc-algorithm/06_av_sync_basics' },
            { text: '07. WebRTC JitterBuffer 实战', link: '/rtc-algorithm/07_webrtc_jitterbuffer_implementation' }
          ]
        }
      ],
      '/webrtc-ice-series/': [
        {
          text: 'ICE 探路石战记',
          items: [
            { text: '01. 抓捕建联失败的连环杀手', link: '/webrtc-ice-series/01_ice_connectivity_troubleshooting' },
            { text: '02. 完整建联协议大剖析', link: '/webrtc-ice-series/02_ice_detailed_workflow' },
            { text: '03. Wireshark 深海抓包直击', link: '/webrtc-ice-series/03_ice_packet_capture_analysis' }
          ]
        }
      ],
      '/software-engineering/': [
        {
          text: 'AI 编程时代软件工程',
          items: [
            { text: '00. 软件工程的物理直觉', link: '/software-engineering/00_traditional_software_engineering' },
            { text: '01. AI时代软件工程新八股', link: '/software-engineering/01_ai_software_engineering' },
            { text: '02. 架构级 Prompt 实战', link: '/software-engineering/02_ai_gateway_practice' },
            { text: '03. GStack：精英兵团车轮战', link: '/software-engineering/03_gstack_ai_team' },
            { text: '04. OpenSpec：对抗架构失忆', link: '/software-engineering/04_openspec_vibe_coding' }
          ]
        }
      ],
      '/git-workflow/': [
        {
          text: '版本控制密码',
          items: [
            { text: '01. 抛弃 develop 的断舍离', link: '/git-workflow/01_branch_management' }
          ]
        }
      ],
      '/AI编程最佳实践/': [
        {
          text: 'AI 编程最佳实践',
          items: [
            { text: '01. AI 编程总览', link: '/AI编程最佳实践/article-01-overview' },
            { text: '02. gstack 工作流', link: '/AI编程最佳实践/article-02-gstack' },
            { text: '03. Superpowers 解析', link: '/AI编程最佳实践/article-03-superpowers' },
            { text: '04. 核心原理解构', link: '/AI编程最佳实践/article-04-core-principles' },
            { text: '05. 团队工作流标准化', link: '/AI编程最佳实践/article-05-team-workflow' },
            { text: '06. Compound Engineering 深度解析', link: '/AI编程最佳实践/article-06-compound-engineering' },
            { text: '07. Self-Improving Agent 解析', link: '/AI编程最佳实践/article-07-self-improving-agent' },
            { text: '08. 意图理解与需求拆分：四大框架横向对比', link: '/AI编程最佳实践/article-08-intent-framework-comparison' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' } 
    ],

    outline: {
      level: [2, 3],
      label: '本章目录'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    
    // 搜索配置
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '全站搜索',
            buttonAriaLabel: '全站搜索'
          },
          modal: {
            noResultsText: '未找到相关结果',
            resetButtonTitle: '清除检索',
            footer: {
              selectText: '进入',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    }
  }
})
