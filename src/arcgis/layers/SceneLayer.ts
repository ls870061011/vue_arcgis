/**
 * @module arcgis/SceneLayer
 */

import Config from '../Config';

/**
 * @classdesc
 * 场景图层类
 *
 * @api
 */
class SceneLayer {
  /**
   *
   * @param {Object} options
   *
   * @constructor
   * @alias SceneLayer
   */
  constructor(options: any) {
    Object.setPrototypeOf(this, new Config.constructors.SceneLayer(options));
  }
}

export default SceneLayer;
