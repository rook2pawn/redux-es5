[![Build Status](https://travis-ci.org/rook2pawn/redux-es5.svg?branch=master)](https://travis-ci.org/rook2pawn/redux-es5)

redux-es5
=========

Redux, with just es5. Fully supports connect bindings to React.


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


I like JSX, I like Webpack, I like Babel, and I like ES6
--------------------------------------------------------

Then this module is probably not for you! JSX, Webpack and Babel are really quite cool but there are some people 
who may not prefer this type of stack added onto thier Node development cycle. 

Why Do I want to use this?
--------------------------

This module is really aimed at people who would like to use Redux and React but without introducing a transpiler,
transpiler configurations, Webpack, and those people who may not want to use JSX or particularly care for ES6.

If you like using Browserify and regular ES5 this module is for you!

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
