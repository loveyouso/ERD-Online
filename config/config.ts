// https://umijs.org/config/
import { defineConfig } from '@umijs/max';
import proxy from './proxy';
import routes from './routes';


const {REACT_APP_ENV} = process.env;

export default defineConfig({
  hash: true,
  fastRefresh: true,
  // umi routes: https://umijs.org/docs/routing
  routes,
  title:'ERD Online',
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  layout:{},
  model: {},
  access: {},
  // access 插件依赖 initial State 所以需要同时开启
  initialState: {},
  deadCode: {},
  presets: ['umi-presets-pro'],
  analytics: {
    baidu: '46689e26837885690d97c7f5d08b9a0b',
  },
  headScripts:[
    '/js/g6.min.js',
    '/js/chatui-icons.js',
    '/js/g6-plugins.min.js',
    '/js/html2canvas.min.js',
    '/env-config.js?date='+ new Date(),
  ],


});
