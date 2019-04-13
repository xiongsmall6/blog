$(function(){
    $('.off').on('click',function(){
        var off = $(this).attr('off');
        var chi = $(this).children('i');
        var text = $(this).children('span');
        var cont = $(this).parents('.item').siblings('.review-version');
        if(off){
          $(text).text('展开');
          $(chi).attr('class','layui-icon layui-icon-down');
          $(this).attr('off','');
          $(cont).addClass('layui-hide');
        }else{
          var whisperId= $(this).attr("data-id");
          var commentObj = $(this).parent().parent().parent().find(".list-cont");
          $.ajax({
                type:"POST",
                url:"whisperComment",
                dataType:"json",
                data:{"content_id":whisperId},
                success:function(data){
                    console.log(data);
                    var htmlStr = initCommentHtml(data);
                    commentObj.html(htmlStr);
                },
                error:function(jqXHR){
                    console.log("接口异常"+jqXHR.status);
                }

          });
          $(text).text('收起');
          $(chi).attr('class','layui-icon layui-icon-up')
          $(this).attr('off','true')
          $(cont).removeClass('layui-hide')
        }
      })

     $('.op-list .like').on('click',function(){
      var oSpan =  $(this).children('span');
      var num = parseInt($(oSpan).text());
      var whisperId= $(this).attr("data-id");
      var off = $(this).attr('off')
      var that = this;
      $.ajax({
            type:"POST",
            url:"praise",
            dataType:"json",
            data:{"content_id":whisperId,"tips":off=="true"?0:1},
            success:function(data){
                if(data.code==200){
                    if(off){
                      $(that).removeClass('active');
                      off = true;
                      $(oSpan).text(num-1)
                      $(that).attr('off','')
                    }else{
                      $(that).addClass('active');
                      off = false;
                      $(oSpan).text(num+1)
                      $(that).attr('off','true')
                    }
                }
            },
            error:function(jqXHR){
                console.log("接口异常"+jqXHR.status);
            }

        });

      })

    $(".submitComment").click(function(){
        var commentValue = $(this).parent().parent().parent().find(".whisperComment").val();
        var whisperId= $(this).attr("data-id");
        var commentObj = $(this).parents(".item-box").find(".list-cont");
        var commentCount = $(this).parents(".item-box").find(".comment-count");
        $.ajax({
            type:"POST",
            url:"addComment",
            dataType:"json",
            data:{"content_id":whisperId,"type":2,"comment":commentValue},
            success:function(data){
                var htmlStr = initCommentHtml(data.data);
                commentObj.html(htmlStr);
                commentCount.html(data.total);
            },
            error:function(jqXHR){
                console.log("接口异常"+jqXHR.status);
            }

        });
    })
})

function initCommentHtml(data){
    var htmlStr="";
    if(data!=null&&data.length>0){
        for(var i=0;i<data.length;i++){
            var comment = data[i];
            htmlStr = htmlStr+'<div class="cont">'+
                       '<div class="img">'+
                        '<img src="static/img/header.png" alt="">'+
                      '</div>'+
                      '<div class="text">'+
                        '<p class="tit"><span class="name">'+comment.create_user+'</span><span class="data">'+comment.create_time+'</span></p>'+
                        '<p class="ct">'+comment.comment+'</p>'+
                      '</div>'+
                    '</div> ';
        }
    }
    return htmlStr;
}