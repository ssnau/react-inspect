import React, {Component, PropTypes} from 'react';
const {string, func} = PropTypes;

class MyComponent extends Component {
  static propTypes = {
    name: string,
    onClick: func,
  };
  static defaultProps = {
    name: 'Jack',
  };
  render() {
    return (<div className="react-react-console">
             <h1 className="demo-wrapper" onClick={this.props.onClick}>Hello, {this.props.name}</h1>
           </div>);
  }
}

export default MyComponent;
