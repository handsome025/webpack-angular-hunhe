webpackJsonp([10],{

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var global = __webpack_require__(2)
var uWebApi = __webpack_require__(3)
var common = __webpack_require__(1)

$('body').attr('ng-app','app')
$('body').attr('ng-controller','indexController')


angular.module('app', [])
.controller('indexController', ['$scope', function($scope) {
	$scope.username = ''
	$scope.password = ''
	$scope.userLogin = function(){
		if($scope.username == ''){
			Site.alert('请输入用户名')
			return
		}
		if($scope.password == ''){
			Site.alert('请输入密码')
			return
		}
		Site.loading(true)
		uWebApi.userLogin({
			grant_type:'password',
			username:$scope.username,//admin
			password:$scope.password//Password123
		})
		.always(function(){
			Site.loading(false)
		})
		.then(function(res){
			console.info(res)
		},function(res){
			console.info(res.responseText)
			if(res.status == 400){
				var errtext = JSON.parse(res.responseText)
				Site.alert(errtext.error_description)
			}else{
				$.cookie('adminname',$scope.username,{path:'/'})
				$.cookie('Authorization',res.token_type+' '+res.access_token,{path:'/'})
				window.location.href = 'index.html'
			}
		})
	}
	$(document).keydown(function(e){
		var code = e.which;
		if(code == 13){
			$scope.userLogin()
		}
	});
}]);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })

},[21]);