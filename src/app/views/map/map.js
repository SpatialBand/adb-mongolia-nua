const L = require('leaflet');
const cartodb = require('cartodb');

class MapViewController {
  /** @ngInject */
  constructor($log, Config) {
    this.$log = $log;
    this.config = Config;
  }

  $onInit() {
    this.activeTab = 'people';
    this._setupMap();
  }

  onVisSelected(vis) {
    this.$log.debug('selected vis:', vis);
    this._setActiveVis(vis);
  }

  tabClicked($event, tabId) {
    this.activeTab = tabId;
    const section = this.config.mapSections[tabId];
    if (section.visualizations.length) {
      this._setActiveVis(section.visualizations[0]);
    }
  }

  _setActiveVis(vis) {
    if (this.activeVis && vis.id === this.activeVis.id) {
      return;
    }
    const url = this._visUrlForId(vis.id);
    if (this.activeLayer) {
      this.map.removeLayer(this.activeLayer);
      this.activeLayer.remove();
      this.activeLayer = null;
    }
    this.activeVis = vis;
    return cartodb.createLayer(this.map, url, {https: true})
      .addTo(this.map)
      .done(layer => {
        this.activeLayer = layer;
      });
  }

  _setupMap() {
    this.map = L.map('map', {zoomControl: false}).setView([46.8625, 103.8467], 5);
    this.basemap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      maxZoom: 19
    });
    this.map.addLayer(this.basemap);
    this.map.addControl(L.control.zoom({position: 'topright'}));

    const peopleSection = this.config.mapSections.people;
    this._setActiveVis(peopleSection.visualizations[0]);
  }

  _visUrlForId(visId) {
    return `https://${this.config.carto.accountName}.carto.com/api/v2/viz/${visId}/viz.json`;
  }
}

export const adbMapView = {
  templateUrl: 'app/views/map/map.html',
  controller: MapViewController
};
