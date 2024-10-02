# FancyObject Library

A TypeScript utility library for creating objects with enhanced behaviors, including conditional properties, multi-key mappings, and default fallback values.

## Table of Contents

- [FancyObject Library](#fancyobject-library)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Features](#features)
  - [Usage](#usage)
    - [Creating a Fancy Object](#creating-a-fancy-object)
    - [Using `otherwise()`](#using-otherwise)
    - [Adding Conditional Properties with `addIf`](#adding-conditional-properties-with-addif)
    - [Assigning Multiple Keys with `multiKey`](#assigning-multiple-keys-with-multikey)
    - [Accessing Properties Safely with `access`](#accessing-properties-safely-with-access)
  - [Complete Example](#complete-example)
  - [API Reference](#api-reference)
    - [`fancyObject`](#fancyobject)
    - [`otherwise`](#otherwise)
    - [`addIf`](#addif)
    - [`multiKey`](#multikey)
    - [`access`](#access)
  - [Running Tests](#running-tests)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

You can install the library via npm:

```bash
npm install fancy-object
```

Or using yarn:

```bash
yarn add fancy-object
```

Or using pnpm:

```bash
pnpm add fancy-object
```

## Features

- **Fancy Objects**: Create objects that return a default value when accessing undefined properties.
- **Conditional Properties**: Conditionally add properties to objects based on a boolean condition.
- **Multi-Key Mappings**: Assign the same value to multiple keys within an object.
- **TypeScript Support**: Fully typed with type inference for an enhanced developer experience.

## Usage

### Creating a Fancy Object

The `fancyObject` function wraps a plain object and enhances its behavior. If you try to access a property that doesn't exist and an `otherwise` value is defined, it will return that default value.

```typescript
import { fancyObject } from 'fancy-object';

const obj = fancyObject({
  key1: 'value1',
  key2: 'value2',
});

console.log(obj.key1); // Output: 'value1'
console.log(obj.nonExistentKey); // Output: undefined
```

### Using `otherwise()`

The `otherwise()` function allows you to define a default value for any undefined properties accessed on the object.

```typescript
import { fancyObject, otherwise } from 'fancy-object';

const obj = fancyObject({
  key1: 'value1',
  [otherwise()]: 'Default value when key is not found',
});

console.log(obj.key1); // Output: 'value1'
console.log(obj.unknownKey); // Output: 'Default value when key is not found'
```

### Adding Conditional Properties with `addIf`

Use `addIf` to conditionally add properties to your object based on a boolean condition.

```typescript
import { fancyObject, addIf } from 'fancy-object';

const isAdmin = true;

const obj = fancyObject({
  key1: 'value1',
  ...addIf(isAdmin, 'adminPanel', 'Admin Access'),
});

console.log(obj.adminPanel); // Output: 'Admin Access' if isAdmin is true
```

### Assigning Multiple Keys with `multiKey`

The `multiKey` function allows you to assign the same value to multiple keys.

```typescript
import { fancyObject, multiKey } from 'fancy-object';

const obj = fancyObject({
  ...multiKey(['key1', 'key2'], 'shared value'),
});

console.log(obj.key1); // Output: 'shared value'
console.log(obj.key2); // Output: 'shared value'
```

### Accessing Properties Safely with `access`

The `access` function provides a type-safe way to access properties of an object.

```typescript
import { fancyObject, access } from 'fancy-object';

const obj = fancyObject({
  key1: 'value1',
});

console.log(access(obj, 'key1')); // Output: 'value1'
```

## Complete Example

Here's how you can combine these utilities:

```typescript
import { fancyObject, addIf, multiKey, otherwise } from 'fancy-object';

const obj = fancyObject({
  key1: 'value1',
  ...addIf(true, 'key2', 'value2'),
  ...addIf(false, 'key3', 'value3'), // This key will not be added
  ...multiKey(['admin', 'user'], 'multi-user value'),
  [otherwise()]: 'Default value when key is not found',
});

console.log(obj.key1); // Output: 'value1'
console.log(obj.key2); // Output: 'value2'
console.log(obj.key3); // Output: 'Default value when key is not found'
console.log(obj.admin); // Output: 'multi-user value'
console.log(obj.user); // Output: 'multi-user value'
console.log(obj.unknownKey); // Output: 'Default value when key is not found'
```

## API Reference

### `fancyObject`

```typescript
function fancyObject<T extends Record<PropertyKey, any>>(POJO: T): FancyObject<T>
```

- **Description**: Wraps a plain object to provide enhanced behaviors, such as returning a default value for undefined properties if an `otherwise` value is defined.
- **Parameters**:
  - `POJO`: The plain object to enhance.
- **Returns**: An enhanced object with the same properties as `POJO`, and potentially with an index signature if an `otherwise` value is provided.

### `otherwise`

```typescript
function otherwise(): symbol
```

- **Description**: Returns a special symbol used as a key to define a default value in a fancy object.
- **Usage**:

```typescript
const obj = fancyObject({
  key1: 'value1',
  [otherwise()]: 'Default value',
});
```

### `addIf`

```typescript
function addIf<C extends boolean, K extends ObjectKey, V>(
  condition: C,
  key: K,
  value: V
): C extends true ? Record<K, V> : {}
```

- **Description**: Conditionally adds a property to an object based on a boolean condition.
- **Parameters**:
  - `condition`: A boolean determining whether to add the property.
  - `key`: The key of the property to add.
  - `value`: The value of the property to add.
- **Returns**: An object with the property if `condition` is `true`, or an empty object if `false`.

### `multiKey`

```typescript
function multiKey<K extends ObjectKey[], V>(keys: [...K], value: V): Record<K[number], V>
```

- **Description**: Assigns the same value to multiple keys in an object.
- **Parameters**:
  - `keys`: An array of keys.
  - `value`: The value to assign to each key.
- **Returns**: An object mapping each key to the given value.

### `access`

```typescript
function access<O extends object>(fancyObject: O, key: keyof O): O[keyof O]
```

- **Description**: Safely accesses a property in an object, with TypeScript type checking.
- **Parameters**:
  - `fancyObject`: The object to access.
  - `key`: The key of the property to access.
- **Returns**: The value of the property at the given key.

## Running Tests

The library includes a comprehensive test suite. To run the tests, use:

```bash
npm test
```

Ensure you have all the dependencies installed and that you're in the root directory of the project.

## Contributing

Contributions are welcome! If you have suggestions or find bugs, please open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -am 'Add some feature'
   ```

4. Push to the branch:

   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a pull request.

Please make sure to update tests as appropriate.

## License

This project is licensed under the MIT License.