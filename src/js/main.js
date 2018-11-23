/*
头部、内容区模块
 */
export default function () {
  //实现头部点击切换class
  const navLiNodes = document.querySelectorAll('.nav li');
  const arrowNode = document.querySelector('.arrow');
  const ulNode = document.querySelector('#content>ul');
  const contentNode = document.querySelector('#content');

  //所有样式选择器都是从右往左的解析的
  //选择器最多3-4个
  //选择器的开销（id < class < xxxx）
  // const navLiNodes = document.querySelectorAll('#wrap #header .header-main .nav li');
  
  //缓存高度
  let contentHeight = contentNode.offsetHeight;
  //缓存小箭头一半的宽度
  const arrowHalfWidth = arrowNode.offsetWidth / 2;
  
  //代表li的下标
  let nowIndex = 0;
  
  //ie/chrome
  document.onmousewheel = wheel;
  //firefox
  document.addEventListener && document.addEventListener('DOMMouseScroll', wheel);
  
  let wheelTimer = null;
  
  function wheel(event) {
    event = event || window.event;
    
    //函数反抖
    //清除上一次的延时定时器
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(() => {
      let flag = '';
      if (event.wheelDelta) {
        //ie/chrome
        if (event.wheelDelta > 0) {
          flag = 'up';
        } else {
          flag = 'down';
        }
      } else if (event.detail) {
        //firefox
        if (event.detail < 0) {
          flag = 'up';
        } else {
          flag = 'down';
        }
      }
  
      switch (flag) {
        case 'up' :
          /*if (nowIndex < 0) nowIndex = 0;
          ulNode.style.top = - nowIndex * contentHeight + 'px';*/
          if (nowIndex > 0) {
            nowIndex--;
            move(nowIndex);
          }
          break;
        case 'down' :
          if (nowIndex < 4) {
            nowIndex++;
            move(nowIndex);
          }
          break;
      }
    }, 200);
    
    //禁止默认行为
    event.preventDefault && event.preventDefault();
    return false;
  }
  
  function move(nowIndex) {
    //将所有的class清空
    for (var j = 0; j < navLiNodes.length; j++) {
      navLiNodes[j].className = '';
    }
    //将当前点击的元素添加active class
    navLiNodes[nowIndex].className = 'active';
    //切换小箭头的位置
    arrowNode.style.left = navLiNodes[nowIndex].getBoundingClientRect().left + navLiNodes[nowIndex].offsetWidth / 2 - arrowHalfWidth + 'px';
    //内容区ul的top
    ulNode.style.top = - nowIndex * contentHeight + 'px';
  }

  //遍历绑定事件监听
  for (let i = 0; i < navLiNodes.length; i++) {
    navLiNodes[i].onclick = function () {
      //同步nowIndex的值
      nowIndex = i;
      move(nowIndex);
    };
  }

  //初始化让小箭头来到第一个li下面
  arrowNode.style.left = navLiNodes[0].getBoundingClientRect().left + navLiNodes[0].offsetWidth / 2 - arrowHalfWidth + 'px';

  //绑定窗口的缩放事件，修改小箭头和ul的位置
  window.onresize = function () {
    // 修改小箭头的位置
    arrowNode.style.left = navLiNodes[nowIndex].getBoundingClientRect().left + navLiNodes[nowIndex].offsetWidth / 2 - arrowHalfWidth + 'px';
    //修改ul的位置
    contentHeight = contentNode.offsetHeight;
    ulNode.style.top = - nowIndex * contentHeight + 'px';
  }

}