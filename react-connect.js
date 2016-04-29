var components = require("./components"), observer = require("./index")

function connect (morphdom) {
  return function main(ComponentClass) {
    return function(props, _children){
      props = props || {}
      props._id = "a" + parseInt(Math.random() * 10000000)
      props._morphdom = morphdom
      props.children = _children || ""
      var comp = new ComponentClass(props)
      var el = comp.render()
      el.dataset.tdid = props._id
      components[props._id] = {
        node: el,
        state: components[props._id].state,
        added: function(){this._mount(); this.componentDidMount()}.bind(comp),
        mutated: comp.componentDidUpdate.bind(comp),
        removed: comp.componentDidUnmount.bind(comp)
      }
      return el
    }
  }
}

module.exports = connect
