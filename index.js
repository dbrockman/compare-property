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
 * @param a An item to compare.
 * @param b An item to compare.
 * @return A comparison int (-1, 0, 1)
**/
function compareAscending(a, b) {
  return compare(a, b, 1, false);
}

/**
 * Sort in descending order.
 * Ex. [2, 1, 3].sort(descending) // [3, 2, 1]
 * @param a An item to compare.
 * @param b An item to compare.
 * @return A comparison int (-1, 0, 1)
**/
function compareDescending(a, b) {
  return compare(a, b, -1, false);
}

/**
 * Sort in case insensitive ascending order.
 * Ex. ['a', 'B', 'c'].sort(ascendingIgnoreCase) // ['a', 'B', 'c']
 * @param a An item to compare.
 * @param b An item to compare.
 * @return A comparison int (-1, 0, 1)
**/
function compareAscendingIgnoreCase(a, b) {
  return compare(a, b, 1, true);
}

/**
 * Sort in case insensitive descending order.
 * Ex. ['a', 'B', 'c'].sort(descendingIgnoreCase) // ['c', 'B', 'a']
 * @param a An item to compare.
 * @param b An item to compare.
 * @return A comparison int (-1, 0, 1)
**/
function compareDescendingIgnoreCase(a, b) {
  return compare(a, b, -1, true);
}

/**
 * Create function that sorts on a property.
 * Specify sort order as 1 (ascending) or -1 (descending), default is ascending.
 * Ex. ['ab', 'a', 'abc'].sort(property('length')) // ['a', 'ab', 'abc']
 * @param {string} property The string name of the property the array should be sorted on.
 * @param {int} order An optional sort order. 1 for ascending and -1 for descending, default is ascending.
 * @param {boolean} ignoreCase If true any value that is not undefined, null or NaN will be casted to a string and compared ignoring case.
 * @return {Function} A compare function
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
 * @param properties An object with property name as key and sort order as value.
 *   The array is sorted on the properties in the same order as they appear in the object.
 * @param {boolean|Array|Object} ignoreCase If true any value that is not
 *   undefined, null or NaN will be casted to a string and compared ignoring
 *   case. ignoreCase can also be an array of property names or an object with
 *   property name as key and and an ignoreCase bool as value.
 * @return {Function} A compare function
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

/**
 * Compare a property on two objects.
 * @param {object} a An object to compare a property on.
 * @param {object} b An object to compare a property on.
 * @param {string} property The property name.
 * @param {int} order 1 (ascending) or -1 (descending)
 * @param {boolean} ignoreCase
 * @return {int} A comparison int (-1, 0, 1)
 * @private
**/
function compareObjects(a, b, property, order, ignoreCase) {
  if (a && b) {
    return compare(a[property], b[property], order, ignoreCase);
  }
  return a || b ? a ? -1 : 1 : 0;
}

/**
 * Compare two values.
 * @param {*} a An item to compare.
 * @param {*} b An item to compare.
 * @param {int} order 1 (ascending) or -1 (descending)
 * @param {boolean} ignoreCase
 * @return {int} A comparison int (-1, 0, 1)
 * @private
**/
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

/**
 * Check if object is not NaN, null or undefined.
 * @param {*} a An object to inspect.
 * @return {boolean} false if object is NaN, null or undefined, else true.
 * @private
**/
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
