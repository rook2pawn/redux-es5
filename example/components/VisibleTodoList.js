var react = require('react')
var hyperx = require('hyperx')
var hx = hyperx(react.createElement)

var VisibleTodoListComponent = function(connect) {
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
  return VisibleTodoList
}
module.exports = exports = VisibleTodoListComponent;
