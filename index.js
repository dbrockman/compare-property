exports.ascending            = compareAscending;
exports.descending           = compareDescending;
exports.ascendingIgnoreCase  = compareAscendingIgnoreCase;
exports.descendingIgnoreCase = compareDescendingIgnoreCase;

exports.property             = compareProperty;
exports.properties           = compareProperties;

exports.compare              = compare;
exports.compareObjects       = compareObjects;


/**
 * Sort in ascending order.
 * Ex. [2, 1, 3].sort(ascending) // [1, 2, 3]
**/
function compareAscending(a, b) {
  return compare(a, b, 1, false);
}

/**
 * Sort in descending order.
 * Ex. [2, 1, 3].sort(descending) // [3, 2, 1]
**/
function compareDescending(a, b) {
  return compare(a, b, -1, false);
}

/**
 * Sort in case insensitive ascending order.
 * Ex. ['a', 'B', 'c'].sort(ascendingIgnoreCase) // ['a', 'B', 'c']
**/
function compareAscendingIgnoreCase(a, b) {
  return compare(a, b, 1, true);
}

/**
 * Sort in case insensitive descending order.
 * Ex. ['a', 'B', 'c'].sort(descendingIgnoreCase) // ['c', 'B', 'a']
**/
function compareDescendingIgnoreCase(a, b) {
  return compare(a, b, -1, true);
}

/**
 * Create function that sorts on a property.
 * Specify sort order as 1 (ascending) or -1 (descending), default is ascending.
 * Ex. ['ab', 'a', 'abc'].sort(property('length')) // ['a', 'ab', 'abc']
**/
function compareProperty(property, order, ignoreCase) {
  return function (a, b) {
    return compareObjects(a, b, property, order, ignoreCase);
  };
}

/**
 * Create function that sorts on multiple properties.
 * Specify sort order as 1 (ascending) or -1 (descending), default is ascending.
 * Ex. people.sort(properties({ age: -1, surname: 1 })) // Sort by oldest first and secondly on surname A to Z
**/
function compareProperties(properties, ignoreCase) {
  var keys = Object.keys(properties);
  properties = copy(keys, properties);
  ignoreCase = ignoreCase === true
    ? copy(keys)
    : Array.isArray(ignoreCase)
      ? copy(ignoreCase)
      : ignoreCase
        ? copy(Object.keys(ignoreCase), ignoreCase)
        : {};

  return function (a, b) {
    var c = 0, i = 0, p;
    for (; !c && i < keys.length; i++) {
      p = keys[i];
      c = compareObjects(a, b, p, properties[p], ignoreCase[p]);
    }
    return c;
  };
}

function compareObjects(a, b, property, order, ignoreCase) {
  if (a && b) {
    return compare(a[property], b[property], order, ignoreCase);
  }
  return a || b ? a ? -1 : 1 : 0;
}

function compare(a, b, order, ignoreCase) {
  var c, hasA = isValue(a), hasB = isValue(b);
  if (hasA && hasB) {
    if (ignoreCase) {
      a = String(a).toLowerCase();
      b = String(b).toLowerCase();
    }
    c = a < b ? -1 : a > b ? 1 : 0;
    return (order === -1) ? -c : c;
  }
  return hasA || hasB ? hasA ? -1 : 1 : 0;
}

function isValue(o) {
  if (typeof o === 'number') {
    return !isNaN(o);
  }
  // not null and not undefined
  return o != null;
}

/**
 * Copy an array of strings to a new object and set value from source object or true.
 * @param {Array.<string>} keys Array of strings.
 * @param {Object} src Source object.
 * @return {Object}
 * @private
**/
function copy(keys, src) {
  var map = {}, i = 0, key;
  for (; i < keys.length; i++) {
    key = keys[i];
    map[key] = src ? src[key] : true;
  }
  return map;
}
