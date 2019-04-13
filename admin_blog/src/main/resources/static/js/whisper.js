$(document).ready(function () {

    $('#add_whisper').on('click', function (e) {
        window.location.href="whisper/add"
    });
    $('#search_btn').on('click', function (e) {
        var searchContent = $("#search_content").val();
        var params = {"content":searchContent};
        WhisperJs.getData(params,true);
    });

    WhisperJs.bindEdit();
    WhisperJs.bindDelete();
    var total = parseInt($("#pageCount").val(),10);
    var pageNum = parseInt($("#pageNum").val(),10);
    WhisperJs.initPaginator(total,pageNum);

});

var WhisperJs={

    getData:function(params,isSearch){
        $.ajax({
            type:"POST",
            url:"whisper/list",
            dataType:"json",
            data:params,
            success:function(data){
                if(data&&data.code==200){
                    var htmlStr = WhisperJs.initHtml(data.data.list);
                    $("#whisper_list").html(htmlStr);
                    WhisperJs.bindEdit();
                    WhisperJs.bindDelete();
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

           htmlStr +=
               ' <tr >'+
               '<td>'+data[i].id+'</td>'+
               '<td>'+data[i].content+'</td>'+
               '<td>'+data[i].praise+'</td>'+
               '<td>'+data[i].commentCounts+'</td>'+
               '<td>'+data[i].createTime+'</td>'+
               '<td><button data-whisperid="'+data[i].id+'"  type="button" class="btn btn-primary btn-sm edit-whisper "><i class="fa fa-edit"></i> &nbsp;编辑</button>&nbsp;&nbsp;&nbsp;&nbsp;'+
               '<button data-whisperid="'+data[i].id+'"   type="button" class="btn btn-danger btn-sm delete-whisper"><i class="fa fa-trash"></i> &nbsp; 删除</button>'+
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
                        WhisperJs.getData(params,false);
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
        $('.edit-whisper').off('click').on('click', function () {
            var whisperId = $(this).attr("data-whisperid");
            var pageNum = parseInt($("#pageNum").val(),10);
            window.location.href="whisper/add?id="+whisperId+"&page="+pageNum;
        });
    },
    bindDelete:function(){
        $('.delete-whisper').off('click').on('click', function () {
            var whisperId = $(this).attr("data-whisperid");
            var pageNum = parseInt($("#pageNum").val(),10);
            window.location.href="whisper/delete?whisper_id="+whisperId+"&page="+pageNum;
        });
    }

}