/**
 * @module arcgis/LayerList
 */

import Config from '../Config';

/**
 * @classdesc
 * 场景视图类
 *
 * @api
 */
class LayerList {
  /**
   *
   * @param {Object} options
   *
   * @constructor
   * @alias LayerList
   */
  constructor(options: any) {
    Object.setPrototypeOf(this, new Config.modules.LayerList(options));
  }
}

export default LayerList;
