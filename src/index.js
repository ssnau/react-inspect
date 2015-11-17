import React, {Component, PropTypes} from 'react';
const {string, func} = PropTypes;

function isObject(data) {
  return typeof data === 'object' && data !== null;
}

function getExpandPairs(data) {
  if (typeof data === 'function') return <div style={{paddingLeft: 10}}><Unit data={data} /></div>;
  return (
    <ul className="object-ul">
    {Object.keys(data).map(k => {
        if (!isObject(data[k]) && typeof data[k] !== 'function') return  <li key={k}>   <span className='unit-key'> {k} </span>  : <Unit data={data[k]} /> </li>;
        return <PairObject k={k} v={data[k]} key={k} />
    })}
    </ul>
  )
}

function getObjectName(v) {
  var name = (v && v.constructor && v.constructor.name) || 'PlainObject';
  if (Array.isArray(v)) name = `Array(${v.length})`;
  if (typeof v === 'function') name = "Function";
  return name;
}

class Button extends Component {
  render() {
    var {expanded, onClick, extraClass=""} = this.props;
    var cn = expanded ? "fa fa-angle-down" : 'fa fa-angle-right';
    return <i onClick={onClick} className={'object-button ' + cn + ' ' + extraClass}>{" "}</i>
  }
}

class PairObject extends Component {
  constructor() {
    super();
    this.state = {};
  }
  toggle() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  getButton(expand) {
    return <Button
    extraClass={'in-pair'}
    expanded={!!expand}
    onClick={_ => this.toggle()} />;
  }
  getCollapsed() {
    var v = this.props.v;
    return (
      <span>
        {this.getButton(false)}
          <span className='unit-key unit-object-key' onClick={_ => this.toggle()} >
          {this.props.k} </span> : {getObjectName(v)}
      </span>
    )
  }
  getExpanded() {
    var {v, k} = this.props;

    return (<span>
      {this.getButton(true)}
      <span className='unit-key unit-object-key' onClick={_ => this.toggle()} > {k} </span> : {getObjectName(v)}
      {getExpandPairs(v)}

    </span>);
  }

  render() {
    return (<div>
      {this.state.expanded ? this.getExpanded() :  this.getCollapsed()}
      </div>)
  }
}

class UnitObject extends React.Component {
    constructor(props) {
      super();
      this.state = {expanded: props.expanded};
    }
    toggle() {
      this.setState({
        expanded: !this.state.expanded
      });
    }
    getButton() {
      var noButton = this.props.noButton;
      if (noButton) return null;
      return  <Button
      expanded={false}
      onClick={_ => this.toggle()} />;
    }
    getCollapsed() {
      var data = this.props.data;
      var name = data.constructor && data.constructor.name;

      return (
        <span>
        {this.getButton()}{name}
        </span>
      )
    }
    getExpanded() {
      var data = this.props.data;

      return (
        <span>
          {this.getButton()}
          {"{"}
          {getExpandPairs(data)}
          {"}"}
        </span>
      )
    }
    render() {
     if (typeof this.props.data !== 'object') return;
     if (!this.state.expanded) return this.getCollapsed();
     return this.getExpanded();
    }
}

class Unit extends React.Component {
      renderNullify(data) {
        switch (true) {
            case data === null:
                return "null";
            case data === void 0:
                return "undefined";
            case data !== data:
                return "NaN"
        }
    }
    renderCallable(data) {
        if (typeof data !== 'function') return;
        return <pre style={{display: 'inline'}}>{(String(data))}</pre>;
    }
    renderLiteral(data) {
        if (typeof data === 'number') return '' + data;
        if (typeof data === 'string') return `"${data.replace(/"/g, '\\' + '"')}"`;
        if (typeof data === 'boolean') return String(data);
    }
    renderArray(data) {
        if (!Array.isArray(data)) return;
        var len = data.length;
        return (
            <span>
                [
                    {data.map((d, index) => {
                        return <span key={index}>(index !== len - 1) ? (<span>{this.r(d)}, </span>) : this.r(d)</span>
                    })}
                ]
            </span>
            )
    }
    renderObject(data) {
       return <UnitObject data={data} expanded={true} />
    }
    r(data) {
        return this.renderLiteral(data)
        || this.renderNullify(data)
        || this.renderCallable(data)
        || this.renderArray(data)
        || this.renderObject(data);
    }

    render() {
        var x = this.r(this.props.data);
        return <span className={'unit-' + (typeof this.props.data)}>{x}</span>;
    }
}

class Console extends React.Component {
  static Unit = Unit;
  render() {
      return <div className="react-console">
          <Unit data={this.props.data} />
        </div>
  }
}

export default Console;
