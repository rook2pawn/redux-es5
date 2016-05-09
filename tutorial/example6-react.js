var redux = require('../')
var react = require('react')
var toString = require('react-dom/server').renderToString;
var reactdom = require('react-dom');
var hyperx = require('hyperx')
var hx = hyperx(react.createElement)
var createStore = redux.createStore;

var nextTodoId = 0;
var myinput;

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
var store = createStore(todoApp)
// end of model layer

//view layer
var connect = redux.connect(store);


var AddTodo = react.createClass({
  render: function() {
    var that = this;
    return hx`<div>
      <input ref=${function(node) {
        myinput = node 
      }} />
      <button onClick=${function() {
        that.props.dispatch({
          type:'ADD_TODO',
          id:nextTodoId++,
          text:myinput.value
        })
        myinput.value='';
      }}> Add Todo </button>
    </div>`
  }
})  
AddTodo = connect(null, null)(AddTodo);


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
var Todo = react.createClass({
  render: function() { 
    var that = this;
    return hx`<li onClick=${that.props.onClick}
    style=${{textDecoration:that.props.completed ? 'line-through':'none'}}>${this.props.text}</li>`
  }
})
var TodoList = react.createClass({
  render: function() {
    var that = this;
    return hx`<ul>
    ${this.props.todos.map(function(todo) {
      return react.createElement(Todo,{
        onClick:function() { 
          that.props.onTodoClick(todo.id);
        },
        completed:todo.completed,
        text:todo.text
      })
    })}
    </ul>`
  } 
})
var mapStateToProps = function(state) {
  return {
    todos: getVisibleTodos(state.todos,state.visibilityFilter)
  }
}
var mapDispatchToProps = function(dispatch) {
  return {
    onTodoClick: function(id) {
      dispatch({
          type:'TOGGLE_TODO',
          id:id
      })
    }
  }
}
var VisibleTodoList = connect(mapStateToProps,mapDispatchToProps)(TodoList)




var Link = react.createClass({
  render: function() {
    var that = this;
    if (this.props.active) {
      return hx`<span>${this.props.children}</span>`
    }
    return hx`<a href='#' onClick=${ function(e) {
    e.preventDefault();
    that.props.onClick();
    }}>${this.props.children}</a>`;
  }
})
var FilterLink = connect(function(state,ownProps) {
  return {
    active : (ownProps.filter === state.visibilityFilter),
    children : ownProps.children
  }
},function(dispatch,ownProps) {
  return {
    onClick: function() {
      dispatch({
        type:'SET_VISIBILITY_FILTER',
        filter:ownProps.filter
      })
    }
  }
})(Link)
var Footer = react.createClass({
  render: function() {
    return hx`<div>${react.createElement(FilterLink,{filter:'SHOW_ALL',children:'All'})}
    ${react.createElement(FilterLink,{filter:'SHOW_ACTIVE',children:'Active'})}
    ${react.createElement(FilterLink,{filter:'SHOW_COMPLETED',children:'Completed'})}</div>`
  }
})

var TodoApp = react.createClass({
  render : function() {
    return hx`<div>
    ${react.createElement(AddTodo)}
    ${react.createElement(VisibleTodoList)}
    Show ${' '} 
    ${react.createElement(Footer)}
    </div>`
  }
});

reactdom.render(react.createElement(TodoApp),document.querySelector('#content'))
