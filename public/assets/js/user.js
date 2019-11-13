//当表单发生提交行为的时候
$('#userForm').on('submit',function () { 
    //获取到用户在表单中输入的内容并将内容格式化为参数字符串
   var formData =  $(this).serialize();
   //向服务器端发送添加用户的请求
   $.ajax({
       type: "post",
       url: "/users",
       data: formData,
       success: function (response) {
           //刷新页面
           location.reload();
       },
       error: function () { 
           alert('用户添加失败')
        }
   });
    //组织表单默认提交行为
    return false;
 });

//当用户选择文件的时候
$('#modifyBox').on('change','#avatar',function () {  
     //用户选择到的文件
     //this.files[0]
     var formData = new FormData();
     formData.append('avatar',this.files[0]);
     $.ajax({
         type: "post",
         url: "/upload",
         data: formData,
         //告诉$.ajax不要解析请求参数
         processData:false,
         //不要设置请求参数的类型
         contentType:false,
         success: function (response) {
             console.log(response);
             //attr自定义或者内置的属性值
             //实现头像预览功能
             $('#preview').attr('src',response[0].avatar);
             $('#hiddenAvatar').val(response[0].avatar);
         }
     });
})

//向服务器端发送请求。索要用户列表数据
$.ajax({
    type: "get",
    url: "/users",
    success: function (response) {
        //使用模板引擎将数据和html字符串进行拼接
        var html =  template('userTpl',{
          data:response
        });
        //将拼接好的字符串显示在页面中
        $('#userBox').html(html);
    }
});

//通过事件委托的方式为编辑按钮添加点击事件
$('#userBox').on('click','.edit',function () { 
    //获取被点击用户的id值
    var id =  $(this).attr('data-id');
    //根据id获取用户的响应信息
    $.ajax({
        type: "get",
        url: "/users/"+id,
        success: function (response) {
            // console.log(response)
            var html = template('modifyTpl',response);
            $('#modifyBox').html(html);        
        }
    });
});

//为修改表单添加表单提交事件
$('#modifyBox').on('submit','#modifyForm',function () {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: "put",
        url: "/users/"+id,
        data: formData,
        success: function (response) {
            location.reload();
        }
    });
    //阻止表单默认提交
    return false;
});

//删除单个用户
$('#userBox').on('click','.delete',function () {  
    //如果管理员确认要删除用户
    if(confirm('确认删除？')){
        //获取到即将要删除的用户id
        var id = $(this).attr('data-id');
        //向服务器端发送请求 删除用户
        $.ajax({
            type: "delete",
            url: "/users/"+id,
            success: function () {
                location.reload();
            }
        });
    }
});

//获取全选按钮
var selectAll = $('#selectAll');
//当全选按钮状态发生改变时
selectAll.on('change',function () {  
    //获取到全选按钮当前的状态
    var status = $(this).prop('checked');
    //获取到所有的用户\
    //获取到所有的用户并将用户的状态和全选按钮保持一致
    $('#userBox').find('input').prop('checked',status);
})
//当用户前面的复选框状态发生改变时
$('#userBox').on('change','.userStatus',function () {
    //获取到所有用户 在所有用户中过滤选中的用户
    //判断选中的用户数量和所有用户的数量是否一致
    //如果 一致 说明全部选中
    var inputs = $('#userBox').find('input');
    //filter有过滤的意思 :checked 加起来就是在过滤的用户中选择选中的用户
    if(inputs.length ==inputs.filter(':checked').length){
        selectAll.prop('checked',true);
    }else{
        selectAll.prop('checked',false);
    }
})
