$('#logout').on('click', function() {
    //点击后出现一个弹出框。返回值是个布尔值
    var isConfirm = confirm('确认退出？');
    if (isConfirm) {
        $.ajax({
            type: "post",
            url: "/logout",
            success: function(response) {
                location.href = 'login.html';
            },
            error: function() {
                alert('退出失败');
            }
        });
    }
})

//处理日期时间格式
function formateDate(date) {  
    //将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() +1) + '-' + date.getDate();
};

//向服务器端发送请求 索要登录用户信息
$.ajax({
    type: "get",
    //检查用户登录的文件返回了一个用户ID
    url: "/users/"+userId,
    success: function (response) {
        // console.log(response);
        //设置头像
        $('.avatar').attr('src',response.avatar);
        //设置昵称
        $('.profile .name').html(response.nickName);
    }
});