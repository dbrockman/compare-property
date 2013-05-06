exports.ascending  = compare_ascending;
exports.descending = compare_descending;
exports.property   = compare_property;
exports.properties = compare_properties;

/**
Sort in ascending order.
Ex. [2, 1, 3].sort(ascending) // [1, 2, 3]
**/
function compare_ascending(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
}

/**
Sort in descending order.
Ex. [2, 1, 3].sort(descending) // [3, 2, 1]
**/
function compare_descending(a, b) {
  return a > b ? -1 : a < b ? 1 : 0;
}

/**
Create function that sorts on a property.
Specify sort order as 1 (ascending) or -1 (descending), default is ascending.
Ex. ['ab', 'a', 'abc'].sort(property('length')) // ['a', 'ab', 'abc']
**/
function compare_property(property, order) {
  return function (a, b) {
    return _compare_property(a, b, property, -1 === order);
  };
}

/**
Create function that sorts on multiple properties.
Specify sort order as 1 (ascending) or -1 (descending), default is ascending.
Ex. people.sort(properties({ age: -1, surname: 1 })) // Sort by oldest first and secondly on surname A to Z
**/
function compare_properties(properties) {
  var keys   = Object.keys(properties)
    , length = keys.length
    , order  = []
    , i      = 0;

  for (; i < length; i++)
    order[i] = -1 === properties[keys[i]];

  return function (a, b) {
    var c = 0
      , i = 0;

    for (; !c && i < length; i++)
      c = _compare_property(a, b, keys[i], order[i]);

    return c;
  };
}

function _compare_property(a, b, property, descending) {
  var c;
  if (a && b) {
    a = a[property];
    b = b[property];
    c = a > b ? 1 : a < b ? -1 : 0;
  } else {
    c = a || b ? a ? 1 : -1 : 0;
  }
  return descending ? -c : c;
}
