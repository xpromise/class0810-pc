
//导入less文件
import '../less/index.less';

//实现头部点击切换class
const navLiNodes = document.querySelectorAll('.nav li');
//所有样式选择器都是从右往左的解析的
//选择器最多3-4个
//选择器的开销（id < class < xxxx）
// const navLiNodes = document.querySelectorAll('#wrap #header .header-main .nav li');

//遍历绑定事件监听
for (var i = 0; i < navLiNodes.length; i++) {
  navLiNodes[i].onclick = function () {
    //将所有的class清空
    for (var j = 0; j < navLiNodes.length; j++) {
      navLiNodes[j].className = '';
    }
    //将当前点击的元素添加active class
    this.className = 'active';
  };
}