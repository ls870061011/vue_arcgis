/**
 * 内部配置文件
 */

import { loadModules, loadCss } from 'esri-loader';

class Config {
  // constructor(options: any) {
  //   initModule(options.url);
  // }

  static modules: { [key: string]: any } = {}; // 用到的ArcGIS模块类

  static async initModule(url: string) {
    const options = {
      url,
    };
    loadCss(`${url}esri/themes/light/main.css`);
    const modules = ['esri/Map', 'esri/views/SceneView', 'esri/layers/SceneLayer', 'esri/widgets/LayerList'];
    try {
      const args = await loadModules(modules, options);
      const gisConstructor = Config.modules;
      Object.keys(args).forEach((key: string) => {
        const name: string = modules[Number(key)].split('/').pop() || '';
        gisConstructor[name] = args[Number(key)];
      });
      // for (const key in args) {
      //   const name: string = modules[key].split('/').pop() || '';
      //   gisConstructor[name] = args[key];
      // }
      Config.modules = gisConstructor;
    } catch (err) {
      // console.error(err);
    }
  }
}

export default Config;
