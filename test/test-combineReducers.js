var combineReducers = require('../combineReducers')
var deepFreeze = require('deep-freeze')
var test = require('tape')

test('combine reducer gives default state', function(t) {
  t.plan(1);
  var reducer = function(state,action) {
    if (state === undefined) {
      state = []
    }
    switch (action.type) {
      default:
        return state;
      break;
    }
  };
  var reducer2 = function(state,action) {
    if (state === undefined) {
      state = 0
    }
    switch (action.type) {
      default:
        return state;
      break;
    }
  };
  var app = combineReducers({
    foo : reducer,
    bar : reducer2 
  });
  var stateBefore = {foo:undefined,bar:undefined};
  var action = {};
  var stateAfter = {foo:[],bar:0};
  deepFreeze(stateBefore)
  deepFreeze(action)

  t.deepEquals(app(stateBefore, action),stateAfter)
})
test('combine reducer follows a non default action', function(t) {
  t.plan(2);
  var reducer = function(state,action) {
    if (state === undefined) {
      state = []
    }
    switch (action.type) {
      case 'ADD_ITEM' : 
        return state.concat(action.item)
      break; 
      case 'INCR_ITEM' :
        return state
          .slice(0,action.id)
          .concat([state[action.id]+1])
          .concat(state.slice(action.id+1))
      break;
      default:
        return state;
      break;
    }
  }
  var app = combineReducers({
    foo : reducer
  })

  var stateBefore = {foo:undefined};
  var action = {type:'ADD_ITEM', item:4};
  var stateAfter = {foo:[4]};
  deepFreeze(stateBefore)
  deepFreeze(action)
  t.deepEquals(app(stateBefore,action), stateAfter);


  var stateBefore2 = {foo:[3,7,5,11,13]}
  var action2 = {type:'INCR_ITEM', id:3};
  var stateAfter2 = {foo:[3,7,5,12,13]};
  deepFreeze(stateBefore2)
  deepFreeze(action2)
  t.deepEquals(app(stateBefore2,action2), stateAfter2);
})
