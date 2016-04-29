"use strict"; // es6 enabled

var components = require("./components"), update = require("./update")

class Component {
  constructor (props) {
    this.props = props
    components[props._id] = {
      state: {}
    }
    this.update = update(this.props._morphdom)
  }

  _mount () {
    this.mount = true;
  }

  setState (state) {
    Object.assign(components[this.props._id].state, state)
    if(this.mount && this.shouldComponentUpdate()) this.update(this.props._id, this.render())
  }

  getState () {
    return components[this.props._id]
  }

  componentDidMount () {
  }

  componentDidUpdate () {
  }

  componentDidUnmount () {
  }

  shouldComponentUpdate () {
    return true
  }
}

module.exports = Component
