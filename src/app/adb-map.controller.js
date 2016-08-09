const L = require('leaflet');

export class ADBMapController {

  constructor(Config, mapId) {
    this.config = Config;
    this.mapId = mapId;
  }

  $onInit() {
    this._setupMap(this.config.map);
  }

  _setupMap(options) {
    const view = options.view;
    const basemap = options.basemap;
    this.map = L.map(this.mapId, options.options).setView(view.center, view.zoom);
    this.basemap = L.tileLayer(basemap.url, basemap.options);

    this.map.addLayer(this.basemap);
    this.map.addControl(L.control.zoom({position: 'topright'}));
  }
}
