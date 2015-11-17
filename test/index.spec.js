import React from 'react';
import MyComponent from '../src';
import sinon from 'sinon';
import assert from 'assert';
import TestUtils from "react-addons-test-utils";

describe('page/index', function() {
  it('should display correct', function() {
    let component = TestUtils.renderIntoDocument(<MyComponent name="Moon"/>);
    assert.equal(React.findDOMNode(component).tagName, 'DIV');
    assert.equal(React.findDOMNode(component).textContent, 'Hello, Moon');
    component = TestUtils.renderIntoDocument(<MyComponent name="Hero"/>);
    assert.equal(React.findDOMNode(component).textContent, 'Hello, Hero');
  });
  it('should response to click event', function() {
    const component = TestUtils.renderIntoDocument(<MyComponent name="Moon" onClick={() => alert('abc')}/>);
    const node = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
    global.alert = sinon.spy();
    TestUtils.Simulate.click(node);
    assert.equal(global.alert.withArgs('abc').calledOnce, true);
  });
});
