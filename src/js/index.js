//引入主要js
import main from './main';
import lastView from './lastView';

//导入less文件
import '../less/index.less';

//手动引入mp3资源
import '../images/audio.mp3';
//DOMContentLoaded事件：所有dom元素构建完毕，就会触发当前事件
//onload事件：页面的所有资源加载完毕，才会触发
document.addEventListener('DOMContentLoaded', function () {
  main();
  lastView();
})