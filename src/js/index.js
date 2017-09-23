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
		bootstrap:'../lib/Bootstrap4/js/bootstrap.min'
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
require(['jquery','bootstrap'],function($,bt){
	//jquery加载完成后，执行这里的代码
	$('.carousel').carousel({
	  interval: 4000
	})

	$('#cityareas #city_shenzhen').css({'color':'#8A0003','background':'url(../src/css/images/select.gif)'});
	$('#cityareas .name').hover(function(){
		$(this).css({'color':'#8A0003','background':'url(../src/css/images/select.gif)'});
		$(this).siblings().css({'color':'#222','background':''});
		$('#sitefoot_cityshopwrap .city .cityhide')[$(this).index()].style.display='block';
		$($('#sitefoot_cityshopwrap .city .cityhide')[$(this).index()]).siblings().css({'display':'none'});
		$('#cityshops').attr("src",'../src/images/city'+$(this).index()+'.jpg');
	},function(){
		$(this).css({'color':'#222','background':''});
	})

});
