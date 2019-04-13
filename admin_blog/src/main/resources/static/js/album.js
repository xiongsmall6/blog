$(document).ready(function () {

    $('#add_album').on('click', function (e) {
        $("#albumId").val('');
        $('#myModal').modal('show');
    });
    $('#search_btn').on('click', function (e) {
        var searchName = $("#search_name").val();
        var searchType = $("#search_type").val();
        var params = {"albumName":searchName};
        if(searchType!="0"){
            params['albumType'] = searchType;
        }
        AlbumJs.getData(params,true);
    });
    $('#addAlbum').off('click').on('click', function () {
        AlbumJs.addAlbum();
    });

    AlbumJs.bindUpload();
    AlbumJs.bindEdit();
    AlbumJs.bindDelete();
    var total = parseInt($("#pageCount").val(),10);
    var pageNum = parseInt($("#pageNum").val(),10);
    AlbumJs.initPaginator(total,pageNum);

    $('#myModal').on('hide.bs.modal', function () {
       //输入框清空值
    })
});

var AlbumJs={

    getData:function(params,isSearch){
        $.ajax({
            type:"POST",
            url:"album/list",
            dataType:"json",
            data:params,
            success:function(data){
                if(data&&data.code==200){
                    var htmlStr = AlbumJs.initHtml(data.data.list);
                    $("#article_list").html(htmlStr);
                    AlbumJs.bindUpload();
                    AlbumJs.bindEdit();
                    AlbumJs.bindDelete();
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
           switch (data[i].albumType) {
               case 1:
                   typeStr="普通相册";
                   break;
               case 2:
                   typeStr="亲子相册";
                   break;
               case 3:
                   typeStr="旅游相册";
                   break;
               case 4:
                   typeStr="情侣相册";
                   break;
           }
           htmlStr +=
               ' <tr >'+
               '<td>'+data[i].id+'</td>'+
               '<td>'+data[i].albumName+'</td>'+
               '<td>'+typeStr+'</td>'+
               '<td>'+data[i].createTime+'</td>'+
               '<td><button data-albumid="'+data[i].id+'"  data-albumname="'+data[i].albumName+'" data-albumtype="'+data[i].albumType+'" type="button" class="btn btn-primary btn-sm edit-album "><i class="fa fa-edit"></i> &nbsp;编辑</button>&nbsp;&nbsp;&nbsp;&nbsp;'+
               '<button data-albumid="'+data[i].id+'"  type="button" class="btn btn-primary btn-sm upload-album "><i class="fa fa-edit"></i> &nbsp;上传图片</button>&nbsp;&nbsp;&nbsp;&nbsp;'+
               '<button data-albumid="'+data[i].id+'"   type="button" class="btn btn-danger btn-sm delete-album"><i class="fa fa-trash"></i> &nbsp; 删除</button>'+
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
                        AlbumJs.getData(params,false);
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
        $('.edit-album').off('click').on('click', function (e) {
            var albumId = $(this).attr("data-albumid");
            var pageNum = parseInt($("#pageNum").val(),10);
            var albumName = $(this).attr("data-albumname");
            var albumType = $(this).attr("data-albumtype");
           // AlbumJs.addAlbum(albumId,pageNum);
            $("#albumId").val(albumId);
            $("#albumName").val(albumName);
            $("#albumType").val(albumType);
            $('#myModal').modal('show');

        });
    },
    bindUpload:function(){
        $('.upload-album').off('click').on('click', function (e) {
            var albumId = $(this).attr("data-albumid");
            var pageNum = parseInt($("#pageNum").val(),10);
            window.location.href="album/pictures?id="+albumId+"&page="+pageNum;
        });
    },
    bindDelete:function(){
        $('.delete-album').off('click').on('click', function (e) {
            var albumId = $(this).attr("data-albumid");
            var pageNum = parseInt($("#pageNum").val(),10);
            window.location.href="album/delete?id="+albumId+"&page="+pageNum;
        });
    },
    addAlbum:function(){
        var albumName =$.trim($("#albumName").val());
        var albumType =$("#albumType").val();
        var createUser =$("#login_user").val();
        var albumId = $("#albumId").val();
        var pageNum = parseInt($("#pageNum").val(),10);
        if(!albumName||!albumType){
            return;
        }
        $.ajax({
            type:"POST",
            url:"album/add",
            dataType:"json",
            data:{"albumName":albumName,"albumType":albumType,"createUser":createUser,"albumId":albumId},
            success:function(data){
                if(data&&data.code==200){
                    if(albumId){
                        window.location.href="go/album?page="+pageNum;
                    }else{
                        window.location.reload();
                    }
                }
                $('#myModal').modal('hide');
            },
            error:function(jqXHR){
                console.log("接口异常"+jqXHR.status);
                $('#myModal').modal('hide');
            }
        });
    }

}