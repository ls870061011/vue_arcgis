import { loadModules, loadCss } from 'esri-loader';

import Config from './Config';
// import Map from './Map';
// import SceneView from './SceneView';

// import SceneLayer from './layers/SceneLayer';

// import LayerList from './widgets/LayerList';

export default class EsriAPI {
  static init(domId: string) {
    const options = {
      url: process.env.VUE_APP_GIS_SDK,
    };
    loadCss(`${process.env.VUE_APP_GIS_SDK}esri/themes/light/main.css`);
    const modules = ['esri/Map', 'esri/views/SceneView', 'esri/layers/SceneLayer', 'esri/widgets/LayerList'];
    loadModules(modules, options).then((args) => {
      const gisConstructor = Config.constructors;
      for (const key in args) {
        const name: string = modules[key].split('/').pop() || '';
        gisConstructor[name] = args[key];
      }
      Config.constructors = gisConstructor;
      this.test(domId);
    });
  }

  static test(domId: string) {
    // Create Map
    const map = new Config.constructors.Map({
      basemap: 'hybrid',
      ground: 'world-elevation',
    });

    // Create the SceneView
    const view = new Config.constructors.SceneView({
      container: domId,
      map,
      camera: {
        position: [4.84361, 45.75561, 270],
        tilt: 82,
        heading: 304,
      },
      environment: {
        atmosphere: {
          quality: 'high',
        },
      },
    });

    // Create SceneLayer and add to the map
    const sceneLayer = new Config.constructors.SceneLayer({
      portalItem: {
        id: '2342ab7928834076a1240fb93c60e978',
      },
      elevationInfo: {
        mode: 'absolute-height',
        offset: 6,
      },
      // popupEnabled: false,
    });
    map.add(sceneLayer);

    // Add a layer list widget
    const layerList = new Config.constructors.LayerList({
      view: view,
    });
    view.ui.add(layerList, 'bottom-left');
  }
}
