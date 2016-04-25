## throw-down | life cycle hooks for pure DOM elements

Make pure DOM components with a reliable life cycle.

```
npm install --save throw-down
```

- works with yoyo/bel/vanilla DOM elements
- unopinionated, can be used with any DOM framework
- extremely tiny, weighs only `473 bytes` min+gz
- helper methods are isolated in separate modules
- allows DOM elements/components to have onload/onunload/onupdate hooks

### why?

Keeping track of a specific DOM node/element/component during DOM morphing is hard. `throw-down` makes it really easy. It provides life cycle hooks for your DOM components, so you can track of the life of the component as the DOM is morphed. Just `connect` your DOM component, and keep an eye on it with simple hooks that fire when the component is `loaded`, `unloaded` or `updated`. That's it!

### modules

The modules shipped with `throw-down`

```js
const observer = require("throw-down") // the new MutationObserver
const connect = require("throw-down/connect")
const retrieve = require("throw-down/retrieve")
const update = require("throw-down/update")(yo.update) // yoyo/morphdom helper
```

### example

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

    function onunload (node) {
    }

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


### method breakdown

Here is a breakdown of the methods shipped with `throw-down`

#### (1) connect

Connects the DOM element target to `throw-down`

**Parameters**

-   `element` **Object** the pure DOM element you want to track
-   `added` **Function** fired when the target DOM element is loaded
-   `removed` **Function** fired when the target DOM element is removed
-   `mutated` **Function** fired when the target DOM element is mutated

Returns **Object** the DOM element with the `dataset-tdid` tracker

#### (2) retrieve

Retrieve the DOM element from the components cache

**Parameters**

-   `id` **String** the `throw-down` element ID

Returns **Object** - the cached `throw-down` component

#### (3) update

A morphdom/yoyo update helper that transports the `throw-down` ID from the input element to the other

**Parameters**

-   `morphdom` **Function** either the `morphdom` or `yo.update` methods

Returns **Function** the update method `update(el, newEl, opts)`

### note on component mutation

When you mutate your DOM element/component make sure you transport the `node.dataset.tdid` to the newly morphed component. Checkout the `./update.js` for more information.

### MutationObserver

`throw-down` uses the window MutationObserver to track DOM mutation

Support for MutationObserver can be tracked here:
http://caniuse.com/#search=MutationObserver

Global `86.4%` browser support

### throw-down?

`throw-down` was inspired by the great work done by @maxogden on yoyo, `throw-down`
is the name of a yoyo trick =D

### story

https://github.com/maxogden/yo-yo/issues/15
