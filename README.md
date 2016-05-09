[![Build Status](https://travis-ci.org/rook2pawn/redux-es5.svg?branch=master)](https://travis-ci.org/rook2pawn/redux-es5)

redux-es5
=========

Redux, with just es5. 

Intro
=====

See the [example](../master/example) directory for a fully separated component app backed with connect on the redux-es5 store.

You can open the [the web page](../master/example/index.html) in your browser to see the application in action. Compiled with [browserify](https://github.com/substack/browserify)

The [tutorial](../master/tutorial) directory has many examples

  * [tutorial/example0.js](../master/tutorial/example0.js) - shows a demonstration of the redux-es5 store with a manual overall reducer
  * [tutorial/example1.js](../master/tutorial/example1.js)  - shows the same thing but utilizes the redux-es5 combineReducers
  * [tutorial/example1-react.js](../master/tutorial/example1-react.js)  - shows the view layer as expressed as React without JSX while still rendering via fully fledged React Components utilizing [hyperx](https://github.com/substack/hyperx)
  * [tutorial/example1-react-withoutClass.js](../master/tutorial/example1-react-withoutClass.js) - same thing as example1-react but utilizing the polyfill equivalent for es6 extends.
  * [tutorial/example2-react.js](../master/tutorial/example2-react.js) - Adds clicking on an item to mark it as completed.
  * [tutorial/example3-react.js](../master/tutorial/example3-react.js) - Adds a filter to show All, show active, and show completed.
  * [tutorial/example4-react.js](../master/tutorial/example4-react.js) - Refactor demonstrating nested classes and presentational components.
  * [tutorial/example5-react.js](../master/tutorial/example5-react.js) - Refactor demonstrating more separation of container and presentational components.
  * [tutorial/example6-react.js](../master/tutorial/example6-react.js) - Demonstrates the connect binding. Currently supports React Components, more on the way.

You can open the corresponding html pages (e.g. [tutorial/index-example4.html](../master/tutorial/index-example4.html) )in the tutorial to see it in action.

Example
=======
*taken from [example/app.js](../master/example/app.js)*

The [connect declaration](../master/example/components/store.js) is the link between redux-es5 storage that drives this view layer.

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

Coverage
========


STATUS
======

 * createStore
 * combineReducers
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
