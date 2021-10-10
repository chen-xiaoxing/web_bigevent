$(function(){
    $('#link-login').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link-reg').on('click',function(){
        $('.reg-box').hide();
        $('.login-box').show();
    })
})

// 设置密码必须验证
var form=layui.form;
var layer=layui.layer;
form.verify({
    pass: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ] ,
    repass:function(value){
        var pwd=$('.reg-box [name=password]').val();
        if(pwd!=value){
            return '两次密码不一致'
        }
    }
})
// 注册事件
$('#form_reg').on('submit',function(e){
    e.preventDefault();
    $.post('/api/reguser',{username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()},function(res){
        if(res.status!==0){
            return layer.msg(res.message);
        }
        layer.msg('成功注册');
        $('#link-reg').click();
    });
})
// 登录事件
$('#form_login').submit(function(e){
    e.preventDefault();
    $.ajax({
        type:'POST',
        url:'/api/login',
        data:$(this).serialize(),
        success:function(res){
            console.log(res);
            if(res.status!==0){
                return layer.msg('登录失败!')
            }
            layer.msg('登录成功')
            localStorage.setItem('token',res.token);
            location.href='/index.html';
        }
    })
})