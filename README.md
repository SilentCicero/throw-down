# throw-down.js

A tiny library for building pure modular DOM components with a reliable life cycle.

```
npm install --save throw-down
```

## Features

 - Unopinionated, can be used with any DOM framework
 - Build your own helper methods as each are isolated in separate modules
 - Works well with yoyo/bel/vanilla DOM elements
 - Uses features available in browsers today instead of inventing new syntax/APIs
 - Allows DOM elements/components to have `load`/`unload`/`update` hooks
 - Compatible with vanilla DOM elements and vanilla JS data structures
 - Zero dependencies, doesn't require tons of dev dependencies
 - `0.4kb` minified + gzipped, small enough for UI components to include as a dependency

## About

Keeping track of a specific DOM node/element/component during DOM morphing is hard. `throw-down` makes it really easy. It provides life cycle hooks for your DOM components, so you can track of the life of the component as the DOM is morphed. Just `connect` your DOM component, and keep an eye on it with simple hooks that fire when the component is `loaded`, `unloaded` or `updated`. That's it!

## Example

Used with the <a href="https://github.com/maxogden/yo-yo/">yoyo</a> UI framework

```js
const yo = require("yo-yo")
const connect = require("throw-down/connect")
const update = require("throw-down/update")(yo.update)

const Component = function(_yield) {
    var id, open

    function onload (node) {
      id = node.dataset.tdid
    }

    function onupdate (node) {
      id = node.dataset.tdid
    }

    function onunload (node) {}

    function toggle () {
      open = !open
      update(id, render(_yield))
    }

    function render (_yield) {
      return yo`<div><button onclick=${toggle}>Toggle</button> ${open && "Open!" || "Closed!"} ${_yield}</div>`
    }

    return connect(render(_yield), onload, onunload, onupdate)
}

document.body.appendChild(Component(Component()));
```

Without using `throw-down` ID's

```js
const yo = require("yo-yo")
const connect = require("throw-down/connect")
const update = require("throw-down/update")(yo.update)

const Component = function(_yield) {
    var el, open

    function track (node) {
      el = node
    }

    function toggle () {
      open = !open
      update(el, render(_yield))
    }

    function render (_yield) {
      return yo`<div><button onclick=${toggle}>Toggle</button> ${open && "Open!" || "Closed!"} ${_yield}</div>`
    }

    return connect(render(_yield), track, null, track)
}

document.body.appendChild(Component());
```

Here we are just keeping track of the components target element while the DOM is morphing.

## Installing

You can get it <a href="https://www.npmjs.com/package/throw-down">from npm</a>: `npm install --save throw-down`

## API

The API methods shipped with `throw-down` -- 3 methods in total

```js
const connect = require("throw-down/connect")
const retrieve = require("throw-down/retrieve")
const update = require("throw-down/update")(yo.update) // yoyo/morphdom helper
```

### (1) connect

Connects the DOM element target to `throw-down`

**Parameters**

-   `element` **Object** the pure DOM element you want to track
-   `added` **Function** fired when the target DOM element is loaded
-   `removed` **Function** fired when the target DOM element is removed
-   `mutated` **Function** fired when the target DOM element is mutated

Returns **Object** - the DOM element with the `dataset-tdid` tracker

### (2) retrieve

Retrieve the DOM element from the components cache

**Parameters**

-   `id` **String** the `throw-down` element ID

Returns **Object** - the cached `throw-down` component

### (3) update

A morphdom/yoyo update helper that transports the `throw-down` ID from the input element to the other

**Parameters**

-   `morphdom` **Function** either the `morphdom` or `yo.update` methods

Returns **Function** - the update method `update(el, newEl, opts)`

## Component mutation

When you mutate your DOM element/component make sure you transport the `node.dataset.tdid` to the newly morphed component. Checkout the `./update.js` for more information.

## Compatibility/MutationObserver

`throw-down` uses the window.MutationObserver to track DOM mutation

Support for MutationObserver can be tracked here:
http://caniuse.com/#search=MutationObserver

Global `86.4%` browser support

## Modules that work well with throw-down

`throw-down` helps compliment other module systems such as:

 - yoyo - a tiny library for building modular UI components (uses bel/morphdom)
 - bel - creates DOM elements from template strings
 - morphdom - efficiently morphs DOM elements (without a virtual DOM)
 - hyperx - tagged template string virtual dom builder

## "throw-down"?

The name `throw-down` was inspired by the great work done by @maxogden on yoyo, `throw-down` is the name of a yoyo trick.

## Story

https://github.com/maxogden/yo-yo/issues/15

## License

```
The MIT License (MIT)

Copyright (c) 2016 Nick Dodson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
