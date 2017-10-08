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
		bootstrap:'../lib/Bootstrap4/js/bootstrap.min',
        common:'requireCommon'
	},

	// 配置依赖
	shim:{
		// xcarousel依赖jquery
		bootstrap:['jquery']
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
require(['jquery','bootstrap','common'],function($,bt,com){
	//jquery加载完成后，执行这里的代码
	$(function($){
		//----------获取购物车商品信息，并显示个数----------------
		var res = '';
		var cookies = document.cookie;
		if(cookies.length>0){
			cookies = cookies.split('; ');
			cookies.forEach(function(cookie){
				var temp = cookie.split('=');
				if(temp[0] === 'cargoods'){
					res = temp[1];
				}
			})
		}
		var cartnumber=[];
		if(res.length>0){
			cartnumber = JSON.parse(res);
		}
		$('#sitehead_cartnumber').text(cartnumber.length);
		//轮播图
		$('.carousel').carousel({
		  interval: 4000
		})
		//城市图片切换
		$('#cityareas #city_shenzhen').css({'color':'#8A0003','background':'url(css/images/select.gif)'});
		$('#cityareas .name').hover(function(){
			$(this).css({'color':'#8A0003','background':'url(css/images/select.gif)'});
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
		//城市切换窗口弹出
		$('#qiehuan').click(function(){
			$('.ZebraDialog').show().animate({top:60,opacity:1},500);
			$('.ZebraDialogOverlay').fadeIn();
			return false;
		})
		$('.ZebraDialog_Close').click(function(){
			$('.ZebraDialog').animate({top:30,opacity:0},500,function(){
				$(this).hide();
			});
			$('.ZebraDialogOverlay').fadeOut();
			return false;
		})
		//读取Cookie,显示账户名称，隐藏登录注册，显示注销
		var cookies = document.cookie;
		if(cookies.length>0){
			cookies = cookies.split('; ');
			cookies.forEach(function(cookie){
				var temp = cookie.split('=');
				if(temp[0] === 'username'){
					$('#username').text(temp[1]+'，');
					$('#logout').show();
					$('#rega').hide();
					$('#logina').hide();
				}
			})
		}
		//点击注销，隐藏注销，删除账户名，显示登录注册，清除cookie
		$('#logout').click(function(){
			$('#username').text('');
			$('#logout').hide();
			$('#rega').show();
			$('#logina').show();
			com.cookieRemove('username');
			com.cookieRemove('password');
		})


	})
});
