# react-react-console
---
[![NPM version](http://npm.sankuai.com/badge/v/react-react-console.svg?style=flat-square)](http://npm.sankuai.com/package/react-react-console)
<#$$ mnpm $$>
[![Build Status](http://castle.sankuai.com/api/badge/liuxijin/turbo-component)](http://castle.sankuai.com/gh/liuxijin/turbo-component)
</$$ mnpm $$>

## Development

```
npm --registry=http://r.npm.sankuai.com install react-react-console 
npm start
```

## Usage

```js
var Component = require('react-react-console');
var React = require('react');
React.render(<Component />, container);
```

## API

### props


| 参数       | 说明                                        | 类型      |  可选值        | 默认值  |
|------------|---------------------------------------------|-----------|----------------|---------|
|  name      |  指定显示的名字                             | int       |  任意非负整数  |  0      |
|  onClick   |  点击时的回调函数                           | function  |                |  noop   |

## License

react-react-console is released under the MIT license.
