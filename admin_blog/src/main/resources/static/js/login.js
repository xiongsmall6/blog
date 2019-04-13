$(document).ready(function () {

    $('#login_btn').on('click', function (e) {
        e.preventDefault();
        login();
    });

    function login(){
        if($.trim($("#user_name").val())==""||$.trim($("#password").val())==""){
            return;
        }
        $.ajax({
            type:"POST",
            url:"login",
            dataType:"json",
            data:{
                'user_name':$("#user_name").val(),
                'password':$("#password").val()
            },
            success:function(data){
                if(data&&data.code==200){
                    $("#login_tips").hide();
                    window.location.href="index"
                }else{
                    $("#login_tips").html(data.msg);
                    $("#login_tips").show();
                }
            },
            error:function(jqXHR){
                console.log("接口异常"+jqXHR.status);
            }
        });
    }
document.onkeydown = function (e) { // 回车提交表单
// 兼容FF和IE和Opera
    var theEvent = window.event || e;
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code == 13) {
        login();
    }
}
});