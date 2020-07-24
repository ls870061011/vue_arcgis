/**
 * @module arcgis/Map
 */

import Config from './Config';

/**
 * @classdesc
 * 地图类
 *
 * @api
 */
class Map {
  /**
   *
   * @param {Object} options
   *
   * @constructor
   * @alias Map
   */
  constructor(options: any) {
    // super(options);
    // Object.setPrototypeOf(Map.prototype, new Config.modules.Map(options));
    Object.setPrototypeOf(this, new Config.modules.Map(options));
  }
}
export default Map;
