var components = require("./components"), observer = null

function walk (n, v) {
  v(n); for (var i = 0; i < n.childNodes.length; i++) {walk(n.childNodes[i], v)}
}

if (window && window.MutationObserver) {
  var observer = new MutationObserver(function (mutations) {
    for (var x = 0; x < mutations.length; x++) {
      var i, m = mutations[x], t = m.target
      if(m.attributeName == "data-tdid") {
        components[m.oldValue].removed(m.target)
        delete components[m.oldValue]
      }
      if(t.dataset && t.dataset.tdid) {
        components[t.dataset.tdid].node = t
        components[t.dataset.tdid][m.attributeName == "data-tdid" && "added" || "mutated"](t)
      }
      for (i = 0; i < m.addedNodes.length; i++) {
        walk(m.addedNodes[i], function(n){
          if(!n.dataset) return; if(!n.dataset.tdid) return
          components[n.dataset.tdid].node = n
          components[n.dataset.tdid].added(n)
        })
      }
      for (i = 0; i < m.removedNodes.length; i++) {
        walk(m.removedNodes[i], function(n){
          if(!n.dataset) return; if(!n.dataset.tdid) return
          components[n.dataset.tdid].removed(n)
          delete components[m.oldValue]
        })
      }
    }
  })
  observer.observe(document.body, {childList: 1, subtree: 1, attributes: 1, attributeOldValue: 1})
}

module.exports = observer
