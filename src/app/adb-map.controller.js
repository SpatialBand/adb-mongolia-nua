const L = require('leaflet');

export class ADBMapController {

  constructor(Config, mapId) {
    this.config = Config;
    this.mapId = mapId;
  }

  $onInit() {
    this._setupMap();
  }

  _setupMap() {
    const view = this.config.map.view;
    const basemap = this.config.map.basemap;
    this.map = L.map(this.mapId, {zoomControl: false}).setView(view.center, view.zoom);
    this.basemap = L.tileLayer(basemap.url, basemap.options);

    this.map.addLayer(this.basemap);
    this.map.addControl(L.control.zoom({position: 'topright'}));
  }
}
