var react = require('react')
var reactdom = require('react-dom');
var hyperx = require('hyperx')
var hx = hyperx(react.createElement)

var connect = require('./components/store').connect
var AddTodo = require('./components/AddTodo')(connect)
var VisibleTodoList = require('./components/VisibleTodoList')(connect)
var Footer = require('./components/Footer')(connect)


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
