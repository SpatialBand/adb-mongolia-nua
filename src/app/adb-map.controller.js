const L = require('leaflet');

export class ADBMapController {

  constructor($filter, Config, mapId) {
    this.$filter = $filter;
    this.config = Config;
    this.mapId = mapId;
  }

  $onInit() {
    this._setupMap(this.config.map);
  }

  _setupMap(options) {
    const view = options.view;
    const basemap = options.basemaps.default;
    // Make a copy of the Config so we don't actually change it
    const mapOptions = Object.create(basemap.options);
    // Translate the attributions message
    mapOptions.attribution = this.$filter('translate')(mapOptions.attribution);

    this.map = L.map(this.mapId, options.options).setView(view.center, view.zoom);
    this.basemap = L.tileLayer(basemap.url, mapOptions);

    this.map.addLayer(this.basemap);
    this.map.addControl(L.control.zoom({position: 'topright'}));
  }
}
