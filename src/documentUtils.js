/**
 * Checks the item is not missed or messed
 * @param {object|string[]|Element[]|HTMLElement|string} elem - element
 * @returns {boolean} true if element is correct
 * @private
 */
function _isNotMissed(elem) {
  return (!(elem === undefined || elem === null));
}

/**
 * Create DOM element with set parameters
 * @param {string} tagName - Html tag of the element to be created
 * @param {string[]} cssClasses - Css classes that must be applied to an element
 * @param {object} attrs - Attributes that must be applied to the element
 * @param {Element[]} children - child elements of creating element
 * @returns {HTMLElement} the new element
 */
export function create(tagName, cssClasses = null, attrs = null, children = null) {
  const elem = document.createElement(tagName);

  if (_isNotMissed(cssClasses)) {
    for (let i = 0; i < cssClasses.length; i++) {
      if (_isNotMissed(cssClasses[i])) {
        elem.classList.add(cssClasses[i]);
      }
    }
  }
  if (_isNotMissed(attrs)) {
    for (let key in attrs) {
      elem.setAttribute(key, attrs[key]);
    }
  }
  if (_isNotMissed(children)) {
    for (let i = 0; i < children.length; i++) {
      if (_isNotMissed(children[i])) {
        elem.appendChild(children[i]);
      }
    }
  }
  return elem;
}

/**
 * Get item position relative to document
 * @param {HTMLElement} elem - item
 * @returns {{x1: number, y1: number, x2: number, y2: number}} coordinates of the upper left (x1,y1) and lower right(x2,y2) corners
 */
export function getCoords(elem) {
  const rect = elem.getBoundingClientRect();

  return {
    y1: rect.top + window.pageYOffset,
    x1: rect.left + window.pageXOffset,
    x2: rect.right + window.pageXOffset,
    y2: rect.bottom + window.pageYOffset
  };
}

/**
 * Recognizes the side of the containe where (x,y)  is closer
 * @param {{x1: number, y1: number, x2: number, y2: number}} coords - coords of container
 * @param x - x coord
 * @param y - y coord
 * @return {string}
 */
export function getSideByCoords(coords, x, y) {
  let side;

  if (x - coords.x1 >= -1 && x - coords.x1 <= 11) {
    side = 'left';
  }
  if (coords.x2 - x >= -1 && coords.x2 - x <= 11) {
    side = 'right';
  }
  if (y - coords.y1 >= -1 && y - coords.y1 <= 11) {
    side = 'top';
  }
  if (coords.y2 - y >= -1 && coords.y2 - y <= 11) {
    side = 'bottom';
  }

  return side;
}