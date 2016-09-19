const L = require('leaflet');

export function ZoomToDropdownFactory() {
  return L.Control.extend({
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

    _createOption: function (label, id) {
      const option = L.DomUtil.create('option', '', this.dropdown);
      option.innerHTML = label;
      option.id = id;
    },

    onSelect: function () {
      const key = this.dropdown.options[this.dropdown.selectedIndex].id;
      const geojson = this.options.choices[key].the_geom;
      if (geojson) {
        const geometry = L.geoJson(JSON.parse(geojson));
        this.map.fitBounds(geometry);
      }
    }
  });
}
