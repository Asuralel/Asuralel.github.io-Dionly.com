/* 
* @Author: Marte
* @Date:   2017-09-26 14:32:18
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-26 20:38:46
*/
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
        $('.footer').load('../index.html .footer',function(){
            //城市图片切换
            $('#cityareas #city_shenzhen').css({'color':'#8A0003','background':'url(../css/images/select.gif)'});
            $('#cityareas .name').hover(function(){
                $(this).css({'color':'#8A0003','background':'url(../css/images/select.gif)'});
                $(this).siblings().css({'color':'#222','background':''});
                $('#sitefoot_cityshopwrap .city .cityhide')[$(this).index()].style.display='block';
                $($('#sitefoot_cityshopwrap .city .cityhide')[$(this).index()]).siblings().css({'display':'none'});
                $('#cityshops').attr("src",'images/city'+$(this).index()+'.jpg');
            },function(){
                $(this).css({'color':'#222','background':''});
            })

            //返回顶部
            $('#totops').click(function(){
                window.scrollTo(0,0);
            })
        });
        $('header').load('../index.html #header',function(){

            //城市切换窗口弹出
            $('#qiehuan').click(function(){
                $('.ZebraDialog').fadeIn();
                $('.ZebraDialogOverlay').fadeIn();
                
                return false;
            })
            $('.ZebraDialog_Close').click(function(){
                $('.ZebraDialog').fadeOut();
                $('.ZebraDialogOverlay').fadeOut();
                return false;
            })

        });
        //------加载头部底部完成----------------------------------------------------------
        

        $.ajax({url:'../api/data/goodslist.json',success:function(msg){
            var store='';
            
            $(msg).each(function(index,item){

                
                store += `
                    <div class="wraperitem">
                         <div class="itemimg"><a href="#" target="_blank" title="${item.id}"><img src="${item.imgurl}" title="${item.id}" alt="${item.id}"></a></div>
                         <div class="itemname"><a href="#" target="_blank" title="${item.id}">${item.id}</a></div>
                        <div class="itemprice"> <div class="pricemarket">市场价：<span style="text-decoration:line-through;">￥${item.commentCount}</span></div>
                         <div class="pricemember">商城价：<span>￥${item.price}</span></div> </div>
                     </div>
                `
            })
            
            $('#jietuolist').html(store);

            
            $('.wraperitem').click(function(){
                var params='';
                $.each(msg[$(this).index()],function(key,val){
                    params += key + '=' + val + '&';
                })
                params = params.slice(0,-1);
                location.href="details.html?" + params;
            })
        }})

        
    });
});