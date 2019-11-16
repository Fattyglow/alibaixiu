//像服务器端发送请求 获取评论列表数据
$.ajax({
    type: "get",
    url: "/comments",
    success: function (response) {
        // console.log(response); 
        //将模板进行拼接
        var html = template('commentsTpl',response);
        // console.log(html);
        $('#commentsBox').html(html);
        //分页模块进行拼接
        var pageHtml = template('pageTpl',response);
        $('#pageBox').html(pageHtml);
    }
});

//实现分页
function  changePage(page) {  
    $.ajax({
        type: "get",
        url: "/comments",
        data:{
            //第一个page是接口文档中要求传递的page参数
            //第二个是函数的形参
            page:page
        },
        success: function (response) {
            // console.log(response); 
            //将模板进行拼接
            var html = template('commentsTpl',response);
            // console.log(html);
            $('#commentsBox').html(html);
            //分页模块进行拼接
            var pageHtml = template('pageTpl',response);
            $('#pageBox').html(pageHtml);
        }
    });
    
}

//当审核按钮被点击的时候
$('#commentsBox').on('click','.status', function () {
    //获取当前评论状态
    var status = $(this).attr('data-status');
    //获取当前要修改评论的id
    var id = $(this).attr('data-id');
    //像服务器端发送请求 更改评论状态
    $.ajax({
        type: "put",
        url: "/comments/"+id,
        data:{
            //更改状态
            state:status == 0 ? 1 : 0
        },
        success: function (response) {
            location.reload();
        }
    });
});

//当删除按钮被点击的时候 
$('#commenstBox').on('click','.delete', function () {
    if(confirm('确认删除?')){
        //获取管理员要删除的id
        var id = $(this).attr('data-id');
        //向服务器端发送请求 执行删除操作
        $.ajax({
            type: "delete",
            url: "/comments/"+id,
            success: function () {
                location.reload();
            }
        });
    }
});