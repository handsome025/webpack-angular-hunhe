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
	// 课程列表
	getPklogs()
	function getPklogs(){
		Site.loading(true)
		uWebApi.getPklogs({
			page_index:$scope.curr_page,
			page_size:per_page,
			openid:$scope.keyword
		})
		.always(function(){
			Site.loading(false)
		})
		.then(function(res){
			$timeout(function(){
				$scope.loglist = res.datas
				$scope.total_pages = res.page_total
				$scope.total_num = res.total
				createPages()
			})
		},function(res){
			Site.alert(res.msg)
		})
	}

	// 搜索
	$scope.searchEvent = function(){
		$scope.curr_page = 1
		getPklogs()
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
						getPklogs()
					})
				},function(res){
					Site.alert(res.msg)
				})
			}
		})
	}
	// 导出
	$scope.exportCourseLogs = function(){
		Site.loading(true)
		uWebApi.exportCourseLogs({
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
	// 弹层
	$scope.showtan = false
	$scope.pkinfodetail = []
	// console.info($scope.showtan)
	$scope.getLogDetail = function(index){
		$scope.showtan = true
		$scope.pkinfodetail = $scope.loglist[index]
	}

	$scope.prizeSubmit = function(){
		$scope.showtan = true
	}

	// 分页
	$scope.pageClick = function(num){
		$scope.curr_page = num
		getPklogs()
	}
	// 选中行
	$scope.tdclickEvent = function(index,elem){console.info(elem)
		if(elem.toElement.className == 'btn btn-info') return
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
	$scope.cpage = 'PK日志'
	// 头部
	$scope.adminname = $.cookie('adminname')
	$scope.logout = function(){
		$.cookie('adminname','',{path:'/'})
		$.cookie('Authorization','',{path:'/'})
		window.location.href = 'login.html'
	}
}]);
