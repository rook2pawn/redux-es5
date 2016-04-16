var store = require('../createStore')
var test = require('tape')


test('check that store defers default state to the reducer', function(t) {
  t.plan(1)
  var reducer = function(state,action) {
    if (state === undefined) {
      state = []
    }
    switch (action.type) {
      default:
        return state;
      break;
    }
  }
  t.deepEquals(store(reducer).getState(),[])
})
