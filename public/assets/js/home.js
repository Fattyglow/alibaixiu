//向服务器端发送请求 索要轮播图数据
$.ajax({
    type: "get",
    url: "/slides",
    success: function (response) {
        // console.log(response);
        //将模板拼接起来
        var html = template('slidesTpl',{data:response});
        // console.log(html);
        //模板渲染
        $('#slideBox').html(html);
            //
        var swiper = Swipe(document.querySelector('.swipe'), {
        auto: 3000,
        transitionEnd: function (index) {
          // index++;
  
          $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
        });
  
      // 上/下一张
      $('.swipe .arrow').on('click', function () {
        var _this = $(this);
  
        if(_this.is('.prev')) {
          swiper.prev();
        } else if(_this.is('.next')) {
          swiper.next();
            }
        })
    }
});

//像服务器端发送请求 索要最新发布数据
$.ajax({
    type: "get",
    url: "/posts/lasted",
    success: function (response) {
        // console.log(response);
        var html = template('lastedTpl',{data:response});
        $('#lastedBox').html(html);
    }
});

//处理日期时间格式
function formateDate(date) {  
    //将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() +1) + '-' + date.getDate();
};
