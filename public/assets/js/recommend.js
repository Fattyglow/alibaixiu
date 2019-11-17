//向服务器端发送请求 索要热门推荐数据
$.ajax({
    type: "get",
    url: "/posts/recommend",
    success: function (response) {
        //因为想变成公共模板。所以写在js中
        // console.log(response);
        var recommendTpl = `
        {{each data}}
        <li>
            <a href="detail.html?id={{$value._id}}">
                <img src="{{$value.thumbnail}}" alt="">
                <span>{{$value.title}}</span>
            </a>
        </li>
        {{/each}}
        `;
        //完成模板
        var html =template.render(recommendTpl,{data:response});
        // console.log(html);
        //在页面中展示
        $('#recommentBox').html(html);
    }
});