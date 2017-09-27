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
        //------------------加载头部和底部------------------------------------
        $('.footer').load('common.html #commonfooter',function(){
            //返回顶部
            $('#totops').click(function(){
                window.scrollTo(0,0);
            })
        });

        com.loadHeader();
        //------加载头部底部完成-----------------------------------------------
        //读取Cookie中的账户密码
        var cookies = document.cookie;
        var username;
        var password;
        if(cookies.length>0){
            cookies = cookies.split('; ');
            cookies.forEach(function(cookie){
                var temp = cookie.split('=');
                if(temp[0] === 'username'){
                    username = temp[1];
                }
                else if(temp[0] === 'password'){
                    password = temp[1];
                }
            })
        }
        //验证手机号是否存在
        $('#loginname').blur(function(){
            if($('#loginname').val()==username){
                $('#loginnameerror').css({'color':'green'}).text("手机号码正确！").attr('succd',true);
            }
            else{
                $('#loginnameerror').css({'color':'red'}).text("手机号码不存在！");
            }
        })
        //验证密码是否正确
        $('#loginpass').blur(function(){
            if($('#loginpass').val()==password){
                $('#loginpasserror').css({'color':'green'}).text("可以登录了！").attr('succd',true);
            }
            else{
                $('#loginpasserror').css({'color':'red'}).text("密码错误！");
            }
        })
        //-------------登录成功----------------------------------------------------------
        $('.loginbutnitem').click(function(){

            // if($('#loginnameerror').attr('succd')&&$('#loginpasserror').attr('succd')){

            //     alert("登录成功！");
            //     //------跳转-------
            //     self.location='../index.html';
            // }


            $.ajax({
                url:"../api/login.php",
                async:true,
                data:'username='+username+'&password='+password,
                success:function(msg){
                    if(msg=='fail'){
                        alert("手机号码或密码错误！");
                    }else if(msg=='ok'){
                        alert("登录成功！");
                        // ------跳转-------
                        self.location='../index.html';
                    }
                }
            });


        })



    });
});