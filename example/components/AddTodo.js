var react = require('react')
var hyperx = require('hyperx')
var hx = hyperx(react.createElement)

var AddTodoComponent = function(connect) {
  var nextTodoId = 0;
  var myinput;
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
  return AddTodo
}
module.exports = exports = AddTodoComponent;
