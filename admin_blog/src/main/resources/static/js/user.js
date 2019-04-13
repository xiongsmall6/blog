$(document).ready(function () {

    var uploader = WebUploader.create({
        auto: true,
        // swf文件路径
        swf: 'js/vendor/webuploader/Uploader.swf',

        // 文件接收服务端。
        server: 'portrait/upload',
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick:{
            id:'#picker',
            multiple:true
        },
        formData:{
        }
        ,
        // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
        resize: false,
        accept: {
            title: 'Images',
            extensions: 'jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        },
        duplicate :true
    });

    uploader.on('uploadSuccess', function (file, response) {
        if(response.code==200){
            console.log(response);
            $("#portrait").attr("src",response.data);
        }
    });

    uploader.on('beforeFileQueued', function (file) {
        var type=["png","jpg","bmp","jpeg"];
        if((type.indexOf(file.ext.toLowerCase())>=0)&&((file.size/(1024*1024))<=20)){
            return true;
        }else{
            alert("仅支持png、jpg、bmp、jpeg且大小不超过20M的图片");
            return false;
        }
    });

    var wechatUploader = WebUploader.create({
        auto: true,
        // swf文件路径
        swf: 'js/vendor/webuploader/Uploader.swf',

        // 文件接收服务端。
        server: 'upload',
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick:{
            id:'#wechatPicker',
            multiple:true
        },
        formData:{
        }
        ,
        // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
        resize: false,
        accept: {
            title: 'Images',
            extensions: 'jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        },
        duplicate :true
    });

    wechatUploader.on('uploadSuccess', function (file, response) {
        if(response.code==200){
            $("#wechatCode").attr("src",response.data);
            $("#wechatCode").show();
        }
    });

    wechatUploader.on('beforeFileQueued', function (file) {
        var type=["png","jpg","bmp","jpeg"];
        if((type.indexOf(file.ext.toLowerCase())>=0)&&((file.size/(1024*1024))<=20)){
            return true;
        }else{
            alert("仅支持png、jpg、bmp、jpeg且大小不超过20M的图片");
            return false;
        }
    });


    $("#editButton").click(function(){
        if( $(this).html()=="编辑信息"){
            $("#editDiv").show();
            $("#showDiv").hide();
            $(this).html("保存信息");
        }else{
            if(!ArticleJs.formatParams()){
                return;
            }
            ArticleJs.getData(ArticleJs.formatParams());
        }
    })

});

var ArticleJs={

    getData:function(params){
        $.ajax({
            type:"POST",
            url:"update/user",
            dataType:"json",
            data:params,
            success:function(data){
                if(data&&data.code==200){
                    window.location.reload();
                }
            },
            error:function(jqXHR){
                console.log("接口异常"+jqXHR.status);
            }
        });
    },
    formatParams:function () {
        var fullName = $.trim($("#fullName").val());
        var age = $.trim($("#age").val());
        var phone = $.trim($("#phone").val());
        var email = $.trim($("#email").val());
        var qq = $.trim($("#qqNumber").val());
        var wechat = $.trim($("#wechat").val());
        var occupation = $.trim($("#occupation").val());
        var hobby = $.trim($("#hobby").val());
        var motto = $.trim($("#motto").val());
        var wechatCode = $.trim($("#wechatCode").attr("src"));
        var user={};
        if(!fullName){
            $("#fullName").siblings("small").html("姓名不能为空!");
            $("#fullName").siblings("small").show();
            return false;
        }else{
            user['fullName']=fullName;
            $("#fullName").siblings("small").hide();
        }
        if(age){
            user['age']=age;
        }
        if(phone){
            user['phone']=phone;
        }
        if(email){
            user['email']=email;
        }
        if(qq){
            user['qq']=qq;
        }
        if(wechat){
            user['wechat']=wechat;
        }
        if(occupation){
            user['occupation']=occupation;
        }
        if(hobby){
            user['hobby']=hobby;
        }
        if(motto){
            user['motto']=motto;
        }
        if(wechatCode){
            user['wechatCode']=wechatCode;
        }
        return user;
    }

}