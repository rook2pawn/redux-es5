var createStore = require('../lib/createStore');
var combineReducers = require('../lib/combineReducers');
var test = require('tape');


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
  t.deepEquals(createStore(reducer).getState(),[])
})


test('getState - dispatch test', function(t) {
  t.plan(3)
  var reducer = function(state,action) {
    if (state === undefined) {
      state = []
    }
    switch (action.type) {
      case 'ADD_ITEM' : 
        return state.concat([action.val])
      break;
      default:
        return state;
      break;
    }
  }
  var store = createStore(reducer);
  t.deepEquals(store.getState(),[])
  store.dispatch({type:'ADD_ITEM', val:3})
  t.deepEquals(store.getState(), [3])  
  store.dispatch({type:'ADD_ITEM', val:5})
  t.deepEquals(store.getState(), [3,5])  
})




test('getState - dispatch test with combineReducers', function(t) {
  var reducer = function(state,action) {
    if (state === undefined) {
      state = []
    }
    switch (action.type) {
      case 'ADD_ITEM' : 
        return state.concat([action.val])
      break;
      default:
        return state;
      break;
    }
  }
  var reducer2 = function(state,action) {
    if (state === undefined) {
      state = 0
    }
    switch (action.type) {
      case 'INCR' : 
        return state+1;
      break;
      case 'DOUBLE' : 
        return state*2;
      break;
      default:
        return state;
      break;
    }
  }
  var store = createStore(combineReducers({list:reducer,number:reducer2}))
  t.deepEquals(store.getState(),{list:[],number:0})
  store.dispatch({type:'ADD_ITEM', val:3})
  store.dispatch({type:'ADD_ITEM', val:7})
  store.dispatch({type:'INCR'})
  store.dispatch({type:'INCR'})
  store.dispatch({type:'DOUBLE'})
  t.deepEquals(store.getState(),{list:[3,7],number:4})
  t.end()
})
