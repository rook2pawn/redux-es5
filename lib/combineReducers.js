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
module.exports = exports = combineReducers;
