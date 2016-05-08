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
  * [tutorial/index-example1-react-withoutClass.html](../master/tutorial/index-example1-react-withoutClass.html) you can open this in your web browser to demonstrate the functionality: adding an element to a list. Compiled via browserify.
  * [tutorial/index-example2.html](../master/tutorial/index-example2.html) demonstrate the functionality: adding an element to a list, clicking on an item to mark it as completed. 
  * [tutorial/index-example3.html](../master/tutorial/index-example3.html) demonstrate the functionality: adding an element to a list, clicking on an item to mark it as completed, and adding a filter to show All, show active, and show completed.

Example
=======
*taken from [tutorial/example3-react.js](../master/tutorial/example3-react.js)*

    var redux = require('redux-es5')
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
