var redux = require('../')

var todo = function(state,action) {
  switch (action.type) {
    case 'ADD_TODO' :
      return {
        id: action.id,
        text: action.text,
        completed:false
      }
      break;
      case 'TOGGLE_TODO' :
        if (state.id !== action.id) {
          return state
        }
        return {
          type: state.type,
          id : state.id,
          text: state.text,
          completed: !state.completed
        }
      break;
      default:
        return state
      break;
  }
}
var todos = function(state, action) {
  if (state === undefined) 
    state = []
  switch (action.type) {
    case 'ADD_TODO': 
      return state.concat(todo(undefined,action))
    break;
    case 'TOGGLE_TODO' :
      return state.map(function(t) {
        return todo(t,action) 
      })
    break;
    default:
      return state;
  }
}

var visibilityFilter = function(state, action) {
  if (state === undefined) 
    state = 'SHOW_ALL'
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    break;
    default:
      return state
  }
}

var todoApp = function(state, action) {
  if (state === undefined)
    state = {}
  return {
    todos: todos(state.todos,action),
    visibilityFilter: visibilityFilter(state.visibilityFilter,action)
  }
}
var createStore = redux.createStore;
var store = createStore(todoApp)

console.log('Initial state:');
console.log(store.getState());
console.log('---------------')

console.log('Dispatching ADD_TODO');
store.dispatch({
  type:'ADD_TODO',
  id: 0,
  text:'Learn Redux'
});
console.log('Current state:');
console.log(store.getState());
console.log('---------------')



console.log('Dispatching ADD_TODO');
store.dispatch({
  type:'ADD_TODO',
  id: 1,
  text:'Go Shopping'
});
console.log('Current state:');
console.log(store.getState());
console.log('---------------')



console.log('Dispatching TOGGLE_TODO');
store.dispatch({
  type:'TOGGLE_TODO',
  id: 0
});
console.log('Current state:');
console.log(store.getState());
console.log('---------------')


console.log('Dispatching SET_VISIBILITY_FILTER')
store.dispatch({
  type:'SET_VISIBILITY_FILTER',
  filter:'SHOW_COMPLETED'
});
console.log('Current state:');
console.log(store.getState());
console.log('---------------')
