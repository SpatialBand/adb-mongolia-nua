export const dataConfig = {
  national: {
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
        icon: 'icon-bus',
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
        icon: 'icon-briefcase',
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
        icon: 'icon-book',
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
    charts: {
      histograms: {
        people: {
          field: 'den14',
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
      height: 150,
      width: undefined, // Width is dynamically detected from page state
      callouts: { // Callouts are the vertical bars representing specific values
        // The country, cluster and soum keys are to match the SoumData.compare response,
        // which gives averaged values for metrics at the country, cluster and soum levels.
        country: {
          label: 'COUNTRY_LEGEND_LABEL',
          color: '#323349'
        },
        cluster: {
          label: 'CLUSTER_LEGEND_LABEL',
          color: '#B58554'
        },
        soum: {
          label: undefined, // Overriden by the Soum's name
          color: '#0066b3'
        }
      },
      fillColor: '#ddd'
    }
  },
  ulaanbaatar: {
    mapSections: {
      people: {
        title: 'PEOPLE_HEADER',
        icon: 'icon-group',
        table: 'khoroos',
        visualizations: [{
          id: 'ed837029-3d95-45b0-9218-2f2a236a094f',
          field: 'pop_2015',
          title: 'MAP_VIS_UB_POP'
        }, {
          id: 'b1812f9c-2099-45e8-b7f5-79118b43cd0d',
          field: 'PCHN1115',
          title: 'MAP_VIS_UB_POP_CHANGE'
        }, {
          id: '45c85583-f054-449f-b814-17bffa3f4209',
          field: 'DENS15',
          title: 'MAP_VIS_UB_POP_DENSITY'
        }, {
          id: '8452a599-6f91-482d-8efc-2ced847de329',
          field: 'P05_15PC',
          title: 'MAP_VIS_UB_POP_PCT_ZERO_FIVE'
        }, {
          id: '6fe91905-9d85-43ff-8db5-7fb244d91642',
          field: 'P615_15PC',
          title: 'MAP_VIS_UB_POP_PCT_SIX_EIGHTEEN'
        }, {
          id: 'fd9d9aa8-3a94-4221-8df3-1b6f114354d2',
          field: 'P60_15PC',
          title: 'MAP_VIS_UB_POP_PCT_SIXTY_PLUS'
        }, {
          id: '4c7c765a-8b1b-11e6-b919-0ee66e2c9693',
          field: 'P60CH',
          title: 'MAP_VIS_UB_POP_PCT_CHANGE_SIXTY_PLUS'
        }, {
          id: '00a6deeb-0db4-4d2c-a986-e7cd78c8cb2a',
          field: 'KINDCHN',
          title: 'MAP_VIS_UB_CHANGE_KINDERGARTEN'
        }, {
          id: '05fd9fe2-75a1-4222-b0bc-7b298487ae84',
          field: 'SCHCHN',
          title: 'MAP_VIS_UB_CHANGE_PRIMARY'
        }]
      },
      households: {
        title: 'HOUSEHOLDS_HEADER',
        icon: 'icon-bus',
        table: 'khoroos',
        visualizations: [{
          id: '6418ee08-8667-4724-9092-d44c08d86894',
          field: 'HH15',
          title: 'MAP_VIS_UB_HSHD_COUNT'
        }, {
          id: '0631c3cf-4579-492e-af88-991b9d789575',
          field: 'POORHHCHN',
          title: 'MAP_VIS_UB_POOR_HSHD_COUNT_CHANGE'
        }, {
          id: 'd019728c-106a-4754-b239-91098c9eb089',
          field: 'POORHHPC',
          title: 'MAP_VIS_UB_POOR_HSHD_PCT'
        }]
      },
      employment: {
        title: 'EMPLOYMENT_HEADER',
        icon: 'icon-briefcase',
        table: 'khoroos',
        visualizations: [{
          id: 'f6f40227-3702-4bbf-88f1-fb552b78c7be',
          field: 'P1959CHN',
          title: 'MAP_VIS_UB_CHANGE_WORK_AGE'
        }, {
          id: '0297f17f-8981-488c-ad91-f66556a129e9',
          field: 'P1959_15PC',
          title: 'MAP_VIS_UB_PCT_WORKING_AGE'
        }, {
          id: '00ec43b7-cdb5-4483-aaa1-0a634f857e25',
          field: 'EMPCHN',
          title: 'MAP_VIS_UB_CHANGE_EMPLOYMENT'
        }, {
          id: 'afceb9da-4509-4cfa-84dc-488112b96371',
          field: 'UNEMCHN',
          title: 'MAP_VIS_UB_CHANGE_UNEMPLOYMENT'
        }]
      }
    },
    charts: {
      histograms: {}
    }
  }
};
