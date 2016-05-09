var react = require('react')
var hyperx = require('hyperx')
var hx = hyperx(react.createElement)

var FooterComponent = function(connect) {
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
  return Footer
}
module.exports = exports = FooterComponent;
