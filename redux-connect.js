var components = require("throw-down/components"), subscriptions = {}

function shallowEqual(objA, objB) {
  if (objA === objB) return true

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) return false

  // Test for A's keys different from B.
  const hasOwn = Object.prototype.hasOwnProperty
  for (var i = 0; i < keysA.length; i++)
    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]])
      return false

  return true
}

function connect (store, _connect, _update) {
  if(!subscriptions["listening"]) {
    subscriptions["listening"] = true
    store.subscribe(function(){
      var subscriptionIds = Object.keys(subscriptions),
          state = store.getState(), i

      for(i = 0; i < subscriptionIds.length; ++i) {
        if(subscriptionIds[i] !== "listening") {
          var subscription = subscriptions[subscriptionIds[i]],
              newState = subscription.mapStateToProps(state)

          if(!shallowEqual(newState, subscription.state)) {
            subscription.state = newState
            subscription.update()
          }
        }
      }
    })
  }

  return function main (mapStateToProps, mapDispatchToProps) {
    mapStateToProps = mapStateToProps || function (state) {return state}
    mapDispatchToProps = mapDispatchToProps || function (action) {return action}

    return function connectOverride (render, construct, loaded, mutated, unloaded) {
      function constructOverride (_id) {
        subscriptions[_id] = {
          mapStateToProps: mapStateToProps,
          state: mapStateToProps(store.getState()),
          update: function () {
            _update(_id, render())
          }
        }

        return construct(_id, {
          dispatch: function (action) {
            return store.dispatch(mapDispatchToProps(action))
          },
          getState: function () {
            return subscriptions[_id].state
          }
        })
      }

      function unloadedOverride (node) {
        delete subscriptions[node.dataset.tdid]
        return unloaded(node)
      }

      return _connect(render, constructOverride, loaded, mutated, unloadedOverride)
    }
  }
}

module.exports = connect
