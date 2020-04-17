// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// const CompressionPlugin = require('compression-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, './', dir);
}

// const { openGzip } = require('./package.json');

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist',
  lintOnSave: true,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      scss: {
        prependData: `
        @import "@/styles/variables.scss";
        @import "@/styles/mixin.scss";
        `,
      },
    },
  },
  devServer: {
    proxy: {
      '/fileServer': {
        target: process.env.VUE_APP_BASEURL_FILE,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/fileServer': '/',
        },
      },
    },
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production';

      // 将每个依赖包打包成单独的js文件
      // const optimization = {
      //   runtimeChunk: 'single',
      //   splitChunks: {
      //     chunks: 'all',
      //     maxInitialRequests: Infinity,
      //     minSize: 20000, // 依赖包超过20000bit将被单独打包
      //     cacheGroups: {
      //       vendor: {
      //         test: /[\\/]node_modules[\\/]/,
      //         name(module) {
      //           // get the name. E.g. node_modules/packageName/not/this/part.js or node_modules/packageName
      //           const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
      //           // npm package names are URL-safe, but some servers don't like @ symbols
      //           return `npm.${packageName.replace('@', '')}`;
      //         }
      //       }
      //     }
      //   }
      // };
      // Object.assign(config, {
      //   optimization
      // });

      // // 开启gizp压缩
      // config.plugins = [
      //   ...config.plugins,
      //   new CompressionPlugin({
      //     test: /\.js$|\.html$|.\css/, // 匹配文件名
      //     threshold: 10240, // 对超过10k的数据压缩
      //     deleteOriginalAssets: false // 不删除源文件
      //   })
      // ];
    } else {
      // 为开发环境修改配置...
      config.mode = 'development';
    }
  },
  chainWebpack: (config) => {
    // 修复HMR（热更新）失效
    config.resolve.symlinks(true);

    // 移除prefetch插件
    config.plugins.delete('prefetch');

    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();

    config.plugin('html').tap((args) => {
      args[0].template = process.env.template;
      return args;
    });

    // 开发环境下，保存时通过eslint自动格式化
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .loader('eslint-loader')
      .tap((options) => {
        options.fix = true;
        return options;
      });
  },
};
