$(function(){
    var albumCount = parseInt($("#albumCount").val())-1;
    layui.use(['element','laypage'],function(){
      element = layui.element,laypage = layui.laypage;
      laypage.render({
        elem: 'demo',
        limit: 9,
        count: albumCount, //数据总数，从服务端得到
        jump: function(obj, first){
               if (!first) {
                    $.ajax({
                        type:"POST",
                        url:"albumList",
                        dataType:"json",
                        data:{"page":obj.curr},
                        success:function(data){
                            console.log(data);
                            initAlbumHtml(data);
                            initPicClick();
                        },
                        error:function(jqXHR){
                            console.log("接口异常"+jqXHR.status);
                        }

                    });
               }
        }
      });
    })

    initPicClick();

})

function initPicClick(){
    $(".image-info").click(function(){
        var dcoment = $(this).parent()[0];
        layui.use(['layer'],function(){
          layer = layui.layer;
          layer.photos({
            photos: dcoment
            ,anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
            ,tab:function(pic,layero){
              console.log(pic,layero)
            }
          });
        })
    })
}

function initAlbumHtml(data){
var htmlStr="";
    if(data!=null&&data.length>0){
        for(var i=0;i<data.length;i++){
            var album = data[i];
            var picHtml = initPicturesHtml(album.pictures);
            var typeStr="普通相册";
            switch(album.type){
                case 1:
                    typeStr="普通相册"
                    break;
                case 2:
                    typeStr="亲子相册"
                    break;
                case 3:
                    typeStr="旅游相册"
                    break;
                case 4:
                    typeStr="情侣相册"
                    break;
                default:
                    break;
            }
            htmlStr = htmlStr+'<div class="layui-col-xs12 layui-col-sm4 layui-col-md4">'+
                                '<div class="item">'+picHtml+
                                  '<div class="cont-text">'+
                                    '<div class="data">'+album.create_time+'</div>'+
                                    '<p class="address"><i class="layui-icon layui-icon-type"></i><span>'+typeStr+'</span></p>'+
                                    '<p class="briefly">'+album.album_name+'</p>'+
                                  '</div>'+
                                '</div>'+
                              '</div>';
        }
    }
    $("#album_list").html(htmlStr);
}

function initPicturesHtml(data){
    var str="";
    if(data!=null&&data.length>0){
        for(var i=0;i<data.length;i++){
            if(i==0){
                str +='<img class="image-info" width="233px" height="155px" src="'+data[i].img_url+'" alt="">'
            }else{
                str +=' <img src="'+data[i].img_url+'" style="display:none">'
            }
        }
    }else{
        str='<img class="image-info" width="233px" height="155px" src="static/img/xc_img5.jpg" alt="">'
    }
    return str;
}