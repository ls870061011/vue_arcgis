<template>
  <div id="sceneViewer" class="scene-viewer"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import EsriAPI from '@/arcgis/EsriAPI';

@Component
export default class SceneView extends Vue {
  @Prop() private msg!: string;

  mounted() {
    EsriAPI.init('sceneViewer');
  }
}
</script>

<style scoped lang="scss">
.scene-viewer {
  height: 100%;
}
</style>
