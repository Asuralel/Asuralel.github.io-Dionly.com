/*//首页
jQuery(function($){
    console.log('home');
});*/

// 重点：管理模块之间的依赖性，便于代码的编写和维护

// @配置
require.config({
    // baseUrl:
    
    // 配置短路径（别名）
    paths:{
        jquery:'../lib/jquery-3.1.1',
        common:'requireCommon'
    },

    // 配置依赖
    shim:{
       
    }
});


/*
    @引入入模块
        * require.js把每个js文件当作一个模块
    require()
        * 第一个参数（Array）：依赖的模块（这里的模块加载顺序不确定）
            * 引入的模块如果有js后缀名，则忽略baseUrl
        * 第二个参数（Function）：回调函数，当第一个参数内所有的模块加载完成后执行
    基础路径baseUrl：
        js/

 */
require(['jquery','common'],function($,com){
    //jquery加载完成后，执行这里的代码
    $(function($){
        $('.footer').load('../index.html #commonfooter',function(){
        });
        $('header').load('../index.html #header');

        //---------------------验证码-------------------------------
        $("#getcode_char").click(function() {
            $(this).attr("src", '../api/reg.php?' + Math.random());

        });
        $("#regimgcode").blur(function() {

            var code_char = $("#regimgcode").val();

            $.ajax({
                type:"POST",
                url:"../api/regCheck.php",
                async:true,
                data:'code_char='+code_char,
                success:function(msg) {
                    if (msg == 1) {
                        $('#regimgcodeerror').css({'color':'green'}).text("验证码正确！").attr('succd',true);
                    } else {
                        $('#regimgcodeerror').css({'color':'red'}).text("验证码错误！");
                    }
                }
            });
        });
        //------------手机号------------------------------------------------
        $('#regname').on('blur',function(){
            var _phone = $('#regname').val();
            if(!/^1[34578]\d{9}$/.test(_phone)){
                $('#regnameerror').css({'color':'red'}).text("请输入正确的手机号码！");
            }
            else{
                $('#regnameerror').css({'color':'green'}).text("手机号码正确！").attr('succd',true);

            }
        })
        //-------------密码-------------------------------------------------------
        $('#regpass').on('blur',function(){
            var regpass = $('#regpass').val();
            if(!/^(?=.*\d.*)(?=.*[a-zA-Z].*).{6,20}$/.test(regpass)){
                $('#regpasserror').css({'color':'red'}).text("设置密码为6-20位且包含字母和数字！");
            }
            else{
                $('#regpasserror').css({'color':'green'}).text("密码设置成功！").attr('succd',true);
            }
        })
        $('#regword').on('blur',function(){
            var regword = $('#regword').val();
            if(regword!==$('#regpass').val()){
                $('#regworderror').css({'color':'red'}).text("确认密码与设置密码不一致！");
            }
            else{
                $('#regworderror').css({'color':'green'}).text("确认密码成功！").attr('succd',true);
            }
        })
        //-------------注册成功----------------------------------------------------------
        $('.regbutnitem').click(function(){

            if($('#regnameerror').attr('succd')&&$('#regimgcodeerror').attr('succd')&&$('#regpasserror').attr('succd')&&$('#regworderror').attr('succd')&&$('#regread')[0].checked){
                //---------写入账户密码Cookie------
                var date = new Date();
                date.setDate(date.getDate()+7);
                document.cookie = 'username=' + $('#regname').val() + ';expires=' + date.toString() + ';path=/';
                document.cookie = 'password=' + $('#regpass').val() + ';expires=' + date.toString() + ';path=/';
                alert("注册成功！");
                //------跳转-------
                self.location='../index.html';
            }
        })
        
    });
});