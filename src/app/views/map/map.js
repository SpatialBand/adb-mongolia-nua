const cartodb = require('cartodb');
const L = require('leaflet');

import {ADBMapController} from '../../adb-map.controller';

L.Control.ZoomToDropdown = L.Control.extend({
  options: {
    label: 'Zoom to',
    default: 'Zoom to...',
    position: 'topright',
    choices: []
  },

  // Using the arrow shorthand clobbers "this", so we need to use the old way
  onAdd: function (map) {
    this.map = map;

    const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
    const label = L.DomUtil.create('label', '', container);
    this.dropdown = L.DomUtil.create('select', '', container);

    this._reflowChoices();

    label.innerHTML = this.options.label;

    return container;
  },

  setChoices: function (choices) {
    this.options.choices = choices;
    this._reflowChoices();
  },

  _reflowChoices: function () {
    if (!this.dropdown) {
      return;
    }
    this.dropdown.removeEventListener('change', this.onSelect);

    // Remove all child elements
    while (this.dropdown.firstChild) {
      this.dropdown.removeChild(this.dropdown.firstChild);
    }

    // Add the default option
    this._createOption(this.options.default, undefined);
    this.dropdown.selectedIndex = 0;

    // Add the choices as options id'd by the key
    for (let i = 0; i < this.options.choices.length; i++) {
      const choice = this.options.choices[i];
      this._createOption(choice.label, i);
    }

    // Re-add event listener
    this.dropdown.addEventListener('change', this.onSelect.bind(this));
  },

  _createOption: function (label, id, selected) {
    const option = L.DomUtil.create('option', '', this.dropdown);
    option.innerHTML = label;
    option.id = id;
  },

  onSelect: function (event) {
    const key = this.dropdown.options[this.dropdown.selectedIndex].id;
    const geojson = this.options.choices[key].the_geom;
    if (geojson) {
      const geometry = L.geoJson(JSON.parse(geojson));
      this.map.fitBounds(geometry);
    }
  }
});

class MapViewController extends ADBMapController {
  /** @ngInject */
  constructor($filter, $log, AimagData, Config) {
    super($filter, Config, 'map');
    this.$log = $log;
    this.AimagData = AimagData;
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
    this._setupZoomDropdown(options);

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

  _setupZoomDropdown() {
    this.zoomControl = new L.Control.ZoomToDropdown({
      label: 'Zoom to Aimag'
    });

    this.AimagData.list().then(data => {
      this.zoomControl.setChoices(data.rows);
    });

    this.map.addControl(this.zoomControl);
  }

  _visUrlForId(visId) {
    return `https://${this.config.carto.accountName}.carto.com/api/v2/viz/${visId}/viz.json`;
  }
}

export const adbMapView = {
  templateUrl: 'app/views/map/map.html',
  controller: MapViewController
};
