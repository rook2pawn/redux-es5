[![Build Status](https://travis-ci.org/rook2pawn/redux-es5.svg?branch=master)](https://travis-ci.org/rook2pawn/redux-es5)

redux-es5
=========

Redux, with just es5. The tutorial directory lists many examples. 

  * [tutorial/example0.js](../master/tutorial/example0.js) - shows a demonstration of the redux-es5 store with a manual overall reducer
  * [tutorial/example1.js](../master/tutorial/example1.js)  - shows the same thing but utilizes the redux-es5 combineReducers
  * [tutorial/example1-react.js](../master/tutorial/example1-react.js)  - shows the view layer as expressed as React without JSX while still rendering via fully fledged React Components utilizing [hyperx](https://github.com/substack/hyperx)
  * [tutorial/example1-react-withoutClass.js](../master/tutorial/example1-react-withoutClass.js) - same thing as example1-react but utilizing the polyfill equivalent for es6 extends.
  * [tutorial/example2-react.js](../master/tutorial/example2-react.js) - Adds clicking on an item to mark it as completed.
  * [tutorial/example3-react.js](../master/tutorial/example3-react.js) - Adds a filter to show All, show active, and show completed.
  * [tutorial/example4-react.js](../master/tutorial/example4-react.js) - Refactor demonstrating nested classes and presentational components.
  * [tutorial/example5-react.js](../master/tutorial/example4-react.js) - Refactor demonstrating more separation of container and presentational components.

You can open the corresponding html pages (e.g. [tutorial/index-example4.html](../master/tutorial/index-example4.html) )in the tutorial to see it in action. Precompiled with [browserify](https://github.com/substack/browserify)

Example
=======
*taken from [tutorial/example5-react.js](../master/tutorial/example5-react.js)*



    var redux = require('redux-es5')
    var react = require('react')
    var toString = require('react-dom/server').renderToString;
    var reactdom = require('react-dom');
    var hyperx = require('hyperx')
    var hx = hyperx(react.createElement)

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

    var FilterLink = react.createClass({
      componentDidMount:function() {
        var that = this;
        this.unsubscribe = store.subscribe(function() {
          that.forceUpdate()
        })
      },
      comonentWillUnmount:function() {
        this.unsubscribe();
      },
      render: function() {
        var props = this.props;
        var state = store.getState();
        return hx`${react.createElement(Link, {
          active:(props.filter===state.visibilityFilter),
          onClick:function() {
            store.dispatch({
              type:'SET_VISIBILITY_FILTER', 
              filter:props.filter
            })
          },
          children:props.children})}`
      }
    })


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

    var AddTodo = react.createClass({
      render: function() {
        var that = this;
        return hx`<div>
          <input ref=${function(node) {
            myinput = node 
          }} />
          <button onClick=${function() {
            store.dispatch({
              type:'ADD_TODO',
              id:nextTodoId++,
              text:myinput.value
            })
            myinput.value='';
          }  
        })}
            that.props.onAddClick(myinput.value);
          }}> Add Todo</button>
        </div>`
      }
    })  
    var Footer = react.createClass({
      render: function() {
        return hx`<div>${react.createElement(FilterLink,{filter:'SHOW_ALL',children:'All'})}
        ${react.createElement(FilterLink,{filter:'SHOW_ACTIVE',children:'Active'})}
        ${react.createElement(FilterLink,{filter:'SHOW_COMPLETED',children:'Completed'})}</div>`
      }
    })

    var VisibleTodoList = react.createClass({
      componentDidMount:function() {
        var that = this;
        this.unsubscribe = store.subscribe(function() {
          that.forceUpdate()
        })
      },
      comonentWillUnmount:function() {
        this.unsubscribe();
      },
      render: function() {
        var props = this.props;
        var state = store.getState();
        return hx`${react.createElement(TodoList,{
          todos:getVisibleTodos(state.todos,state.visibilityFilter),
          onTodoClick:function(id) {
            store.dispatch({
              type:'TOGGLE_TODO',
              id:id
            })
          }})}`
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



Coverage
========


STATUS
======

 * createStore
 * combineReducers

TODO
====

 * connect

CONTRIB
=======

Please!

LICENSE
=======

MIT License

Copyright (c) [2016] [David Wee]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
