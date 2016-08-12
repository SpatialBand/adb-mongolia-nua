const cartodb = require('cartodb');

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
        this.activeLayer = layer;
      });
  }

  _setupMap(options) {
    super._setupMap(options);

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
