$(document).ready(function () {


    $('#search_btn').on('click', function (e) {
        var type = $("#content_type").val();
        var comment = $("#comment").val();
        var params = {"type":type,"comment":comment};
        CommentJs.getData(params,true);
    });

    CommentJs.checkSelect();
    CommentJs.checkDelete();
    CommentJs.bindDelete();
    var total = parseInt($("#pageCount").val(),10);
    var pageNum = parseInt($("#pageNum").val(),10);
    CommentJs.initPaginator(total,pageNum);

});

var CommentJs={
    getData:function(params,isSearch){
        $.ajax({
            type:"POST",
            url:"comment/list",
            dataType:"json",
            data:params,
            success:function(data){
                if(data&&data.code==200){
                    var htmlStr = CommentJs.initHtml(data.data.list);
                    $("#comment_list").html(htmlStr);
                    CommentJs.bindDelete();
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
                '<td><input type="checkbox" name="ids[]" value="'+data[i].id+'" class="id-checkbox"></td>'+
                '<td>'+data[i].comment+'</td>'+
                '<td>'+data[i].createTime+'</td>'+
                '<td><button data-commentid="'+data[i].id+'"   type="button" class="btn btn-danger btn-sm delete-comment"><i class="fa fa-trash"></i> &nbsp; 删除</button>'+
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
                        CommentJs.getData(params,false);
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
    bindDelete:function(){
        $('.delete-comment').off('click').on('click', function (e) {
            var commentId = $(this).attr("data-commentid");
            var params = {ids:commentId};
            CommentJs.deleteComment(params);
        });
    },
    checkDelete:function(){
        $('#deleteChecks').off('click').on('click', function (e) {
            var checks = $('input:checkbox:checked');
            var ids = [];
            for(var i=0;i< checks.length;i++){
               var  target =  checks[i];
                if(target.value!=0){
                    ids.push(target.value);
                 }
            }
            var params = {ids:CommentJs.arrString(ids)};
            CommentJs.deleteComment(params);

        });
    },
    checkSelect:function () {
        $(':checkbox[data-check-target]').click(function () {
            var target = $(this).attr('data-check-target');
            $(target).prop('checked', $(this).prop('checked'));
        })
    },
    deleteComment:function (params) {
        $.ajax({
            type:"POST",
            url:"comment/delete",
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
    arrString:function (arr) {
        if(arr==null||arr.length==0){
            return "";
        }
        var str='';
        for(var i=0;i<arr.length;i++){
            str += arr[i]+",";
        }
        str = str.substring(0,str.length-1);
        return str;
    }

}