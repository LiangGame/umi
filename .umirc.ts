import { defineConfig } from 'umi';

export default defineConfig({
  dynamicImport: {}, // 按需加载
  locale: {}, // i18n 国际化
  routes: [
    { exact: true, path: '/login', component: '@/pages/login/login' },
    {
      exact: false, path: '/', component: '@/layouts/index',
      routes: [
        { exact: true, path: '/', component: '@/pages/index' },
        { exact: true, path: '/home', component: '@/pages/index' },
      ],
    },
  ],
  lessLoader: {
    modifyVars: { // 使用mixins变量
      hack: `true; @import "~@/mixins.less";`
    }
  },
  define: {
    USE_TOKEN: 'D840BC6A06A94E30'
  }
});
