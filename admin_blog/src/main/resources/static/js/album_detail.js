$(document).ready(function () {
    var albumId =$("#albumId").val();
    var uploader = WebUploader.create({
        auto: true,
        // swf文件路径
        swf: 'js/vendor/webuploader/Uploader.swf',

        // 文件接收服务端。
        server: '../album/upload',
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick:{
            id:'#picker',
            multiple:true
        },
        formData:{
            album_id:albumId
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
        }
    });
    uploader.on('uploadFinished', function () {
        window.location.reload();
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
            window.location.href="../go/album?page="+pageNum;
        }else{
            window.location.href="../whisper";
        }

    })
    $(".detail-delete").on('click', function (e) {
        var detailId = $(this).attr("data-detailid");
        var that = this
        if(detailId){
            $.ajax({
                type:"POST",
                url:"../album/picture/delete",
                dataType:"json",
                data:{"detail_id":detailId},
                success:function(data){
                    if(data&&data.code==200){
                        $(that).parent().remove();
                    }
                },
                error:function(jqXHR){
                    console.log("接口异常"+jqXHR.status);
                }
            });
        }

    })

});