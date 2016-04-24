var components = require("./components"), observer = null

function walkChildren (n, v) {
  v(n); for (var i = 0; i < n.childNodes.length; i++) walkChildren(n.childNodes[i], v)
}

if (window && window.MutationObserver) {
  observer = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      var m = mutations[i], x
      if(m.target.dataset && m.target.dataset.tdid) {
        components[m.target.dataset.tdid].node = m.target
        components[m.target.dataset.tdid].mutated(m.target)
      }
      for (x = 0; x < m.addedNodes.length; x++) {
        walkChildren(m.addedNodes[x], function(n){
          if(!n.dataset) return; if(!n.dataset.tdid) return
          components[n.dataset.tdid].node = n
          components[n.dataset.tdid].added(n)
        });
      }
      for (x = 0; x < m.removedNodes.length; x++) {
        walkChildren(m.removedNodes[x], function(n){
          if(!n.dataset) return; if(!n.dataset.tdid) return
          components[n.dataset.tdid].removed(n)
        });
      }
    }
  })
  observer.observe(document.body, {childList: true, subtree: true})
}

module.exports = observer
