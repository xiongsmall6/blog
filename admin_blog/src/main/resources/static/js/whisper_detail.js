$(document).ready(function () {
    var uploader = WebUploader.create({
        auto: true,
        // swf文件路径
        swf: 'js/vendor/webuploader/Uploader.swf',

        // 文件接收服务端。
        server: '../upload',
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick:{
            id:'#picker',
            multiple:true
        },
        // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
        resize: false,
        fileNumLimit:3,
        accept: {
            title: 'Images',
            extensions: 'jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        },
        duplicate :true
    });

    uploader.on('uploadSuccess', function (file, response) {
        if(response.code==200){
            var imgList = $("#imgdiv").find("img");
            var inputList = $("#imgdiv").find("input");
            imgList[2].src = imgList[1].src
            imgList[1].src = imgList[0].src
            imgList[0].src = "../"+response.data
            inputList[2].value = inputList[1].value
            inputList[1].value = inputList[0].value
            inputList[0].value = response.data;
            if(inputList[0].value&&inputList[0].value!=""){
                $(imgList[0]).show();
            }
            if(inputList[1].value&&inputList[1].value!=""){
                $(imgList[1]).show();
            }
            if(inputList[2].value&&inputList[2].value!=""){
                $(imgList[2]).show();
            }
        }
    });
    uploader.on('uploadFinished', function () {
        uploader.reset();
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
            window.location.href="../go/whisper?page="+pageNum;
        }else{
            window.location.href="../whisper";
        }

    })
    $('#save_whisper').on('click', function (e) {
        var content = $.trim($("#content").val());
        var pic1 = $("#pic1_url").val();
        var pic2 = $("#pic2_url").val();
        var pic3 = $("#pic3_url").val();
        if(content==""){
            $("#content_tips").html("微语不能为空");
            return;
        }else{
            $("#content_tips").html("");
        }
        $.ajax({
            type:"POST",
            url:"../add/whisper",
            dataType:"json",
            data:{
                'id':$("#whisper_id").val(),
                'content':content,
                'pic1':pic1,
                'pic2':pic2,
                'pic3':pic3,
                'createUser':$("#login_user").val()
            },
            success:function(data){
                console.log(data);
                if(data&&data.code==200){
                    if($("#pageNum").val()){
                        var pageNum = parseInt($("#pageNum").val(),10);
                        window.location.href="../go/whisper?page="+pageNum;//编辑时跳转到编辑的页面
                    }else{
                        window.location.href="../whisper";
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