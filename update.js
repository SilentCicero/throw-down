var components = require("./components"), retrieve = require("./retrieve")

function main (morphdom) {
  return function update (el, newEl, opts) {
    el = typeof el === "string" && retrieve(el).node || el
    newEl.dataset.tdid = el.dataset.tdid
    morphdom(el, newEl, opts)
  }
}

module.exports = main
