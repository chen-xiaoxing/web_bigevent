$(function(){
    getUserInfo();
    // 退出功能
    $('#btnLogout').on('click',function(){
        //eg1
        layer.confirm('确定退出登录', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token');
            location.href='/login.html';
            layer.close(index);
        });
    })
})
function getUserInfo(){
    $.ajax({
        type:'GET',
        url:'/my/userinfo',
        success:function(res){
            if(res.status!==0){
                return layui.layer.msg('获取信息失败')
            }
            renderAvatar(res.data);
        },
        // complete:function(res){
        //     if(res.responseJSON.status===1 && res.responseJSON.message==='身份认证失败！'){
        //         localStorage.removeItem('token');
        //         location.href='/login.html';
        //     }
        // }
    })
}
// 渲染用户头像
function renderAvatar(user){
    var name=user.nickname||user.username;
    $('#welcome').html('欢迎&nbsp&nbsp'+name);
    if(user.user_pic!==null){
         // 原先写法$('.layui-nav-img').attr('src',user.user_pic).show();
        $('.layui-nav-img').attr('src',user.user_pic);
        $('.text-avatar').hide();
    }else{
        $('.text-avatar').show();
        var first=name[0].toUpperCase();
        // 原先写法$('.text-avatar').html(first).show();
        $('.text-avatar').html(first);
    }

    
}