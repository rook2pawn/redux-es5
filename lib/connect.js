var react = require('react')
var objectAssign = require('object-assign')
var hyperx = require('hyperx')
var hx = hyperx(react.createElement)
var connect = function(store) {
  return function(mapStateToProps,mapDispatchToProps) {
    return function(component) {
      var state = store.getState();
      var _props1 = mapStateToProps(state);
      var _props2 = mapDispatchToProps(state);
      var props = objectAssign(_props1,_props2)
      store.subscribe(function() {
        var state = store.getState();
        _props1 = mapStateToProps(state);
        _props2 = mapDispatchToProps(state);
        props = objectAssign(_props1,_props2)
      })
      return react.createClass({
        componentDidMount:function() {
          var that = this;
          this.unsubscribe = store.subscribe(function() {
            that.forceUpdate()
          })
        },
        comonentWillUnmount:function() {
          this.unsubscribe();
        },
        render:function() {
          return hx`${react.createElement(component,props)}` 
        }
      })
    }
  }
}
module.exports = exports = connect;
