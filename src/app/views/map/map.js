const cartodb = require('cartodb');
const L = require('leaflet');

import {ADBMapController} from '../../adb-map.controller';

class MapViewController extends ADBMapController {
  /** @ngInject */
  constructor($filter, $log, Config) {
    super($filter, Config, 'map');
    this.$log = $log;
  }

  $onInit() {
    super.$onInit();

    this.activeTab = 'people';
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
        layer.setZIndex(10);
        this.activeLayer = layer;
      });
  }

  _setupMap(options) {
    super._setupMap(options);

    this._setupMapControls(options);

    // Activate the default visualization
    const peopleSection = this.config.mapSections.people;
    this._setActiveVis(peopleSection.visualizations[0]);
  }

  _setupMapControls(options) {
    const basemaps = {};
    for (const basemap of options.basemaps.alternative) {
      // Make a copy of the Config so we don't actually change it
      const mapOptions = Object.create(basemap.options);
      // Translate the attributions message
      mapOptions.attribution = this.$filter('translate')(mapOptions.attribution);

      const title = this.$filter('translate')(basemap.title);
      basemaps[title] = L.tileLayer(basemap.url, mapOptions);
    }

    const defaultBasemap = this.$filter('translate')(options.basemaps.default.title);
    basemaps[defaultBasemap] = this.basemap;

    const layerControl = L.control.layers(basemaps, {}, {
      position: "topleft", collapsed: false, autoZIndex: false});

    for (const overlay of options.overlays) {
      const url = this._visUrlForId(overlay.id);
      cartodb.createLayer(this.map, url, {https: true})
        .done(layer => {
          layer.setZIndex(overlay.zIndex);
          const title = this.$filter('translate')(overlay.title);
          layerControl.addOverlay(layer, title);
        });
    }

    this.map.addControl(layerControl);
  }

  _visUrlForId(visId) {
    return `https://${this.config.carto.accountName}.carto.com/api/v2/viz/${visId}/viz.json`;
  }
}

export const adbMapView = {
  templateUrl: 'app/views/map/map.html',
  controller: MapViewController
};
