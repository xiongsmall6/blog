$(function(){

var articleCount = $("#articleCount").val();
var pageNum = $("#pageNum").val();
var type =  $("#type").val();

layui.use(['element','laypage'],function(){
  element = layui.element,laypage = layui.laypage;
  laypage.render({
    elem: 'demo',
    limit: 5,
    curr: pageNum,
    count: articleCount, //数据总数，从服务端得到
    jump: function(obj, first){
           if (!first) {
              window.location.href="./?page="+obj.curr+"&type="+type;
           }
    }
  });
})

$(".type-tab").find("a").click(function(){
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
    var type = $(this).attr("data-type");
    $("#type").val(type);
    var pageNum = $("#pageNum").val();
    window.location.href="./?page="+pageNum+"&type="+type;

})

$(".go-icon").click(function(){
    var id = $(this).attr("data-id");
    var type =$("#type").val();
    var pageNum = $("#pageNum").val();
    window.location.href="./details?id="+id+"&type="+type;
})

});

