[![Build Status](https://travis-ci.org/dbrockman/compare-property.png?branch=master)](https://travis-ci.org/dbrockman/compare-property)

# Array sort compare util

This module contains functions that can be used with `Array.prototype.sort`.

```
npm install compare-property
```

### Example

```js
var compare = require('compare-property');
[2, 1, 3].sort(compare.ascending) // [1, 2, 3]
```

----------------------------------------

### ascending(a, b)

Sort in ascending order.

```js
[2, 1, 3].sort(compare.ascending) // [1, 2, 3]
```

----------------------------------------

### descending(a, b)

Sort in descending order.

```js
[2, 1, 3].sort(compare.descending) // [3, 2, 1]
```

----------------------------------------

### ascendingIgnoreCase(a, b)

Sort in case insensitive ascending order.

```js
['a', 'B', 'c'].sort(compare.ascendingIgnoreCase) // ['a', 'B', 'c']
```

----------------------------------------

### descendingIgnoreCase(a, b)

Sort in case insensitive descending order.

```js
['a', 'B', 'c'].sort(compare.descendingIgnoreCase) // ['c', 'B', 'a']
```

----------------------------------------

### property(property, order, ignoreCase)

Create function that sorts on a property.
Specify sort order as 1 (ascending) or -1 (descending), default is ascending.

__Arguments__

* property - The string name of the property the array should be sorted on.
* order - An optional sort order. 1 for ascending and -1 for descending, default is ascending.
* ignoreCase - If true any value that is not undefined, null or NaN will be casted to a string and compared ignoring case.

```js
var fn = compare.property('length', -1);
['ab', 'a', 'abc'].sort(fn) // ['abc', 'ab', 'a']
```

----------------------------------------

### properties(properties, ignoreCase)

Create function that sorts on multiple properties.
Specify sort order as 1 (ascending) or -1 (descending), default is ascending.

__Arguments__

* properties - An object with property name as key and sort order as value. The array is sorted on the properties in the same order as they appear in the object.
* ignoreCase - If true any value that is not undefined, null or NaN will be casted to a string and compared ignoring case. ignoreCase can also be an array of property names or an object with property name as key and and an ignoreCase bool as value.

```js
var fn = compare.properties({ age: -1, name: 1 }, ['name']);
people.sort(fn);
// The people array will now be sorted on age from oldest to youngest.
// People with the same age will be sorted on name from A to Z ignoring case.
```
