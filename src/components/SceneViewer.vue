<template>
  <div id="sceneViewer" class="scene-viewer"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

// import EsriAPI from '@/arcgis/EsriAPI';
import Config from '@/arcgis/Config';
import Map from '@/arcgis/Map';
import SceneView from '@/arcgis/SceneView';
import SceneLayer from '@/arcgis/layers/SceneLayer';
import LayerList from '@/arcgis/widgets/LayerList';

@Component
export default class SceneViewer extends Vue {
  @Prop() private msg!: string;

  // eslint-disable-next-line class-methods-use-this
  mounted() {
    Config.initModule(process.env.VUE_APP_GIS_SDK).then(() => {
      // Create Map
      const map = new Map({
        basemap: 'dark-gray',
        ground: 'world-elevation',
      });

      // Create the SceneView
      const sceneView = new SceneView({
        container: 'sceneViewer',
        map,
        camera: {
          position: [-74.0338, 40.6913, 707],
          tilt: 81,
          heading: 50,
        },
        environment: {
          atmosphere: {
            quality: 'high',
          },
        },
      });

      // Create SceneLayer and add to the map
      const sceneLayer = new SceneLayer({
        portalItem: {
          id: '2e0761b9a4274b8db52c4bf34356911e',
        },
        // elevationInfo: {
        //   mode: 'absolute-height',
        //   offset: 6,
        // },
        popupEnabled: false,
      });
      map.add(sceneLayer);

      // Create MeshSymbol3D for symbolizing SceneLayer
      const symbol = {
        type: 'mesh-3d', // autocasts as new MeshSymbol3D()
        symbolLayers: [
          {
            type: 'fill', // autocasts as new FillSymbol3DLayer()
            // If the value of material is not assigned, the default color will be grey
            material: {
              color: [244, 247, 134],
            },
          },
        ],
      };
      // Add the renderer to sceneLayer
      sceneLayer.renderer = {
        type: 'simple', // autocasts as new SimpleRenderer()
        symbol,
      };

      // Add a layer list widget
      const layerList = new LayerList({
        sceneView,
      });
      sceneView.ui.add(layerList, 'bottom-left');
    });
  }
}
</script>

<style scoped lang="scss">
.scene-viewer {
  height: 100%;
}
</style>
