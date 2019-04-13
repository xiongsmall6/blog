$(function(){
initCommentPage();

$(".otherArticle").click(function(){
    var id = $(this).attr("data-id");
    var type = $("#articleType").val();
    if(parseInt(id,10)>=0){
        window.location.href="./details?id="+id+"&type="+type;
    }

})
$("#submitComment").click(function(){
    var articleId = $("#articleId").val();
    var commentStr =$("#commentStr").val();
    $.ajax({
        type:"POST",
        url:"addComment",
        dataType:"json",
        data:{"content_id":articleId,"type":1,"comment":commentStr},
        success:function(data){
            initCommentHtml(data.data);
            $("#commentCount").html(data.total);
            initCommentPage();
        },
        error:function(jqXHR){
            console.log("接口异常"+jqXHR.status);
        }

    });
})

});

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
    $(".list-cont").html(htmlStr);
}

function initCommentPage(){
    var articleCount = $("#commentCount").html();
    layui.use(['element','laypage'],function(){
      element = layui.element,laypage = layui.laypage;
      laypage.render({
        elem: 'demo',
        limit: 5,
        count: articleCount, //数据总数，从服务端得到
        jump: function(obj, first){
               if (!first) {
                    var articleId = $("#articleId").val();
                    $.ajax({
                        type:"POST",
                        url:"listComment",
                        dataType:"json",
                        data:{"content_id":articleId,"page":obj.curr},
                        success:function(data){
                            initCommentHtml(data);
                        },
                        error:function(jqXHR){
                            console.log("接口异常"+jqXHR.status);
                        }

                    });
               }
        }
      });
    })
}