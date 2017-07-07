;define(function(require) {
	require('../../vendor/jquery-cookie.js')
	var uRequest = require('./uRequest');
	var uWebApi = {}
	var Authorization = $.cookie('Authorization')

	uWebApi.userLogin = function(data){
		return uRequest.post('/oauth/token',data);
	}
	// 用户信息
	// 列表
	uWebApi.getUserList = function(data){
		return uRequest.contentPost2('/bg/user/list',JSON.stringify(data),Authorization);
	}
	// 省份
	uWebApi.getProvinceList = function(data){
		return uRequest.get2('/bg/user/ProvinceList',data,Authorization);
	}
	// 城市
	uWebApi.getCityList = function(data){
		return uRequest.get2('/bg/user/CityList',data,Authorization);
	}
	// 大区
	uWebApi.getRegionList = function(data){
		return uRequest.get2('/bg/user/RegionList',data,Authorization);
	}
	// 删除用户
	uWebApi.delSelectUser = function(data){
		return uRequest.contentPost2('/bg/user/deleteUsers',JSON.stringify(data),Authorization);
	}
	// 导出用户
	uWebApi.exportUser = function(data){
		return uRequest.contentPost2('/bg/user/outPutUsers',JSON.stringify(data),Authorization);
	}

	// 课程勋章
	// 课程列表
	uWebApi.getCourseList = function(data){
		return uRequest.contentPost2('/bg/course/list',JSON.stringify(data),Authorization);
	}
	// 删除课程
	uWebApi.delCourse = function(data){
		return uRequest.contentPost2('/bg/course/deleteCourse',JSON.stringify(data),Authorization);
	}
	// 导出课程
	uWebApi.exportCourse = function(data){
		return uRequest.contentPost2('/bg/course/outPutlist',JSON.stringify(data),Authorization);
	}
	// 课程明细
	uWebApi.getCourseLogs = function(data){
		return uRequest.contentPost2('/bg/course/advancelogs',JSON.stringify(data),Authorization);
	}
	// 删除课程明细
	uWebApi.delCourseLogs = function(data){
		return uRequest.contentPost2('/bg/course/deleteAdvanceLog',JSON.stringify(data),Authorization);
	}
	// 导出课程明细
	uWebApi.exportCourseLogs = function(data){
		return uRequest.contentPost2('/bg/course/OutPutAdvancelogs',JSON.stringify(data),Authorization);
	}
	// 用户勋章
	uWebApi.getBadges = function(data){
		return uRequest.contentPost2('/bg/user/Badges',JSON.stringify(data),Authorization);
	}
	// 导出用户勋章
	uWebApi.exportBadges = function(data){
		return uRequest.contentPost2('/bg/user/OutPutBadges',JSON.stringify(data),Authorization);
	}
	// 获取配置
	uWebApi.getCourseSetting = function(data){
		return uRequest.contentPost2('/bg/system/get',JSON.stringify(data),Authorization);
	}
	// 更新配置
	uWebApi.updateCourseSetting = function(data){
		return uRequest.contentPost2('/bg/system/update',JSON.stringify(data),Authorization);
	}

	// 个人PK
	// PK日志
	uWebApi.getPklogs = function(data){
		return uRequest.contentPost2('/bg/pk/pklog-list',JSON.stringify(data),Authorization);
	}
	// 获取PK题库
	uWebApi.getPktopic = function(data){
		return uRequest.get2('/bg/pk/questions-list',data,Authorization);
	}
	// 删除PK题目
	uWebApi.delPktopic = function(data){
		return uRequest.contentPost2('/bg/pk/questions-delete',JSON.stringify(data),Authorization);
	}
	// 上传PK题库
	uWebApi.uploadPktopic = function(data){
		return uRequest.contentPost2('/bg/pk/questions-upload',JSON.stringify(data),Authorization);
	}
	// 获取PK时间段
	uWebApi.getPkTimes = function(data){
		return uRequest.contentPost2('/bg/pk/allowtime-list',JSON.stringify(data),Authorization);
	}
	// 设置PK时间段
	uWebApi.setPkTime = function(data){
		return uRequest.contentPost2('/bg/pk/setallowtime',JSON.stringify(data),Authorization);
	}
	// 删除PK时间段
	uWebApi.delPkTime = function(data){
		return uRequest.contentPost2('/bg/pk/allowtime-delete',JSON.stringify(data),Authorization);
	}


	// 用户积分列表
	uWebApi.UserScorelist = function(data){
		return uRequest.contentPost2('/bg/score/UserScorelist',JSON.stringify(data),Authorization);
	}
	// 导出用户积分
	uWebApi.OutPutUserScorelist = function(data){
		return uRequest.contentPost2('/bg/score/OutPutUserScorelist',JSON.stringify(data),Authorization);
	}
	// 删除用户积分
	uWebApi.deleteUserScore = function(data){
		return uRequest.contentPost2('/bg/score/deleteUserScore',JSON.stringify(data),Authorization);
	}

	// 用户积分明细
	uWebApi.ScoreLoglist = function(data){
		return uRequest.contentPost2('/bg/score/ScoreLoglist',JSON.stringify(data),Authorization);
	}
	// 导出用户明细
	uWebApi.OutPutScoreLoglist = function(data){
		return uRequest.contentPost2('/bg/score/OutPutScoreLoglist',JSON.stringify(data),Authorization);
	}
	// 删除积分明细
	uWebApi.deleteScoreLog = function(data){
		return uRequest.contentPost2('/bg/score/deleteScoreLog',JSON.stringify(data),Authorization);
	}

	// 门店积分明细
	uWebApi.StoreScorelist = function(data){
		return uRequest.contentPost2('/bg/score/StoreScorelist',JSON.stringify(data),Authorization);
	}
	// 导出门店明细
	uWebApi.OutPutStoreScorelist = function(data){
		return uRequest.contentPost2('/bg/score/OutPutStoreScorelist',JSON.stringify(data),Authorization);
	}

	// 领取日志列表
	uWebApi.prizelogs = function(data){
		return uRequest.contentPost2('/bg/prize/logs',JSON.stringify(data),Authorization);
	}
	// 领取日志导出
	uWebApi.OutPutLogs = function(data){
		return uRequest.contentPost2('/bg/prize/OutPutLogs',JSON.stringify(data),Authorization);
	}

	// 获取奖品列表
	uWebApi.prizeList = function(data){
		return uRequest.get2('/bg/prize/list',JSON.stringify(data),Authorization);
	}
	// 奖品删除
	uWebApi.prizeDelete = function(data){
		return uRequest.contentPost2('/bg/prize/delete',JSON.stringify(data),Authorization);
	}
	// 奖品添加与修改
	uWebApi.prizeEdit = function(url,data){
		return uRequest.contentPost2(url,JSON.stringify(data),Authorization);
	}

	


	return uWebApi
})
