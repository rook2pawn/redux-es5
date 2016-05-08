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

var getVisibleTodos = function(todos,filter) {
  switch (filter) {
    case 'SHOW_ALL' :
      return todos
    case 'SHOW_COMPLETED' :
      return todos.filter(function(t) { return t.completed })
    case 'SHOW_ACTIVE' :
      return todos.filter(function(t) { return !t.completed })
    default:
      break;
  }
}
var FilterLink = react.createClass({
  render: function() {
    var that = this;
    if (this.props.filter === this.props.currentFilter) {
      return hx`<span>${this.props.children}</span>`
    }
    return hx`<a href='#' onClick=${ function(e) {
    e.preventDefault();
    store.dispatch({
      type:'SET_VISIBILITY_FILTER',
      filter:that.props.filter
    })}}>${this.props.children}</a>`;
  }
})

var nextTodoId = 0;
var myinput;
var TodoApp = react.createClass({
  render : function() {
    var visibleTodos = getVisibleTodos(this.props.todos,this.props.visibilityFilter);
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
      ${visibleTodos.map(function(todo) {
        return hx`<li key=${todo.id} onClick=${function() {
          store.dispatch({
            type:'TOGGLE_TODO',
            id:todo.id
          })
         }} style=${{textDecoration:todo.completed ? 'line-through':'none'}}>${todo.text}</li>`
      })}
    </ul>
    Show ${' '} 
    ${react.createElement(FilterLink,{filter:'SHOW_ALL',children:'All',currentFilter:this.props.visibilityFilter})}
    ${react.createElement(FilterLink,{filter:'SHOW_ACTIVE',children:'Active',currentFilter:this.props.visibilityFilter})}
    ${react.createElement(FilterLink,{filter:'SHOW_COMPLETED',children:'Completed',currentFilter:this.props.visibilityFilter})}
    </div>`
  }
});

var render = function() {
  reactdom.render(react.createElement(TodoApp, {
    todos:store.getState().todos,
    visibilityFilter:store.getState().visibilityFilter
  }),document.querySelector('#content'))
}
store.subscribe(render)
render()
