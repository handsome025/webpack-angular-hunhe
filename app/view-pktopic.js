var global = require('./service/global')
var uWebApi = require('./service/uWebApi')
var common = require('./common')
require('../vendor/distpicker.data.js')
require('../vendor/distpicker.js')
require('../vendor/jquery-form.js')

$('body').attr('ng-app','app')
$('body').attr('ng-controller','indexController')
	
	uploadEvent()
	function uploadEvent() {
		var ischoose = false
		var _URL = window.URL || window.webkitURL
		$('.file').off('change')
		$('.file').on('change', function () {
			var $this = $(this)
			if($this.val() == ''){
				ischoose = false
				return
			}
			var options = {
				beforeSubmit: showRequest,
				success: showResponse,
				url: "/bg/pk/questions-upload",
				dataType: 'json',
				headers: {
					"Authorization": $.cookie('Authorization'),
					"test":1111111111
				}
			}
			$this.parent('form').ajaxForm(options)
			ischoose = true
		})
		$('.file').next('.btn-info').on('click',function(){
			if(!ischoose){
				Site.alert('请选择文件')
				return false
			}
		})
	}

	var _image = ''

	function showRequest(formData, jqForm, options) {
		console.info(formData,jqForm,options)
		var queryString = $.param(formData)
	}

	function showResponse(res) {
		console.info(res)
		Site.alert(res.msg,function(){
			$('.file').val('')
		})
	}

angular.module('app', [])
.controller('indexController', ['$scope','$timeout', function($scope,$timeout) {
	$scope.total_num = 0
	$scope.total_pages = 0
	$scope.curr_page = 1
	$scope.keyword = ''
	var per_page = 15
	// 课程列表
	getPktopic()
	function getPktopic(){
		Site.loading(true)
		uWebApi.getPktopic({
			page_index:$scope.curr_page,
			page_size:per_page
		})
		.always(function(){
			Site.loading(false)
		})
		.then(function(res){
			$timeout(function(){
				$scope.topiclist = res.datas
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
		getPktopic()
	}
	// 删除
	$scope.delPktopic = function(){
		var checkbox = $('#table_list [type="checkbox"]:checked')
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
				console.info(arr)
				Site.loading(true)
				uWebApi.delPktopic({
					deleteIds:arr
				})
				.always(function(){
					Site.loading(false)
				})
				.then(function(res){
					Site.alert(res.msg,function(){
						getPktopic()
					})
				},function(res){
					Site.alert(res.msg)
				})
			}
		})
	}
	// 导出
	$scope.inportPktopic = function(){
		$('.form').submit()
		return
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

	// 分页
	$scope.pageClick = function(num){
		$scope.curr_page = num
		getPktopic()
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
	$scope.cpage = 'PK题库'
	// 头部
	$scope.adminname = $.cookie('adminname')
	$scope.logout = function(){
		$.cookie('adminname','',{path:'/'})
		$.cookie('Authorization','',{path:'/'})
		window.location.href = 'login.html'
	}
}]);
