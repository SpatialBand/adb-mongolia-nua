/* @ngInject */
export function UtilsFactory($document) {
  const module = {};

  /**
   *  Checks if an element is currently visible in the viewport
   *
   *  @param {DOM element} element to check for visibility
   *  @returns {boolean} true if the element is currently visible in the viewport
   */
  module.inViewPort = function (element) {
    const height = $document[0].documentElement.clientHeight;
    const width = $document[0].documentElement.clientWidth;
    const r = element[0].getBoundingClientRect();
    return r.top >= 0 && r.bottom <= height && r.left >= 0 && r.right <= width;
  };

  /**
   *  Triggers a callback when a panel snap occurs
   *
   *  @param {DOM element} child element of a panel snap container
   *  @param {function} callback that is called when the panel snaps
   */
  module.onPanelSnap = function (element, callback) {
    while (element.parentElement) {
      element = element.parentElement;
      element.on('panelsnap:finish', event => {
        callback(event);
      });
    }
  };

  return module;
}
