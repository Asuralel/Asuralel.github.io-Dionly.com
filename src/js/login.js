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
        //------------手机号------------------------------------------------
        $('#loginname').on('blur',function(){
            var _phone = $('#loginname').val();
            if(!/^1[34578]\d{9}$/.test(_phone)){
                $('#loginnameerror').css({'color':'red'}).text("手机号码格式不正确！");
            }
            else{
                $('#loginnameerror').text("");

            }
        })
        //-------------密码-------------------------------------------------------
        $('#loginpass').on('blur',function(){
            var loginpass = $('#loginpass').val();
            if(!/^(?=.*\d.*)(?=.*[a-zA-Z].*).{6,20}$/.test(loginpass)){
                $('#loginpasserror').css({'color':'red'}).text("密码格式不正确！");
            }
            else{
                $('#loginpasserror').text("");
            }
        })

        //-------------登录成功----------------------------------------------------------
        $('.loginbutnitem').click(function(){

            var username=$('#loginname').val();
            var password=$('#loginpass').val();

            $.ajax({
                url:"../api/login.php",
                async:true,
                data:'username='+username+'&password='+password,
                success:function(msg){
                    if(msg=='fail'){
                        alert("手机号码或密码错误！");
                    }else if(msg=='ok'){
                        //---------写入账户Cookie------
                        document.cookie = 'username=' + username + ';path=/';
                        if($('#loginauto').prop('checked')){
                            //---------七天免登陆------
                            var date = new Date();
                            date.setDate(date.getDate()+7);
                            document.cookie = 'username=' + username + ';expires=' + date.toString() + ';path=/';

                        }
                        alert("登录成功！");
                        // ------跳转-------
                        self.location='../index.html';
                    }
                }
            });


        })



    });
});