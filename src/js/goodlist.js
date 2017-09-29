/* 
* @Author: Marte
* @Date:   2017-09-26 14:32:18
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-29 20:01:48
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
    //------------------加载头部和底部------------------------------------
    com.loadFooter();
    com.loadHeader();
    //------加载头部底部完成-----------------------------------------------
    //jquery加载完成后，执行这里的代码
    $(function($){
        
        //点击商品进入商品详情
        function godetials(msg){
            $('.wraperitem').click(function(){
                
                var params='';
                $.each(msg.data[$(this).index()],function(key,val){
                    params += key + '=' + val + '&';
                })
                params = params.slice(0,-1);
                location.href="details.html?" + params;
            })
        }

        function showgoods(msg){
            var store='';
            $(msg.data).each(function(index,item){
                store += `
                    <div class="wraperitem">
                         <div class="itemimg"><a title="${item.name}"><img src="${item.imgurl}" title="${item.name}" alt="${item.name}"></a></div>
                         <div class="itemname"><a title="${item.name}">${item.name}（${item.identifier}）</a></div>
                        <div class="itemprice"> <div class="pricemarket">市场价：<span style="text-decoration:line-through;">￥${item.price}</span></div>
                         <div class="pricemember">商城价：<span>￥${item.sale_price}</span></div> </div>
                     </div>
                `
            })
            $('#jietuolist').html(store);
            
            
            godetials(msg);
        }
        function showpage(msg){
            
            var page = `
                <span>共${msg.total}款&nbsp;|&nbsp;${msg.qty}款/页&nbsp;|&nbsp;第1页/共${Math.ceil(msg.total/msg.qty)}页</span>
            `;
            var pagenum = '';
            for(var i=0;i<Math.ceil(msg.total/msg.qty);i++){
                if(i==0){
                    pagenum+=`<a class="c">${i+1}</a>`;
                }else{
                    pagenum+=`<a>${i+1}</a>`;
                }
            }
            $('#jietuopage').html(page+pagenum+'<a>下页</a>');
            $('#toppagelists').html(page+pagenum+'<a>下页</a>');
        }
        $.ajax({url:'../api/goodslist.php',
            data:{pageNo:1,
                qty:15
            },
            success:function(msg){
                var msg = JSON.parse(msg);
                showgoods(msg);
                showpage(msg);
                var pageNo;
                pageNo=msg.pageNo*1;
                $('#toppagelists a').click(function(){
                    var text = $(this).text();    
                    if(text=='下页'){
                        pageNo++;
                        if(pageNo>Math.ceil(msg.total/msg.qty)){
                            pageNo=1;
                        }
                    }else{
                        pageNo=text;              
                    }

                    $.ajax({url:'../api/goodslist.php',
                        data:{'pageNo':pageNo,
                            'qty':15
                        },
                        success:function(msg){
                            var msg = JSON.parse(msg);
                            showgoods(msg);
                        }
                    })
                })
            }
        })

        //点击商品类型，显示所有该类型
        $('.w030').click(function(){

            $.ajax({url:'../api/goodstype.php',
                data:'type=%27'+$(this).children().text()+'%27',
                success:function(msg){
                    var msg = JSON.parse(msg);
                    showgoods(msg);
                    showpage(msg);
                    var pageNo;
                    pageNo=msg.pageNo*1;
                    var thethis = this ;
                    $('#toppagelists a').click(function(){
                        var text = $(this).text();    
                        if(text=='下页'){
                            pageNo++;
                            if(pageNo>Math.ceil(msg.total/msg.qty)){
                                pageNo=1;
                            }
                        }else{
                            pageNo=text;              
                        }
                        console.log(this)
                        $.ajax({url:'../api/goodstype.php',
                            data:'type=%27'+$(thethis).children().text()+'%27&pageNo='+pageNo+'&qty=15',
                            success:function(msg){
                                console.log(msg)
                                var msg = JSON.parse(msg);
                                showgoods(msg);
                            }
                        })
                    })
                }.bind(this)
            })
        })
        // 搜索相关价格商品
        
        $('.w080').click(function(){
            var price = $(this).children().text().split('-');
            price[1] = price.length==2 ? price[1] : 20000;
            $.ajax({url:'../api/goodsprice.php',
                data:'low_price='+price[0]+'&high_price='+price[1],
                success:function(msg){
                    var msg = JSON.parse(msg);
                    showgoods(msg);
                    showpage(msg);
                    var pageNo;
                    pageNo=msg.pageNo*1;
                    $('#toppagelists a').click(function(){
                        var text = $(this).text();    
                        if(text=='下页'){
                            pageNo++;
                            if(pageNo>Math.ceil(msg.total/msg.qty)){
                                pageNo=1;
                            }
                        }else{
                            pageNo=text;              
                        }

                        $.ajax({url:'../api/goodsprice.php',
                            data:{'pageNo':pageNo,
                                'qty':15,
                                low_price:price[0],
                                high_price:price[1]
                            },
                            success:function(msg){
                                var msg = JSON.parse(msg);
                                showgoods(msg);
                            }
                        })
                    })
                }
            })
        })
        // 点击搜索关键字商品并返回
        $('.submit').click(function(){
            var keyword = $('#keyword').val();
            $.ajax({url:'../api/search.php',
                data:'keyword='+keyword,
                success:function(msg){
                    var msg = JSON.parse(msg);
                    showgoods(msg);
                    showpage(msg);
                    var pageNo;
                    pageNo=msg.pageNo*1;
                    $('#toppagelists a').click(function(){
                        var text = $(this).text();    
                        if(text=='下页'){
                            pageNo++;
                            if(pageNo>Math.ceil(msg.total/msg.qty)){
                                pageNo=1;
                            }
                        }else{
                            pageNo=text;              
                        }

                        $.ajax({url:'../api/search.php',
                            data:'keyword=%27'+keyword+'%27pageNo='+pageNo+'qty=15',
                            success:function(msg){
                                var msg = JSON.parse(msg);
                                showgoods(msg);
                            }
                        })
                    })
                }
            })
        })
        // 商品分类手风琴
        $('.defaultdehead').click(function(){
            if($(this).attr('class')=='defaultdehead nodeshow'){
                $(this).next().attr({class:'cdlink selectedalink'});
                $(this).attr({class:'defaultdehead nodehide'}).parent().next().slideDown();
            }else{
                $(this).next().attr({class:'cdlink'});
                $(this).attr({class:'defaultdehead nodeshow'}).parent().next().slideUp();
            }
        })

        
    });
});