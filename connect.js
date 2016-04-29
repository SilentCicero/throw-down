var components = require("./components"), observer = require("./index")

function connect (el, c, l, m, r) {
  var id = "a" + parseInt(Math.random() * 10000000), f = function(){}
  c && c(id); el = el()
  el.dataset.tdid = id
  components[id] = {
    node: el, added: (l || f), mutated: (m || f), removed: (r || f)
  }
  return el
}

module.exports = connect
