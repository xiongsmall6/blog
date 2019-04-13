$(document).ready(function () {
    //实例化编辑器
    var um = UM.getEditor('myEditor');

    var uploader = WebUploader.create({
        auto: true,
        // swf文件路径
        swf: 'js/vendor/webuploader/Uploader.swf',

        // 文件接收服务端。
        server: 'upload',
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick:{
            id:'#picker',
            multiple:false
        },

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
        console.log(response);
        if(response.code==200){
            $("#cover_img").attr("src",response.data);
            $("#cover_img").show();
            $("#cover_url").val(response.data);
        }
    });
    uploader.on('uploadError', function (file, response) {
        console.log(response);
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

    $(".back").on('click', function (e) {
        if($("#pageNum").val()){
            var pageNum = parseInt($("#pageNum").val(),10);
            window.location.href="go/index?page="+pageNum;
        }else{
            window.location.href="index";
        }

    })
    $('#save_article').on('click', function (e) {
        var title = $.trim($("#title").val());
        var type = $("#article_type").val();
        var picture = $("#cover_url").val();

        if(title==""){
            $("#title_tips").html("文章标题不能为空");
            return;
        }else{
            $("#title_tips").html("");
        }
        if(picture==""){
            $("#cover_tips").html("文章封面不能为空");
            return;
        }else{
            $("#cover_tips").html("");
        }
        if(!um.hasContents()){
            alert("文章内容不能为空");
        }
        var top = 0;
        if($('#istop').prop('checked')){
            top = 1;
        }
        var content = um.getContent();
        $.ajax({
            type:"POST",
            url:"article/add",
            dataType:"json",
            data:{
                'id':$("#article_id").val(),
                'title':title,
                'type':type,
                'picture':picture,
                'content':content,
                'top':top,
                'createUser':$("#login_user").val()
            },
            success:function(data){
                console.log(data);
                if(data&&data.code==200){
                    if($("#pageNum").val()){
                        var pageNum = parseInt($("#pageNum").val(),10);
                        window.location.href="go/index?page="+pageNum;//编辑时跳转到编辑的页面
                    }else{
                        window.location.href="index";
                    }

                }else{
                    console.log(data.msg);
                }
            },
            error:function(jqXHR){
                console.log("接口异常"+jqXHR.status);
            }
        });
    });
});