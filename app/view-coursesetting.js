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
	// 获取配置
	getCourseSetting()
	function getCourseSetting(){
		Site.loading(true)
		$.when(
			uWebApi.getCourseSetting({
				name:'day_course_limit'
			}),
			uWebApi.getCourseSetting({
				name:'question_correct_score'
			})
		)
		.always(function(){
			Site.loading(false)
		})
		.then(function(res1,res2){
			$timeout(function(){
				$scope.times = res1.result.Values
				$scope.score = res2.result.Values
			})
		},function(res){
			Site.alert(res.msg)
		})
	}

	// 提交配置
	$scope.submitSetting = function(){
		if($scope.times == undefined || !ptn_num.test($.trim($scope.times))){
			Site.alert('每日限参与次数为数字')
		}
		if($scope.score == undefined || !ptn_num.test($.trim($scope.score))){
			Site.alert('每题积分值大小为数字')
		}
		Site.loading(true)
		$.when(
			uWebApi.updateCourseSetting({
				name:'day_course_limit',
				value:parseInt($scope.times)
			}),
			uWebApi.updateCourseSetting({
				name:'question_correct_score',
				value:parseInt($scope.score)
			})
		)
		.always(function(){
			Site.loading(false)
		})
		.then(function(res1,res2){
			Site.alert('更新配置成功')
		},function(res){
			Site.alert(res.msg)
		})
	}

	// 左侧菜单
	$scope.menuItemData = common.menuItemData
	$scope.cpage = '课程设置'
	// 头部
	$scope.adminname = $.cookie('adminname')
	$scope.logout = function(){
		$.cookie('adminname','',{path:'/'})
		$.cookie('Authorization','',{path:'/'})
		window.location.href = 'login.html'
	}
}]);
