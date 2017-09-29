/* 
* @Author: Marte
* @Date:   2017-09-26 20:42:56
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-29 20:56:01
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
       xzoom:['jquery']
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
require(['jquery','common','xzoom'],function($,com){
    //jquery加载完成后，执行这里的代码
    //获取传递过来的参数
    var params = location.search;
    params = decodeURI(params).slice(1).split('&');
    var res={} ;
    $(params).each(function(idx,item){
        res[item.split('=')[0]] = item.split('=')[1];
    })
    $('title').text(res.name);
    
    $(function($){
        //------------------加载头部和底部------------------------------------
        com.loadFooter();
        com.loadHeader();
        //------加载头部底部完成-----------------------------------------------
        
        //设置商品详细信息
        $('.ui-zoom-pad img').attr({src:res.imgurl});
        $('.list .bold').text(res.name+'-'+res.identifier);
        $('#market .market').text(res.price);
        $('#itemprice').text(res.sale_price);
        $('#fweight span')[0].innerText=res.diamond_qty;
        $('#fweight span')[1].innerText=res.weight;

        //-----最近浏览记录----写入商品Cookie------
        var goodslist = {};
        goodslist['name']=res.name;
        goodslist['imgurl']=res.imgurl;
        var hotgoods=[];
        if(com.cookieGet('hotgoods').length>0){
            hotgoods = JSON.parse(com.cookieGet('hotgoods'));
        }
        hotgoods.unshift(goodslist);

        var date = new Date();
        date.setDate(date.getDate()+1);
        document.cookie = 'hotgoods=' + JSON.stringify(hotgoods) + ';expires=' + date.toString() + ';path=/';

        var store='';
        $(hotgoods).each(function(idex,item){

            store+=`
                <div class="hotsimgs"><a href="#"><img src="${item.imgurl}" alt=""></a></div>
                <div class="hotstext"><a href="#">${item.name}</a></div>
            `;
        })

        $('#looklist').html(store);
        //------------------------------------------------------
        $('#ui-product-wrap li:nth-child(2) img').attr({src:res.imgurl});
        $('#productname').text(res.name);

        //----------------------小图操作-------------------------
        $('.jcarousel-prev').click(function(){
            var ulleft = $('#ui-product-wrap').css('left');
            if(parseInt(ulleft)<-97){
                this.disabled='disabled';
            }else{
                $('#ui-product-wrap').animate({left:parseInt(ulleft)-97});  
            }
        });
        $('.jcarousel-next').click(function(){
            var ulleft = $('#ui-product-wrap').css('left');
            if(parseInt(ulleft)>-97){
                this.disabled='disabled';
            }else{
                $('#ui-product-wrap').animate({left:parseInt(ulleft)+97});
            }
        })
        $('.ui-zoom-pad img')[0].setAttribute('data-big', res.imgurl);
        $('#ui-product-wrap a').click(function(){
            this.className='ui-zoom-active';
            $(this).parent().siblings().children().attr({class:''});
            $('.ui-zoom-pad img').attr({src:this.children[0].src});
            $('.ui-zoom-pad img')[0].setAttribute('data-big', this.children[0].src);
            xZoom();
        })
        
        xZoom();

        // 点击加入购物车，用cookie写入
        $('.addtocart_zuan').click(function(){
            var cookie = com.cookieGet('cargoods');
            var carlist=[];
            if(cookie.length>0){
                carlist = JSON.parse(cookie);
            }

            var has = false;
            for(var i=0;i<carlist.length;i++){
                // 已经存在
                if(carlist[i].name === res.name){
                    carlist[i].qty++;
                    has=true;
                    break;
                }
            }

            // 不存在
            if(!has){
                var goods = {
                    name:res.name,
                    imgurl:res.imgurl,
                    identifier:res.identifier,
                    price:res.price,
                    sale_price:res.sale_price,
                    weight:res.weight,
                    qty:1
                }

                carlist.push(goods);
            }

            var date = new Date();
            date.setDate(date.getDate()+1);
            document.cookie = 'cargoods=' + JSON.stringify(carlist) + ';expires=' + date.toString() + ';path=/';
        })
    });
});