// Configuration for the National section of the app
export const NationalConfig = {
  // Configuration to map the columns in the Carto source table to references in the client app
  metadata: {
    // Carto table name to pull data from, this table should exist in the account
    //  defined in config.js
    table: 'soums',
    // Field mapping of Carto table column field to internal object key
    // Update field if the Carto table column names change
    fields: [{
      field: 'soum',
      key: 'soum_name'
    }, {
      field: 'aimag',
      key: 'aimag_name'
    }]
  },
  // Configuration for the map at /#!/national/map
  map: {
    // List of basemaps to display in the map layer picker
    // The 'default' key is required
    // the 'alternative' key should be an array of zero or more objects
    // Each object provided to this configuration should have the form:
    //  url: http://leafletjs.com/reference-0.7.7.html#url-template
    //  title: Title of basemap in layer picker. Supports translation keys.
    //  options: http://leafletjs.com/reference-0.7.7.html#tilelayer-options
    basemaps: {
      default: {
        url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        title: 'MAP_DEFAULT_TITLE',
        options: {
          attribution: 'MAP_OSM_ATTRIBUTION',
          maxZoom: 19
        }
      },
      alternative: [{
        url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        title: 'MAP_ARCGIS_WORLD_TOPO_MAP_TITLE',
        options: {
          attribution: 'MAP_ARCGIS_WORLD_TOPO_MAP_ATTRIBUTION',
          maxZoom: 19
        }
      }, {
        url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        title: 'MAP_ARCGIS_WORLD_IMAGERY_TITLE',
        options: {
          attribution: 'MAP_ARCGIS_WORLD_IMAGERY_ATTRIBUTION',
          maxZoom: 19
        }
      }]
    },
    // Optional user-toggleable Carto visualizations added to the layer picker.
    // Each object in the array should have the following keys:
    //  id: The Carto visualization id
    //  title: Title for the layer picker. Supports translation keys.
    //  zIndex: Visualizations with higher numbers will render on top of ones with lower numbers.
    overlays: [{
      id: '6626851e-6f8c-11e6-a376-0ee66e2c9693',
      title: 'MAP_CLUSTERS_TITLE',
      zIndex: 102
    }, {
      id: '256705a8-6f8c-11e6-b205-0e233c30368f',
      title: 'MAP_ROADWAYS_TITLE',
      zIndex: 101
    }, {
      id: '834fd12c-6f8c-11e6-b15b-0ee66e2c9693',
      title: 'MAP_SETTLEMENTS_TITLE',
      zIndex: 103
    }],
    // The Leaflet map options, should be of the form described here:
    //  http://leafletjs.com/reference-0.7.7.html#map-options
    options: {
      zoomControl: false
    },
    // The default starting view of the map
    //  center: [lat, lng]
    //  zoom: integer
    view: {
      center: [46.8625, 103.8467],
      zoom: 5
    }
  },
  // mapSections configures the visualizations to display
  // The top-level keys for this object, e.g. 'people', 'households', etc should not be
  //  changed. There are a few hard-coded references to some of these throughout the application.
  // Each of the top-level objects for mapSections are of the form:
  //  title: Title for map section. Supports translation keys.
  //  icon: Icon class to use for the icon in the section sidebar switcher
  //  table: The Carto dataset that data for this visualization is pulled from
  //  visualizations: Array of objects of the form:
  //    id: Carto visualization id
  //    field: The Carto dataset field that this visualization is displaying
  //    title: Title for this visualization. Supports translation keys.
  //    isChange: true if this visualization describes a change over time. Default: false.
  //    isPercent: true if this visualization describes a percentage. Default: false.
  mapSections: {
    people: {
      title: 'PEOPLE_HEADER',
      icon: 'icon-group',
      table: 'soums',
      visualizations: [{
        id: 'a98489e1-9e4f-4858-b900-f01b10c62461',
        field: 'pop14',
        title: 'MAP_VIZ_POP'
      }, {
        id: '4351188e-54e2-11e6-9e3b-0e3ebc282e83',
        field: 'pchn9514',
        title: 'MAP_VIZ_POP_CHANGE',
        isChange: true
      }, {
        id: '8682cd34-54e5-11e6-8a4c-0e3ebc282e83',
        field: 'sh14',
        title: 'MAP_VIZ_POP_SHARE',
        isPercent: true
      }, {
        id: '7a5a3225-0df6-475e-9aed-b8bc9ca76319',
        field: 'shch9514',
        title: 'MAP_VIZ_POP_SHARE_CHANGE',
        isChange: true,
        isPercent: true
      }, {
        id: 'd48fb3da-54e9-11e6-bd9f-0ecd1babdde5',
        field: 'den14',
        title: 'MAP_VIZ_POP_DENSITY'
      }]
    },
    households: {
      title: 'HOUSEHOLDS_HEADER',
      icon: 'icon-household',
      table: 'soums',
      visualizations: [{
        id: '174eb7cc-cc92-449b-9773-e3d5aab64e41',
        field: 'hh14',
        title: 'MAP_VIZ_HSHD_COUNT'
      }, {
        id: '6319865d-63cc-4700-b21c-a71597acf649',
        field: 'chnhh614',
        title: 'MAP_VIZ_HSHD_COUNT_CHANGE',
        isChange: true
      }, {
        id: '87e33054-54f1-11e6-aa75-0ee66e2c9693',
        field: 'hhh14',
        title: 'MAP_VIZ_HRDR_HSHD_COUNT'
      }, {
        id: '83ce9698-8481-4ef9-8f3c-4efed0c372de',
        field: 'hpc14',
        title: 'MAP_VIZ_HRDR_HSHD_PCT',
        isPercent: true
      }, {
        id: 'e179f47f-7a0d-4c03-b1fc-b9cd1b7e7820',
        field: 'chhpc0613',
        title: 'MAP_VIZ_HRDR_HSHD_PCT_CHANGE',
        isChange: true,
        isPercent: true
      }]
    },
    economy: {
      title: 'ECONOMY_HEADER',
      icon: 'icon-economy',
      table: 'soums',
      visualizations: [{
        id: 'accdffb8-54f4-11e6-af54-0e233c30368f',
        field: 'ent14',
        title: 'MAP_VIZ_ECON_ENTERPRISE_COUNT'
      }, {
        id: '358c1220-5501-11e6-9e3b-0e3ebc282e83',
        field: 'ent0014',
        title: 'MAP_VIZ_ECON_ENTERPRISE_COUNT_CHANGE',
        isChange: true
      }, {
        id: '3f12a98a-06c6-4d3e-a027-8d14038a7c26',
        field: 'man14',
        title: 'MAP_VIZ_ECON_MANUFACTURING_COUNT'
      }, {
        id: 'dbc52e98-55a5-11e6-871e-0e05a8b3e3d7',
        field: 'chman0014',
        title: 'MAP_VIZ_ECON_MANUFACTURING_COUNT_CHANGE',
        isChange: true
      // }, {
      //   id: '',
      //   field: 'pcpov11',
      //   title: 'MAP_VIZ_ECON_POVERTY_PCT',
      //   isPercent: true
      }, {
        id: '9adf865a-337a-4960-8f1d-2bd0c6420f56',
        field: 'chpcpov11',
        title: 'MAP_VIZ_ECON_POVERTY_PCT_CHANGE',
        isChange: true,
        isPercent: true,
        reverseColor: true
      }, {
        id: '9de67942-55a5-11e6-b640-0e3ff518bd15',
        field: 'sdi',
        table: 'sdi',
        title: 'MAP_VIZ_ECON_SDI'
      }]
    },
    infrastructure: {
      title: 'INFRASTRUCTURE_HEADER_SHORT',
      icon: 'icon-industrial',
      table: 'soums',
      visualizations: [{
        id: '9db8a964-559a-11e6-9426-0e3ff518bd15',
        field: 'pcger10',
        title: 'MAP_VIZ_INFR_GER_PCT',
        isPercent: true
      }, {
        id: '0389f50a-55a4-11e6-b115-0e3ff518bd15',
        field: 'pcsan10',
        title: 'MAP_VIZ_INFR_INDOOR_SANITATION_PCT',
        isPercent: true
      }, {
        id: '9156764d-1ff2-49ed-bd4c-1266d26fa9dd',
        field: 'pcwat10',
        title: 'MAP_VIZ_INFR_PIPED_WATER_PCT',
        isPercent: true
      }, {
        id: '370ec9b6-55a2-11e6-9cb6-0ee66e2c9693',
        field: 'pcsw10',
        title: 'MAP_VIZ_INFR_SOLID_WASTE_DISPOSAL_PCT',
        isPercent: true
      }, {
        id: '8e51eb57-e463-4e83-9802-9a6fedc8a1fc',
        field: 'pcint10',
        title: 'MAP_VIZ_INFR_INTERNET_ACCESS_PCT',
        isPercent: true
      }]
    }
  },
  // charts allows for limited configuration of the histograms displayed at /#!/national/data/:soumId
  charts: {
    histograms: {
      // These keys should match the top-level keys of the mapSections object
      people: {
        // The Carto dataset column to chart
        field: 'den14',
        // The chart title. Supports translation keys.
        title: 'HISTOGRAM_PEOPLE_TITLE'
      },
      households: {
        field: 'hh14',
        title: 'HISTOGRAM_HOUSEHOLDS_TITLE'
      },
      economy: {
        field: 'ent14',
        title: 'HISTOGRAM_ECONOMY_TITLE'
      },
      infrastructure: {
        field: 'pcwat10',
        title: 'HISTOGRAM_INFRASTRUCTURE_TITLE'
      }
    },
    // Default histogram chart height
    height: 150,
    // Width is dynamically detected from page state, should be left as 'undefined'
    width: undefined,
    // Callouts are the vertical bars representing specific values
    // The country, cluster and soum keys are to match the SoumData.compare response,
    // which gives averaged values for metrics at the country, cluster and soum levels.
    callouts: {
      country: {
        // Label to display. Supports translation keys.
        label: 'COUNTRY_LEGEND_LABEL',
        // Color for this metric. Should be a hex value.
        color: '#323349'
      },
      cluster: {
        label: 'CLUSTER_LEGEND_LABEL',
        color: '#B58554'
      },
      soum: {
        // Overriden by the Soum's name, this label should be left as undefined
        label: undefined,
        color: '#0066b3'
      }
    },
    // Default chart fill color. Should be a hex value.
    fillColor: '#ddd'
  }
};
