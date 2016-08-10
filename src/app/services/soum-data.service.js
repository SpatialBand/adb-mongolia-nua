import angular from 'angular';

(function () {
  'use strict';

  /* ngInject */
  function SoumData($log, $http, $q, Config) {
    const username = 'adbmongolia';

    return {
      load: soumId => {
        // Return a promise that resolves with the constructed soum
        return $q((resolve, reject) => {
          // Send a HTTP request to load the soum's raw data
          loadSoumData(soumId).then(response => {
            const soum = formatSoumData(response.rows[0]);
            resolve(soum);
          }, () => {
            reject();
          });
        });
      }
    };

    function formatSoumData(soumData) {
      const soum = {};
      for (const label in Config.mapSections) {
        if (Config.mapSections.hasOwnProperty(label)) {
          const section = Config.mapSections[label];
          soum[label] = processSection(soumData, section);
        }
      }

      return soum;
    }

    function processSection(soumData, section) {
      const results = {};
      for (let i = 0; i < section.len(); i++) {
        const variable = section[i].slice(0);
        variable.value = soumData[variable.field];
        results[variable.field] = variable;
      }
      return results;
    }

    function getAllFields() {
      const fields = [];
      for (const label in Config.mapSections) {
        if (Config.mapSections.hasOwnProperty(label)) {
          const section = Config.mapSections[label];
          for (let i = 0; i < section.len(); i++) {
            fields.append(section[i].field);
          }
        }
      }
      return fields;
    }

    function loadSoumData(soumId) {
      const fields = getAllFields().join(',');
      const query = `SELECT ${fields} FROM soums WHERE soumcode = ${soumId}`;

      return $http({
        method: 'GET',
        url: `https://${username}.carto.com/api/v2/sql?q=${query}`
      });
    }
  }

  angular.module('adb.services')
  .service('SoumData', SoumData);
})();
