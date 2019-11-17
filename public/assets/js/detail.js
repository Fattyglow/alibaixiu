//从地址栏中获取文章id
var postId = getUrlParams('id');
var review
//发送请求 根据id获取详细信息
$.ajax({
    type: "get",
    url: "/posts/"+postId,
    success: function (response) {
        // console.log(response);
        var html = template('postTpl',response);
        $('#postBox').html(html);
    }
});

//当点赞按钮发生点击事件的时候
$('#postBox').on('click','#like',function () {  
    //实现点赞操作 发送请求
    $.ajax({
        type: "post",
        url: "/posts/fabulous/"+postId,
        success: function (response) {
            alert('点赞成功');
        }
    });
});

//获取网站的配置信息
$.ajax({
    type: "get",
    url: "/settings",
    success: function (response) {
        // console.log(response);
        review=response.review
        //判断管理员是否开启了评论功能
        if(response.comment){
            //管理员开启了评论功能 渲染模板
            var html = template('commentTpl');
            // console.log(html);
            $('#comment').html(html);
        }
    }
});

// 当评论表单发生提交行为的时候
$('#comment').on('submit', 'form', function () {
	// 获取用户输入的评论内容
	var content = $(this).find('textarea').val();
	// 代表评论的状态
	var state;

	if (review) {
		// 要经过人工审核
        state = 0;
	}else {
		// 不需要经过人工审核
		state = 1;
    }
    

	// 向服务器端发送请求 执行添加评论操作
	$.ajax({
		type: 'post',
		url: '/comments',
		data: {
			content: content,
			post: postId,
			state: state
		},
		success: function () {
			alert('评论成功')
			location.reload();
		},
		error: function () {
			alert('评论失败')
		}
	})

	// 阻止表单默认提交行为
	return false;
})