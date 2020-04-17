<template>
  <div class="main-container">
    <SceneView msg="Welcome to this map" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SceneView from '@/components/SceneView.vue';

@Component({
  name: 'Home',
  components: {
    SceneView,
  },
})
export default class Home extends Vue {}
</script>

<style scoped lang="scss">
.main-container {
  height: 100%;
}
</style>
