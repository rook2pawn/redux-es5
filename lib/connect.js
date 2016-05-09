var react = require('react')
var objectAssign = require('object-assign')
var hyperx = require('hyperx')
var hx = hyperx(react.createElement)
var connect = function(store) {
  if (!store) {
    throw new Error("Store is undefined")
  }
  return function(mapStateToProps,mapDispatchToProps) {
    return function(component) {
      var hasSubscribed = false;
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
          // this could be a candidate for optimization
          var state = store.getState();
          var ownProps = this.props;
          var _props1 = {};
          var _props2 = {};
          if (mapStateToProps) 
            _props1 = mapStateToProps(state,ownProps);
          if (mapDispatchToProps)
            _props2 = mapDispatchToProps(store.dispatch,ownProps);
          else 
            _props2 = { dispatch : store.dispatch }
          var props = objectAssign(_props1,_props2)
          if ((mapStateToProps) && (hasSubscribed === false)) {
            store.subscribe(function() {
              var state = store.getState();
              var _props1 = mapStateToProps(state,ownProps);
              props = objectAssign(_props1,_props2)
            })
            hasSubscribed = true;
          }
          return hx`${react.createElement(component,props)}` 
        }
      })
    }
  }
}
module.exports = exports = connect;
