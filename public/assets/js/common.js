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