/*
头部、内容区模块
 */
export default function () {
  //实现头部点击切换class
  const navLiNodes = document.querySelectorAll('.nav li');
  const arrowNode = document.querySelector('.arrow');
  const ulNode = document.querySelector('#content>ul');
  const contentNode = document.querySelector('#content');
  const contentNavLiNodes = document.querySelectorAll('.content-nav li');
  const musicNode = document.querySelector('.music');
  const audioNode = document.querySelector('.music audio');
  
  const homeCarouselNode = document.querySelector('.home-carousel');
  const plane1Node = document.querySelector('.course-plane1');
  const plane2Node = document.querySelector('.course-plane2');
  const plane3Node = document.querySelector('.course-plane3');
  const pencil1Node = document.querySelector('.works-pencil1');
  const pencil2Node = document.querySelector('.works-pencil2');
  const pencil3Node = document.querySelector('.works-pencil3');
  const aboutListsNodes = document.querySelectorAll('.about-lists');
  
  const teamTitleNode = document.querySelector('.team-title');
  const teamTextNode = document.querySelector('.team-text');
  
  
  
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
  let lastIndex = 0;
  
  //出入场动画
  const animation = [
    {
      anIn () {
        homeCarouselNode.style.transform = 'translateY(0)';
        homeCarouselNode.style.opacity = 1;
      },
      anOut () {
        homeCarouselNode.style.transform = 'translateY(-50%)';
        homeCarouselNode.style.opacity = 0.2;
      }
    },
    {
      anIn () {
        //右上 右下 左下
        plane1Node.style.transform = 'translate(0, 0)';
        plane2Node.style.transform = 'translate(0, 0)';
        plane3Node.style.transform = 'translate(0, 0)';
      },
      anOut () {
        plane2Node.style.transform = 'translate(-100px, 100px)';
        plane1Node.style.transform = 'translate(-100px, -100px)';
        plane3Node.style.transform = 'translate(100px, -100px)';
      }
    },
    {
      anIn () {
        pencil1Node.style.transform = 'translateY(0)';
        pencil2Node.style.transform = 'translateY(0)';
        pencil3Node.style.transform = 'translateY(0)';
      },
      anOut () {
        //上 下 下
        pencil1Node.style.transform = 'translateY(-100px)';
        pencil2Node.style.transform = 'translateY(100px)';
        pencil3Node.style.transform = 'translateY(100px)';
      }
    },
    {
      anIn () {
        aboutListsNodes[0].style.transform = 'rotate(0)';
        aboutListsNodes[1].style.transform = 'rotate(0)';
      },
      anOut () {
        aboutListsNodes[0].style.transform = 'rotate(45deg)';
        aboutListsNodes[1].style.transform = 'rotate(-45deg)';
      }
    },
    {
      anIn () {
        teamTitleNode.style.transform = 'translateX(0)';
        teamTextNode.style.transform = 'translateX(0)';
      },
      anOut () {
        teamTitleNode.style.transform = 'translateX(-100px)';
        teamTextNode.style.transform = 'translateX(100px)';
      }
    },
  ]
  
  //一上来所有屏都要做出场动画
  for (var i = 0; i < animation.length; i++) {
    animation[i].anOut();
  }
  //默认第一屏做入场动画
  setTimeout(function () {
    animation[0].anIn();
  }, 2000)
  
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
    /*for (var j = 0; j < navLiNodes.length; j++) {
      navLiNodes[j].className = '';
      contentNavLiNodes[j].className = '';
    }*/
    navLiNodes[lastIndex].className = '';
    contentNavLiNodes[lastIndex].className = '';
    //将当前点击的元素添加active class
    navLiNodes[nowIndex].className = 'active';
    contentNavLiNodes[nowIndex].className = 'active';
    //切换小箭头的位置
    arrowNode.style.left = navLiNodes[nowIndex].getBoundingClientRect().left + navLiNodes[nowIndex].offsetWidth / 2 - arrowHalfWidth + 'px';
    //内容区ul的top
    ulNode.style.top = - nowIndex * contentHeight + 'px';
    //让上一屏做出场动画
    animation[lastIndex].anOut();
    //让当前屏做入场动画
    animation[nowIndex].anIn();
    //同步下标
    lastIndex = nowIndex;
  }

  //遍历绑定事件监听
  for (let i = 0; i < navLiNodes.length; i++) {
    navLiNodes[i].onclick = function () {
      //同步nowIndex的值
      nowIndex = i;
      move(nowIndex);
    };
  
    contentNavLiNodes[i].onclick = function () {
      //同步nowIndex的值
      nowIndex = i;
      move(nowIndex);
    }
  }

  //初始化让小箭头来到第一个li下面
  arrowNode.style.left = navLiNodes[0].getBoundingClientRect().left + navLiNodes[0].offsetWidth / 2 - arrowHalfWidth + 'px';
  // move(4);

  //绑定窗口的缩放事件，修改小箭头和ul的位置
  window.onresize = function () {
    // 修改小箭头的位置
    arrowNode.style.left = navLiNodes[nowIndex].getBoundingClientRect().left + navLiNodes[nowIndex].offsetWidth / 2 - arrowHalfWidth + 'px';
    //修改ul的位置
    contentHeight = contentNode.offsetHeight;
    ulNode.style.top = - nowIndex * contentHeight + 'px';
  }
  
  //音乐播放
  musicNode.onclick = function () {
    if (audioNode.paused) {
      //停止播放时点击让其播放
      audioNode.play();
      this.style.backgroundImage = 'url("data:image/gif;base64,R0lGODlhDgAOAIABAAB8Z////yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI4M0ZGM0UzNEU5NjExRTg5Nzc2QzhCNDhDNTcxM0VBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI4M0ZGM0U0NEU5NjExRTg5Nzc2QzhCNDhDNTcxM0VBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjgzRkYzRTE0RTk2MTFFODk3NzZDOEI0OEM1NzEzRUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjgzRkYzRTI0RTk2MTFFODk3NzZDOEI0OEM1NzEzRUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQJKAABACwAAAAADgAOAAACHoyPqasAjBw8ksm67rMPB6x9nTOKJlmG6JmSLKu2BQAh+QQJKAABACwAAAAADgAOAAACHoyPqcvtCMCKhyobKM7S6O6BHyRKY3Saaspx7PeqBQAh+QQFKAABACwAAAAADgAOAAACHYyPqcvtDxUAcC5rcKZaBwtO3PiNYYmK5KmmK1AAADs=")';
    } else {
      //播放时点击让其停止
      audioNode.pause();
      this.style.backgroundImage = 'url("data:image/gif;base64,R0lGODlhDgAOAJEAAAAAAP///wB8Z////yH5BAEAAAMALAAAAAAOAA4AAAIenI+pqyKMHDySybrusw8PrH2dM4omWYbomZIsq7YFADs=")';
    }
  }

}