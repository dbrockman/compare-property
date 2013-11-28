# Array sort compare util

```
npm install compare-property
```

## exports.ascending

Sort in ascending order.

```
[2, 1, 3].sort(ascending) // [1, 2, 3]
```

## exports.descending

Sort in descending order.

```
[2, 1, 3].sort(descending) // [3, 2, 1]
```

## exports.property

Create function that sorts on a property.
Specify sort order as 1 (ascending) or -1 (descending), default is ascending.

```
['ab', 'a', 'abc'].sort(property('length', -1)) // ['abc', 'ab', 'a']
```

## exports.properties

Create function that sorts on multiple properties.
Specify sort order as 1 (ascending) or -1 (descending), default is ascending.

```
people.sort(properties({ age: -1, surname: 1 })) // Sort by oldest first and secondly on surname A to Z
```

## exports.compare

Compare a property on two objects in specified order.

```
var ascending = 1;
var descending = -1;
compare({ key: 1 }, { key: 2 }, 'key', ascending); // -1
compare({ key: 1 }, { key: 2 }, 'key', descending); // 1
```
