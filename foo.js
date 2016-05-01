var hyperx = require('hyperx');

var Todo = function (onClick, completed, text) {
  return 
}
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
