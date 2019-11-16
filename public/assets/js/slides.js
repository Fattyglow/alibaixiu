//当管理员选择文件的时候
$('#file').on('change', function () {
    //用户选择到的文件
    var file = this.files[0];
    //创建formData对象 实现二进制文件上传
    var formData = new FormData();
    //将管理员选择到的文件添加到formData对象中
    formData.append('image',file);
    //向服务器端发送请求
    $.ajax({
        type: "post",
        url: "/upload",
        data:formData,
        //不要去解析formData
        processData:false,
        //不要去设置type
        contentType:false,
        success: function (response) {
            // console.log(response);
            $('#image').val(response[0].image);
        }
    });
});

//当轮播图表单发生提交行为时
$('#slidesForm').on('submit', function () {
    //获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    //向服务器端发送请求 添加轮播图数据
    $.ajax({
        type: "post",
        url: "/slides",
        data: formData,
        success: function (response) {
            location.reload();
        }
    });
    //阻止表单默认提交行为
    return false;
});

//向服务器端发送请求 索要图片轮播列表数据
$.ajax({
    type: "get",
    url: "/slides",
    success: function (response) {
        // console.log(response);
        var html = template('slidesTpl',{data:response});
        // console.log(html);
        //通过jquery的方式获取tbody。然后渲染
        $('#slidesBox').html(html);
    }
});

//删除按钮被点击的时候
$('#slidesBox').on('click', '.delete',function () {
    if(confirm('确认删除?')){
        //获取管理员要删除的轮播图数据id
        var id = $(this).attr('data-id');
        //发送请求 实现删除功能
        $.ajax({
            type: "delete",
            url: "/slides/"+id,
            success: function (response) {
                location.reload();
            }
        });
    }
});