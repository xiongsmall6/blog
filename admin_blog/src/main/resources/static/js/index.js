$(document).ready(function () {

    $('#add_article').on('click', function (e) {
        window.location.href="article"
    });
    $('#search_btn').on('click', function (e) {
        var searchTitle = $("#search_title").val();
        var searchType = $("#search_type").val();
        var searchContent = $("#search_content").val();
        var params = {"title":searchTitle,"content":searchContent};
        if(searchType!="0"){
            params['type'] = searchType;
        }
        ArticleJs.getData(params,true);
    });

    ArticleJs.bindEdit();
    ArticleJs.bindDelete();
    var total = parseInt($("#pageCount").val(),10);
    var pageNum = parseInt($("#pageNum").val(),10);
    ArticleJs.initPaginator(total,pageNum);

});

var ArticleJs={

    getData:function(params,isSearch){
        $.ajax({
            type:"POST",
            url:"article/list",
            dataType:"json",
            data:params,
            success:function(data){
                if(data&&data.code==200){
                    var htmlStr = ArticleJs.initHtml(data.data.list);
                    $("#article_list").html(htmlStr);
                    ArticleJs.bindEdit();
                    ArticleJs.bindDelete();
                    if(isSearch){
                        if(data.data.total!=0){
                            $('#jqpage').show();
                            $('#jqpage').jqPaginator('option', {
                                currentPage: 1,
                                totalPages:data.data.pages
                            });
                        }else{
                            $('#jqpage').hide();
                        }
                    }
                }else{

                }
            },
            error:function(jqXHR){
                console.log("接口异常"+jqXHR.status);
            }
        });
    },
    initHtml:function (data) {
       var htmlStr="";
       for(var i=0;i<data.length;i++){
           var typeStr="";
           switch (data[i].type) {
               case 1:
                   typeStr="java文章";
                   break;
               case 2:
                   typeStr="python文章";
                   break;
               case 3:
                   typeStr="android文章";
                   break;
               case 4:
                   typeStr="其他文章";
                   break;
           }
           htmlStr +=
               ' <tr >'+
               '<td>'+data[i].id+'</td>'+
               '<td>'+data[i].title+'</td>'+
               '<td>'+typeStr+'</td>'+
               '<td>'+data[i].createTime+'</td>'+
               '<td><button data-articleid="'+data[i].id+'"  type="button" class="btn btn-primary btn-sm edit-article "><i class="fa fa-edit"></i> &nbsp;编辑</button>&nbsp;&nbsp;&nbsp;&nbsp;'+
               '<button data-articleid="'+data[i].id+'"   type="button" class="btn btn-danger btn-sm delete-article"><i class="fa fa-trash"></i> &nbsp; 删除</button>'+
               '</td>'+
               '</tr>';
       }
        return htmlStr;
    },
    initPaginator:function(total,pageNum){
        if(total>0){
            $('#jqpage').jqPaginator({
                totalPages: total,
                visiblePages: 10,
                currentPage: pageNum,
                onPageChange: function (num, type) {
                    console.log(type);
                    $("#pageNum").val(num);
                    if(type=="change"){
                        var params = {"pageNum":num};
                        ArticleJs.getData(params,false);
                    }
                },
                first: '<li class="first"><a href="javascript:void(0);">首页<\/a><\/li>',
                prev: '<li class="prev"><a href="javascript:void(0);"><i class="arrow arrow2"><\/i>上一页<\/a><\/li>',
                next: '<li class="next"><a href="javascript:void(0);">下一页<i class="arrow arrow3"><\/i><\/a><\/li>',
                last: '<li class="last"><a href="javascript:void(0);">末页<\/a><\/li>',
                page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>'
            });
        }
    },
    bindEdit:function(){
        $('.edit-article').off('click').on('click', function (e) {
            var articleId = $(this).attr("data-articleid");
            var pageNum = parseInt($("#pageNum").val(),10);
            window.location.href="article?id="+articleId+"&page="+pageNum;
        });
    },
    bindDelete:function(){
        $('.delete-article').off('click').on('click', function (e) {
            var articleId = $(this).attr("data-articleid");
            var pageNum = parseInt($("#pageNum").val(),10);
            window.location.href="article/delete?article_id="+articleId+"&page="+pageNum;
        });
    }

}