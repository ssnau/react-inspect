import Component from 'react-react-console';
import React from 'react';
import ReactDOM from 'react-dom';

// 这个示例中表明组件依赖bootstrap的样式，引入bootstrap有两种方式：
// 1. NPM方式: npm install bootstrap，然后在文件里写require('bootstrap/dist/css/bootstrap.css')即可.
// 2. CDN方式(建议): 新建一个与示例同名的html文件，写上依赖（此例），这样打包文件更小，速度更快
//    注意：这种方式下，你获得了自定义HTML结构的权利，故框架将不再提供__component-content节点

ReactDOM.render(<Component />, document.getElementById('app'));
