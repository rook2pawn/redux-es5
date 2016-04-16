var combineReducers = function(reducers) {
  return function(state,action) {
    if (state == undefined) {
      state = {}
    }
    return Object.keys(reducers)
      .reduce(function(nextState,key) {
        nextState[key] = reducers[key](state[key],action)
        return nextState;
      },{})
  }
}
exports.combineReducers = combineReducers;

var createStore = function(reducer) {
  var state;
  var listeners = [];
  var getState = function () {
    return state
  }
  var dispatch = function(action) {
    state = reducer(state,action)
    listeners.forEach(function(listener) {
      listener();
    })
  }
  var subscribe = function(listener) {
    listeners.push(listener)
  }
  dispatch({})
  return {getState:getState,dispatch:dispatch,subscribe:subscribe}
}
module.exports = exports = createStore;
