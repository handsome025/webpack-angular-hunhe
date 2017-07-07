webpackJsonp([8],{

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var global = __webpack_require__(2)
var uWebApi = __webpack_require__(3)
var common = __webpack_require__(1)
__webpack_require__(4)
__webpack_require__(5)

$('body').attr('ng-app','app')
$('body').attr('ng-controller','indexController')


angular.module('app', [])
.controller('indexController', ['$scope','$timeout', function($scope,$timeout) {
	$scope.total_num = 0
	$scope.total_pages = 0
	$scope.curr_page = 1
	$scope.keyword = ''
	var per_page = 15
	// 获取配置
	getPkSetting()
	function getPkSetting(){
		Site.loading(true)
		$.when(
			uWebApi.getCourseSetting({
				name:'pk_personal_limit'
			}),
			uWebApi.getPkTimes({
				name:'pk_personal_limit'
			})
		)
		.always(function(){
			Site.loading(false)
		})
		.then(function(res1,res2){
			$timeout(function(){
				$scope.times = res1.result.Values
				$scope.timearr = res2.result
				$scope.timelen = res2.result.length
			})
		},function(res){
			Site.alert(res.msg)
		})
	}
	// 新增一项
	$scope.addNewTime = function(){
		var tmparr = {}
		$scope.timearr = $scope.timearr.concat(tmparr)
	}
	// 保存
	$scope.submitDayTimes = function(){
		if($scope.times == undefined || !ptn_num.test($.trim($scope.times))){
			Site.alert('每日限参与次数为数字')
		}
		Site.loading(true)
		uWebApi.updateCourseSetting({
			name:'pk_personal_limit',
			value:parseInt($scope.times)
		})
		.always(function(){
			Site.loading(false)
		})
		.then(function(res1,res2){
			Site.alert('更新配置成功')
		},function(res){
			Site.alert(res.msg)
		})
	}
	$scope.submitTime = function(index,item){
		var inputs = $('.div_list').eq(index).find('.btn-primary').siblings('.input_1')
		console.info(inputs.eq(0).val(),inputs.eq(1).val())
		var id = 0
		if(index < $scope.timelen){
			id = index+1
		}
		Site.loading(true)
		uWebApi.setPkTime({
			id:id,
			beginHour:inputs.eq(0).val(),
			endHour:inputs.eq(1).val()
		})
		.always(function(){
			Site.loading(false)
		})
		.then(function(res){
			Site.alert('PK开放时间设置成功')
		},function(res){
			Site.alert(res.msg)
		})
	}
	// 删除
	$scope.deleteTime = function(index){
		console.info(index)
		if(index >= $scope.timelen){
			$scope.timearr.splice(index,1)
			return
		}
		Site.loading(true)
		uWebApi.delPkTime({
			id:index+1
		})
		.always(function(){
			Site.loading(false)
		})
		.then(function(res){
			Site.alert('PK开放时间删除成功',function(){
				$scope.timearr.splice(index,1)
				$scope.$apply()
			})
		},function(res){
			Site.alert(res.msg)
		})
	}

	

	// 分页
	$scope.pageClick = function(num){
		$scope.curr_page = num
		getCourseLogs()
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
	$scope.cpage = 'PK设置'
	// 头部
	$scope.adminname = $.cookie('adminname')
	$scope.logout = function(){
		$.cookie('adminname','',{path:'/'})
		$.cookie('Authorization','',{path:'/'})
		window.location.href = 'login.html'
	}
}]);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })

},[23]);