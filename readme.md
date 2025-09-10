# JavaScript ES6 Concepts

This README covers some important JavaScript ES6 concepts and their usage.

---

## 1) Difference between `var`, `let`, and `const`

- var
  - Function-scoped.
  - Can be redeclared and updated.
  - Hoisted to the top of the function scope with `undefined`.

- let
  - Block-scoped.
  - Can be updated but not redeclared in the same scope.
  - Not hoisted in the same way as `var`.

- const
  - Block-scoped.
  - Cannot be updated or redeclared.
  - Must be initialized during declaration.
  - Objects/arrays declared with `const` can have their properties/elements changed, but the reference cannot be reassigned.

---

## 2) Difference between `map()`, `forEach()`, and `filter()`

- forEach()
  - Iterates over an array and executes a function for each element.
  - Does **not** return a new array.

- map()
  - Iterates over an array and returns a **new array** with transformed elements.

- filter()
  - Iterates over an array and returns a **new array** with elements that satisfy a condition.

---

## 3) Arrow Functions in ES6

- Concise syntax for writing functions.
- **Do not have their own `this`**, `arguments`, `super`, or `new.target`.
---

## 4) Destructuring Assignment in ES6

- Allows unpacking values from arrays or objects into separate variables.
- Array Destructuring
- Object Destructuring

## 5) Template Literals in ES6

- Template literals allow embedding expressions and multi-line strings.
- Difference from string concatenation

## 6) Default Parameters in ES6

- Allows setting default values for function parameters.

- Helps avoid undefined if no argument is passed.
