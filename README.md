# array-if-then-else

> If a specific value is in an Array Then it returns a value - Else it returns a different value

## Install

```
$ npm install array-if-then-else
```

## Usage

Use a primitive value or an object instance to determine if a value is in an array.

Match

```js
const arrayIfThenElse = require('array-if-then-else');

const bat = { name: 'Quasel' };
const args = ['node', 'isDebug', bat];

// Choose value depending on the contents of an array
const resultSimple = arrayIfThenElse(args, 'isDebug', 4001, 4000);
//=> 4001

// Choose value depending on the contents of an array
const resultObject = arrayIfThenElse(args, bat, 4001, 4000);
//=> 4001
```

No-Match

```js
const arrayIfThenElse = require('array-if-then-else');

const bat = { name: 'Quasel' };
const args = ['node', bat];

// Choose value depending on the contents of an array
const resultSimple = arrayIfThenElse(args, 'isDebug', 4001, 4000);
//=> 4000

// Choose value depending on the contents of an array
// primitive check will only check object references but not content
const resultSimple = arrayIfThenElse(args, { name: 'Quasel' }, 4001, 4000);
//=> 4000
```

Instead of a primitive value a callback may be used to determine if a specific value is in the array.

```js
const arrayIfThenElse = require('array-if-then-else');

const bat = { name: 'Quasel' };
const args = ['node', 'isDebug', bat];

// Choose value depending on the contents of an array
const usePort = arrayIfThenElse(args, item => item === 'isDebug', 4001, 4000);
//=> 4001

// Choose value depending on the contents of an array
const usePort = arrayIfThenElse(args, item => item.name === 'Quasel', 4001, 4000);
//=> 4001
```

## API

### arrayIfThenElse(array, searchElementOrCallback, thenValue, elseValue)

Binds methods in `self` to their class instance.

#### array

Type: `Array<any>`

The array to be searched for the searched value.

#### searchElementOrCallback

Type: `string | number | bool | function of type: (in: any) => boolean`

The primitive value to search in the array or the callback to call for every item in the array. The array is iterated until the callback returns true or until the end of the array.

#### thenValue

Type: `any`

Returned value on match

#### elseValue

Type: `any`

Returned value if no match

## License

MIT
