/* 
* @Author: Marte
* @Date:   2017-09-26 20:42:56
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-27 10:03:07
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
    //获取传递过来的参数
    var params = location.search;
    params = decodeURI(params).slice(1).split('&');
    var res={} ;
    $(params).each(function(idx,item){
        res[item.split('=')[0]] = item.split('=')[1];
    })
    $('title').text(res.id);
    
    $(function($){




        //------------------加载头部和底部------------------------------------
        com.loadFooter();
        com.loadHeader();
        //------加载头部底部完成-----------------------------------------------

        
    });
});