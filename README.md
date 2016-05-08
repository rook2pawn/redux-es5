[![Build Status](https://travis-ci.org/rook2pawn/redux-es5.svg?branch=master)](https://travis-ci.org/rook2pawn/redux-es5)

redux-es5
=========

Redux, with just es5. The tutorial directory lists many examples. 

  * example0.js - shows a demonstration of the redux-es5 store with a manual overall reducer
  * example1.js - shows the same thing but utilizes the redux-es5 combineReducers
  * example1-react.js - shows the view layer as expressed as React without JSX while still rendering via fully fledged React Components utilizing [hyperx](https://github.com/substack/hyperx)
  * example1-react-withoutClass.js - same thing as example1-react but utilizing the polyfill equivalent for es6 extends.

Example
=======


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


    var TodoApp = function() {
      Component.call(this);
      this.render = function() {
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
    TodoApp.prototype = Object.create(Component.prototype);
    TodoApp.prototype.constructor = Component;

    var Factory = react.createFactory(TodoApp)
    var render = function() {
      var root = Factory({todos:store.getState().todos})
      reactdom.render(root, document.querySelector('#content'))
    }
    store.subscribe(render)
    render()



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
