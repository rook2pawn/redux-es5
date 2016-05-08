var redux = require('../')
var react = require('react')
var toString = require('react-dom/server').renderToString;
var reactdom = require('react-dom');
var hyperx = require('hyperx')
var hx = hyperx(react.createElement)

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

var combineReducers = redux.combineReducers;
var todoApp = combineReducers({
  todos:todos,
  visibilityFilter:visibilityFilter
});
var createStore = redux.createStore;
var store = createStore(todoApp)
var Component = react.Component;
var nextTodoId = 0;
var myinput;

/*
class TodoApp extends Component {
  render() {
    return hx`<div><div>
      <input ref=${function(node) {
        myinput = node 
      }} />
      <button onClick=${function() {
        store.dispatch({
          type:'ADD_TODO',
          text:myinput.value,
          id:nextTodoId++
        });
        myinput.value = '';
      }}> Add Todo</button>
    </div>
    <ul>
      ${this.props.todos.map(function(todo) {
        return hx`<li key=${todo.id}>${todo.text}</li>`
      })}
    </ul>
    </div>`
  }
}
*/
var Factory = react.createFactory(TodoApp)
var render = function() {
  var root = Factory({todos:store.getState().todos})
  reactdom.render(root, document.querySelector('#content'))
}
store.subscribe(render)
render()
