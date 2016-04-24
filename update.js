var retrieve = require("./retrieve")

function update (morphdom) {
  return function main (el, newEl, opts) {
    el = typeof el === "string" && retrieve(el).node || el
    newEl.dataset.tdid = el.dataset.tdid
    morphdom(el, newEl, opts)
  }
}

module.exports = update
