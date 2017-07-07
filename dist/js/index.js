webpackJsonp([11],{

/***/ 20:
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
	$scope.region = ''
	var per_page = 15
	var province = ''
	var city = ''
	// 用户列表
	getUserList()
	function getUserList(){
		Site.loading(true)
		uWebApi.getUserList({
			page_index:$scope.curr_page,
			page_size:per_page,
			Province:province,
			City:city,
			Region:$scope.region,
			key:$scope.keyword
		})
		.always(function(){
			Site.loading(false)
		})
		.then(function(res){
			$timeout(function(){
				$scope.userlist = res.result.datas
				$scope.total_pages = res.result.page_total
				$scope.total_num = res.result.total
				createPages()
			})
		},function(res){
			Site.alert(res.msg)
		})
	}

	// 省市区初始化
	$('[data-toggle="distpicker"]').distpicker({
    	province:'所在省份',
    	city:'所在城市',
    	// district:'所在区县',
    	autoSelect: false
    })
	// 省份列表
	// getProvinceList()
	function getProvinceList(){
		uWebApi.getProvinceList({})
		.then(function(res){
			$scope.provinceArr = res.result.datas
		})
	}
	// 城市列表
	// getCityList()
	function getCityList(){
		uWebApi.getCityList({})
		.then(function(res){
			$scope.cityArr = res.result.datas
		})
	}
	// 大区列表
	getRegionList()
	function getRegionList(){
		uWebApi.getRegionList({})
		.then(function(res){
			$scope.regionArr = res.result.datas
		})
	}
	// 搜索
	$scope.searchEvent = function(){
		$scope.curr_page = 1
		province = $('#province').val().split('省')[0].split('市')[0].split('壮族自治区')[0].split('回族自治区')[0].split('维吾尔自治区')[0].split('自治区')[0].split('特别行政区')[0]
		city = $('#city').val()
		getUserList()
	}
	// 删除
	$scope.delUser = function(){
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
				uWebApi.delSelectUser({
					deleteIds:arr
				})
				.always(function(){
					Site.loading(false)
				})
				.then(function(res){
					Site.alert(res.msg,function(){
						getUserList()
					})
				},function(res){
					Site.alert(res.msg)
				})
			}
		})
	}
	// 导出
	$scope.exportUser = function(){
		Site.loading(true)
		uWebApi.exportUser({
			Province:province,
			City:city,
			Region:$scope.region,
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
		getUserList()
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
	$scope.cpage = 1
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

},[20]);