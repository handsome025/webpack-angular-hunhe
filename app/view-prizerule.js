var global = require('./service/global')
var uWebApi = require('./service/uWebApi')
var common = require('./common')
require('../vendor/distpicker.data.js')
require('../vendor/distpicker.js')
require('../vendor/jquery-form.js')
require("../vendor/bootstrap-3.3.7-dist/js/bootstrap.min");
require("../vendor/bootstrap-3.3.7-dist/js/bootstrap-datetimepicker.min");

$('body').attr('ng-app','app')
$('body').attr('ng-controller','indexController')

var imgpath = 'http://'+window.location.host+'/Image/'
	uploadEvent()
	function uploadEvent() {
		var ischoose = false
		var _URL = window.URL || window.webkitURL
		$('.upload').off('change')
		$('.upload').on('change', function () {
			var $this = $(this)
			if($this.val() == ''){
				ischoose = false
				return
			}
			var options = {
				beforeSubmit: showRequest,
				success: showResponse,
				url: "/bg/prize/image",
				dataType: 'json'
			}
			$this.parent('form').ajaxForm(options)
			$('.upload').next('[type="submit"]').click()
			ischoose = true
		})
		/*$('.upload').next('.btn-info').on('click',function(){
			if(!ischoose){
				Site.alert('请选择文件')
				return false
			}
		})*/
	}

	var _image = ''

	function showRequest(formData, jqForm, options) {
		console.info(formData,jqForm,options)
		var queryString = $.param(formData)
	}

	function showResponse(res) {
		console.info(res)
		$('#Img').attr('src',imgpath+res.result)
		Site.alert(res.msg,function(){
			$('.upload').val('')
		})
	}

angular.module('app', [])
.controller('indexController', ['$scope','$timeout', function($scope,$timeout) {
	$scope.total_num = 0
	$scope.total_pages = 0
	$scope.curr_page = 1
	$scope.keyword = ''
	var per_page = 15
	$scope.showtan = false
	init()
	// 课程列表
	prizeList()
	function prizeList(){
		Site.loading(true)
		uWebApi.prizeList(
		// {
		// 	page_index:$scope.curr_page,
		// 	page_size:per_page,
		// 	key:$scope.keyword
		// }
		)
		.always(function(){
			Site.loading(false)
		})
		.then(function(res){
			$timeout(function(){
				$scope.prizelist = res.result
				// $scope.total_pages = res.result.page_total
				// $scope.total_num = res.result.total
				// createPages()
			})
		},function(res){
			Site.alert(res.msg)
		})
	}

	// // 搜索
	// $scope.searchEvent = function(){
	// 	$scope.curr_page = 1
	// 	prizeList()
	// }
	// 删除
	$scope.delPrize = function(){
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
				uWebApi.prizeDelete({
					deleteIds:arr
				})
				.always(function(){
					Site.loading(false)
				})
				.then(function(res){
					Site.alert(res.msg,function(){
						prizeList()
					})
				},function(res){
					Site.alert(res.msg)
				})
			}
		})
	}

	$scope.prizeSubmit = function(){
		var data = {}
		data.Name = $("#Name").val()
		data.Img = $("#Img").attr("src").split(imgpath)[1]
		data.Score = $("#Score").val()
		data.TotalNumber = $("#TotalNumber").val()
		data.BeginTime = $("#BeginTime").val()
		data.Number = $("#Number").val()
		data.EndTime = $("#EndTime").val()
		var url = "/bg/prize/add"
		if(!is_new){//编辑
			url = "/bg/prize/update"
			data.Id = id
		}
		//奖品上传 编辑
		Site.loading(true)
		uWebApi.prizeEdit(url,data)
		.always(function(){
			Site.loading(false)
		})
		.then(function(res){
			Site.alert(res.msg,function(){
				prizeList()
				$scope.showtan = false
			})
		},function(res){
			Site.alert(res.msg)
		})
	}
	// // 导出
	// $scope.exportCourseLogs = function(){
	// 	uWebApi.exportCourseLogs({
	// 		key:$scope.keyword
	// 	}).then(function(res){
	// 		window.open(res.result)
	// 	},function(res){
	// 		Site.alert(res.msg)
	// 	})
	// }
	
	var is_new = true 
	// 新增
	$scope.addPrize = function(num){
		var date = new Date()
		var year = date.getFullYear()
		var month = date.getMonth() < 10 ? "0"+date.getMonth():date.getMonth()
		var day = date.getDate() < 10 ? "0"+date.getDate():date.getDate()
		$scope.showtan = true
		is_new = true
		$(".prize-rule input").val("")
		$(".prize-rule #Img").attr("src","")

		$("#BeginTime").val(year+"-"+month+"-"+day+" 00:00:00")
		$("#EndTime").val(year+"-"+month+"-"+day+" 00:00:00")
		init()
	}
	
	// 编辑
	var id = ""
	$scope.editPrize = function(num){
		$scope.showtan = true
		is_new = false
		var course = $scope.prizelist[num]
		id = course.Id
		$("#Name").val(course.Name)
		$("#Img").attr("src",course.Img)
		$("#Score").val(course.Score)
		$("#TotalNumber").val(course.TotalNumber)
		$("#Number").val(course.Number)
		$("#BeginTime").val(course.BeginTime.replace(/\//g,"-"))
		$("#EndTime").val(course.EndTime.replace(/\//g,"-"))
		init()
	}

	// 分页
	$scope.pageClick = function(num){
		$scope.curr_page = num
		prizeList()
	}
	// 选中行
	$scope.tdclickEvent = function(index,item){
		if(item.target.className=='btn btn-info') return
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
	$scope.cpage = '领取规则'
	// 头部
	$scope.adminname = $.cookie('adminname')
	$scope.logout = function(){
		$.cookie('adminname','',{path:'/'})
		$.cookie('Authorization','',{path:'/'})
		window.location.href = 'login.html'
	}

	function init(){
		// 日历
		$(".form_start").datetimepicker({
			format: 'yyyy-mm-dd hh:ii:00',
			autoclose: true,
			minView: 0,
			minuteStep: 1,
			initialDate: $("#BeginTime").val()
			})/*.on("click",function(ev){
		    $(".form_datetime_start").datetimepicker("setEndDate", $(".form_datetime_end").val());
		});*/
		$(".form_end").datetimepicker({
			format: 'yyyy-mm-dd hh:ii:00',
			autoclose: true,
			minView: 0,
			minuteStep: 1,
			initialDate: $("#EndTime").val()
		}).on("click",function(ev){
		    $(".form_end").datetimepicker("setStartDate", $(".form_start").val());
		});
	}
}]);
