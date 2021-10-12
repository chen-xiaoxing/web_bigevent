$(function(){
    var form=layui.form;
    var layer=layui.layer;
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '昵称长度必须在1-6个字符之间';
            }
        }
    })
    initUserinfo();
    // 初始化客户信息
    function initUserinfo(){
        $.ajax({
            type:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!==0){
                    return layer.msg('获取信息失败')
                }
                console.log(res);
                // 为表单快速赋值
                form.val('formUserinfo',res.data);
            }
        })
    }

    // 重置表单
    $('#btnReset').on('click',function(e){
        e.preventDefault();
        initUserinfo();
    })
    // 修改基础资料
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('修改失败');
                }
                layer.msg('修改成功');
                window.parent.getUserInfo();
            }
        })
    })
})