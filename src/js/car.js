/* 
* @Author: Marte
* @Date:   2017-09-29 19:07:35
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-29 21:41:15
*/
/* 
* @Author: Marte
* @Date:   2017-09-26 20:42:56
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-29 09:49:31
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
        com.loadFooter();
        com.loadHeader();
        //------加载头部底部完成-----------------------------------------------
        
        // 获取购物车商品信息，载入cookie
        var cookie = com.cookieGet('cargoods');
        var cargoods = JSON.parse(cookie);
        cargoods.forEach(function(item,idx){
            var store = `
                <tr class="product">
                    <td class="img"><img width="120" height="120" src="${item.imgurl}"></td>
                    <td class="imgname">${item.name + '（'+item.identifier+'）'}</td>
                    <td class="qty">${item.qty}</td>
                    <td class="weight">${item.weight}</td>
                    <td class="word">${item.name}</td>
                    <td class="price" id="price" style="text-decoration:line-through;">${item.price*item.qty}</td>
                    <td class="price" id="deprice">${(item.price-item.sale_price)*item.qty}</td>
                    <td class="price" id="sale_price">${item.sale_price*item.qty}</td>
                    <td class="action"><a>删除</a></td>
                </tr>
            `
            $('#cartcart table tbody').append(store);

        })
        $('.product .action ').click(function(){
            var inqty = $(this).siblings('.qty').text();
            var price = $(this).siblings('#price').text()/inqty;
            var deprice = $(this).siblings('#deprice').text()/inqty;
            var sale_price = $(this).siblings('#sale_price').text()/inqty;
            if(inqty==1){
               $(this).parent().remove(); 
            }else{
                $(this).siblings('.qty').text(inqty-1);
                $(this).siblings('.price')[0].innerText=price*(inqty-1);
                $(this).siblings('.price')[1].innerText=deprice*(inqty-1);
                $(this).siblings('.price')[2].innerText=sale_price*(inqty-1);

            }


        })   


    });
});