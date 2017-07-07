;define(function (require, exports) {
	require('../vendor/angular.min.js')
	require('../vendor/jquery-cookie.js')
	require('./service/site.js')
	require('../css/style.css')
	
	var common = {}

	common.init = function(){
		$('body').css({opacity:1})
	}
    common.init()

    window.ptn_tel = /([0-9]{3,4}-)?[0-9]{7,8}$/i;
    window.ptn_mobi = /^1[3,4,5,7,8]{1}[0-9]{9}$/i;
    window.ptn_email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    window.ptn_chinese = /[^\u4e00-\u9fa5]/i;
    window.ptn_numzimu = /^[A-Za-z0-9]+$/i;
    window.ptn_num = /^\d+$/;
    window.ptn_num2 = /^[\+\-]?((\d(\.?\d{0,2})?)|(\d*\.?\d{0,2}))$/;
    var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
    + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@ 
    + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184 
    + "|" // 允许IP和DOMAIN（域名）
    + "([0-9a-z_!~*'()-]+\.)*" // 域名- www. 
    + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名 
    + "[a-z]{2,6})" // first level domain- .com or .museum 
    + "(:[0-9]{1,4})?" // 端口- :80 
    + "((/?)|" // a slash isn't required if there is no file name 
    + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"; 
    window.ptn_url = new RegExp(strRegex); 

	common.menuItemData = [
		{
    		text: '用户信息',
    		link: 'index.html',
    		childs:[]
    	},{
    		text: '课程勋章',
    		link: '',
    		childs:[
    			{
    				text: '用户课程',
		    		link: 'usercourse.html'
    			},{
    				text: '课程明细',
		    		link: 'coursedetail.html'
    			},{
    				text: '用户勋章',
		    		link: 'userbadges.html'
    			},{
    				text: '课程设置',
		    		link: 'coursesetting.html'
    			}
    		]
    	},{
    		text: '个人PK',
    		link: '',
    		childs:[
    			{
    				text: 'PK日志',
		    		link: 'pklogs.html'
    			},{
    				text: 'PK题库',
		    		link: 'pktopic.html'
    			},{
    				text: 'PK设置',
		    		link: 'pksetting.html'
    			}
    		]
    	},{
    		text: '积分信息',
    		link: '',
    		childs:[
    			{
    				text: '用户积分',
		    		link: 'userscore.html'
    			},{
    				text: '门店积分',
		    		link: 'storescore.html'
    			},{
    				text: '积分明细',
		    		link: 'scoredetail.html'
    			}
    		]
    	},{
    		text: '奖品领取',
    		link: '',
    		childs:[
    			{
    				text: '领取日志',
		    		link: 'prizelogs.html'
    			},{
    				text: '领取规则',
		    		link: 'prizerule.html'
    			}
    		]
    	}
	]
	

	return common
})