/* 
* @Author: Marte
* @Date:   2017-09-29 19:07:35
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-08 18:37:10
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
        var cookie='';
        var cargoods=[];
        cookie = com.cookieGet('cargoods');
        if(cookie.length>0){

            cargoods = JSON.parse(cookie);
            cargoods.forEach(function(item,idx){
                var store = `
                    <tr class="product">
                        <td class="img"><img width="120" height="120" src="${item.imgurl}"></td>
                        <td class="imgname">${item.name + '（'+item.identifier+'）'}</td>
                        <td class="qty">${item.qty}</td>
                        <td class="weight">${item.weight}</td>
                        <td class="word">${item.name}</td>
                        <td class="unprice" style="text-decoration:line-through;">${item.price*item.qty}</td>
                        <td class="deprice">${(item.price-item.sale_price)*item.qty}</td>
                        <td class="sale_price">${item.sale_price*item.qty}</td>
                        <td class="action"><a>删除</a></td>
                    </tr>
                `
                $('#cartcart table tbody').append(store);

            })
            //点击删除商品
            $('.product .action ').click(function(){
                var inqty = $(this).siblings('.qty').text();
                var price = $(this).siblings('.unprice').text()/inqty;
                var deprice = $(this).siblings('.deprice').text()/inqty;
                var sale_price = $(this).siblings('.sale_price').text()/inqty;
                var index = $('.product').index($(this).parent());
                if(inqty==1){
                   cargoods.splice(index,1);
                   $(this).parent().remove();
                   $('#totalcount').text($('.product').length); 
                }else{
                    cargoods[index].qty-=1;
                    $(this).siblings('.qty').text(inqty-1);
                    $(this).siblings('.unprice')[0].innerText=price*(inqty-1);
                    $(this).siblings('.deprice')[0].innerText=deprice*(inqty-1);
                    $(this).siblings('.sale_price')[0].innerText=sale_price*(inqty-1);

                }
               var date = new Date();
               date.setDate(date.getDate()+1);
               document.cookie = 'cargoods=' + JSON.stringify(cargoods) + ';expires=' + date.toString() + ';path=/';
                countprice();

            })   
            //点击清空所有商品
            $('.clear').click(function(){
               $('.product').remove(); 
               com.cookieRemove('cargoods');
            })
            // 显示商品总数
            $('#totalcount').text(cargoods.length);  
            // -----计算总价-------
            function countprice(){
                var allunprice=0;
                var alldeprice=0;
                $('.unprice').each(function(idx,ele){
                    allunprice+=Number(ele.innerText);
                })
                $('.deprice').each(function(idx,ele){
                    alldeprice+=Number(ele.innerText);
                })
                $('#productmoney').text(allunprice);
                $('#discountmoney').text(alldeprice);
                $('#totalmoney').text((allunprice-alldeprice).toFixed(2));
            }
            countprice();
        }
        //----------------------热门推荐-------------------------
        $('.mainleft').click(function(){
            var ulleft = $('.maincenter ul').css('left');
            if(parseInt(ulleft)<-182*3){
                this.disabled='disabled';
            }else{
                $('.maincenter ul').animate({left:parseInt(ulleft)-182});  
            }
        });
        $('.mainright').click(function(){
            var ulleft = $('.maincenter ul').css('left');
            if(parseInt(ulleft)>=0){
                this.disabled='disabled';
            }else{
                $('.maincenter ul').animate({left:parseInt(ulleft)+182});
            }
        })
    });
});