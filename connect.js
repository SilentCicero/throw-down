var components = require("./components"), observer = require("./index")

function connect (el, l, u, m) {
  el.dataset.tdid = "id" + parseInt(Math.random() * 10000000)
  components[el.dataset.tdid] = {
    node: el, added: (l || function() {}),
    mutated: (m || function() {}), removed: (u || function() {})
  }
  return el
}

module.exports = connect
