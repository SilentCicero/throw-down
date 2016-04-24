## life cycle hooks for pure DOM elements

Make pure DOM components with a reliable life cycle.

```
npm install --save throw-down
```

- works with yoyo/bel/vanilla DOM elements
- unopinionated, can be used with any DOM framework
- extremely tiny, weighs only `473 bytes` min+gz
- helper methods are isolated in separate modules

### modules

The modules exported with `throw-down`

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
