/**
 * @module arcgis/SceneView
 */

import Config from './Config';

/**
 * @classdesc
 * 场景视图类
 *
 * @api
 */
class SceneView {
  /**
   *
   * @param {Object} options
   *
   * @constructor
   * @alias SceneView
   */
  constructor(options: any) {
    Object.setPrototypeOf(this, new Config.modules.SceneView(options));
  }
}

export default SceneView;
