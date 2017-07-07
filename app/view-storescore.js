var global = require('./service/global')
var uWebApi = require('./service/uWebApi')
var common = require('./common')
require('../vendor/distpicker.data.js')
require('../vendor/distpicker.js')

$('body').attr('ng-app','app')
$('body').attr('ng-controller','indexController')


angular.module('app', [])
.controller('indexController', ['$scope','$timeout', function($scope,$timeout) {
	$scope.total_num = 0
	$scope.total_pages = 0
	$scope.curr_page = 1
	$scope.keyword = ''
	var per_page = 15
	$scope.sortname = 1
	$scope.sortvalue = 0
	init()
	// 课程列表
	StoreScorelist()
	function StoreScorelist(){
		Site.loading(true)
		uWebApi.StoreScorelist({
			page_index:$scope.curr_page,
			page_size:per_page,
			key:$scope.keyword,
			Province:$("#province").val(),
			City:$("#city").val(),
			Region:$("#Region").val()=="全部"?"":$("#Region").val(),
			sortname:$scope.sortname,//	排序字段	1:总积分,0:当月积分
			sortvalue:$scope.sortvalue//	升序降序	1:升，0:降
		})
		.always(function(){
			Site.loading(false)
		})
		.then(function(res){
			$timeout(function(){
				$scope.courselist = res.result.datas
				$scope.total_pages = res.result.page_total
				$scope.total_num = res.result.total
				createPages()
			})
		},function(res){
			Site.alert(res.msg)
		})
		
	}
	function init(){
		// 省市区初始化
		$('[data-toggle="distpicker"]').distpicker({
	    	province:'所在省份',
	    	city:'所在城市',
	    	// district:'所在区县',
	    	autoSelect: false
	    })
	    // 大区
		Site.loading(true)
		uWebApi.getRegionList()
		.always(function(){
			Site.loading(false)
		})
		.then(function(res){
			$timeout(function(){
				var data = res.result.datas
				data.unshift({Region: '全部'})
				$scope.Regionlist = data
				console.info($scope.Regionlist)
				$("#Region").val("全部")
			})
		},function(res){
			Site.alert(res.msg)
		})
	}

    //排序
	$scope.sorting = function(){
		var $this =  $(event.target)
		$scope.sortname = parseInt($this.attr("id"))
		$this.removeClass('sorting_both').siblings('a').addClass('sorting_both').removeClass('sorting_asc').removeClass('sorting_desc')
		if($this.hasClass('sorting_desc')){
			$this.addClass('sorting_asc').removeClass('sorting_desc')
			$scope.sortvalue = 1
		}else{
			$this.addClass('sorting_desc').removeClass('sorting_asc')
			$scope.sortvalue = 0
		}
		StoreScorelist()
	}

	// 搜索
	$scope.searchEvent = function(){
		$scope.curr_page = 1
		StoreScorelist()
	}
	// 删除
	$scope.delCourseLogs = function(){
		var checkbox = $('#table_list [type="checkbox"]:checked')
		console.info(checkbox.length)
		if(checkbox.length == 0){
			Site.alert('没有选中数据')
			return
		}
		Site.confirm('确定要删除选中数据吗？',function(cb){
			if(cb){
				var arr = []
				for(var i=0; i<checkbox.length; i++){
					arr.push(parseInt(checkbox.eq(i).val()))
				}
				Site.loading(true)
				uWebApi.delCourseLogs({
					deleteIds:arr
				})
				.always(function(){
					Site.loading(false)
				})
				.then(function(res){
					Site.alert(res.msg,function(){
						StoreScorelist()
					})
				},function(res){
					Site.alert(res.msg)
				})
			}
		})
	}
	// 导出
	$scope.exportStoreScore = function(){
		Site.loading(true)
		uWebApi.OutPutStoreScorelist({
			key:$scope.keyword
		})
		.always(function(){
			Site.loading(false)
		})
		.then(function(res){
			window.open(res.result)
		},function(res){
			Site.alert(res.msg)
		})
	}

	// 分页
	$scope.pageClick = function(num){
		$scope.curr_page = num
		StoreScorelist()
	}
	// 选中行
	$scope.tdclickEvent = function(index){
		var checkbox = $('#table_list [type="checkbox"]').eq(index)
		var checked = $('#table_list [type="checkbox"]').eq(index).prop('checked')
		checkbox.prop('checked',!checked)
	}
	// 全选
	$scope.checkAllEvent = function(){
		$('#table_list [type="checkbox"]').prop('checked',$scope.checkall)
	}
	// 分页码
	$scope.pagearr = []
	function createPages(){
		var arr = []
		var pagearr = global.paging($scope.curr_page,$scope.total_pages)
		for(var i=pagearr[0]; i<pagearr[1]+1; i++){
			arr.push(i)
		}
		$scope.pagearr = arr
	}
	// 左侧菜单
	$scope.menuItemData = common.menuItemData
	$scope.cpage = '门店积分'
	// 头部
	$scope.adminname = $.cookie('adminname')
	$scope.logout = function(){
		$.cookie('adminname','',{path:'/'})
		$.cookie('Authorization','',{path:'/'})
		window.location.href = 'login.html'
	}
}]);
