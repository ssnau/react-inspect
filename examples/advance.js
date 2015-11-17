import Component from 'react-react-console';
import React from 'react';
import ReactDOM from 'react-dom';

require('react-react-console/assets/index.css');

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Component name="click me!" onClick={() => alert('custom alert')} />
      </div>
    );
  }
}
ReactDOM.render(<Demo />, document.getElementById('__component-content'));
