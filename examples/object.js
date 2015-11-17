import Inspect from 'react-inspect';
import React from 'react';
import ReactDOM from 'react-dom';

require('react-inspect/assets/index.css');
var obj = {
  name: 'jack',
  age: 18,
  wrong: NaN,
  profile: {
    father: 'jose',
    mother: 'pru\"ne'
  },
  talk: function talk() {
    console.log('i am talking');
  },
  hobbies: ['football', 'basketball', 'ski', {
    name: 'video game',
    type: 'sport'
  }],
  array: []
};
obj.profile.self = obj;


ReactDOM.render(<Inspect data={obj} />, document.getElementById('app'));
