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
        jquery:'../lib/jquery-3.1.1'
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
require(['jquery'],function($){
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
            console.log(444444)
            $.ajax({url:"../api/regCheck.php",
                    async:true,
            
                success:function(msg) {
                             if (msg == 1) {
                             console.log("验证码正确！");
                             } else {
                             console.log("验证码错误！");
                             }
                        }
            });
        });
        //------------------------------------------------------------
        $('#regname').on('blur',function(){
            var _phone = $('#regname').val();
            if(!/^1[34578]\d{9}$/.test(_phone)){
                $('#regnameerror').text("请输入正确的手机号码");
            }
            else{
                $('#regnameerror').text("手机号码正确");
            }
        })

        
    });
});