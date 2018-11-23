/*
头部模块
 */

export default function () {
  //实现头部点击切换class
  const navLiNodes = document.querySelectorAll('.nav li');
  const arrowNode = document.querySelector('.arrow');

//缓存小箭头一半的宽度
  const arrowHalfWidth = arrowNode.offsetWidth / 2;

//所有样式选择器都是从右往左的解析的
//选择器最多3-4个
//选择器的开销（id < class < xxxx）
// const navLiNodes = document.querySelectorAll('#wrap #header .header-main .nav li');

//遍历绑定事件监听
  for (let i = 0; i < navLiNodes.length; i++) {
    navLiNodes[i].onclick = function () {
      //将所有的class清空
      for (var j = 0; j < navLiNodes.length; j++) {
        navLiNodes[j].className = '';
      }
      //将当前点击的元素添加active class
      this.className = 'active';
      //切换小箭头的位置
      arrowNode.style.left = navLiNodes[i].getBoundingClientRect().left + navLiNodes[i].offsetWidth / 2 - arrowHalfWidth + 'px';
    };
  }

//初始化让小箭头来到第一个li下面
  arrowNode.style.left = navLiNodes[0].getBoundingClientRect().left + navLiNodes[0].offsetWidth / 2 - arrowHalfWidth + 'px';
}