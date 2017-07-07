;define(function(require) {
	var uRequest = {}
	var count = 0

	/**
	 * 获取请求数量
	 * @returns {number}
	 */
	uRequest.getCount = function () {
		return count
	}

	/**
	 * 是否本地环境
	 * @returns {Boolean}
	 */
	uRequest.isLocal = function () {
		return /127\.0\.0\.1|localhost|192\./i.test(window.location.hostname)
	}

	/**
	 * 底层ajax请求
	 * @param {Object} options
	 * @returns {*}
	 */
	uRequest.ajax = function (options) {
		var def = $.Deferred()
		count++

		// 如果是本地环境,并且URL非http开始的路径,使用mock数据
		if (uRequest.isLocal() && !/^http/i.test(options.url)) {
			options.url = 'mock' + options.url + '.json'
			options.type = 'GET'
		} else {
			// 非跨域请求 上CDN后 影响接口调用,拼上绝对路径
			if (options.url.indexOf('http') === -1) {
				options.url = window.location.origin + options.url
			}
		}

		$.ajax(options).always(function () {
			count--
		}).then(function (res) {
			Site.loading(false)
			if (res.success) {
				def.resolve(res)
			} else {
				if(res.Message == '已拒绝为此请求授权。'){
					Site.alert('登陆超时，请重新登录',function(){
						window.location.href = 'login.html';
					});
				}else{
					def.reject(res)
				}
			}
		}, function (res) {
			console.info(res)
			Site.loading(false)
			if(res.status == 401){
				Site.alert('登陆超时，请重新登录',function(){
					window.location.href = 'login.html';
				});
			}else{
				def.reject(res)
			}
			/*def.reject({
				success: false,
				errorMsg: '网络繁忙,请稍候重试!'
			})*/
		})

		return def.promise()
	}

	/**
	 * GET请求
	 * @param {String} url
	 * @param {Object|String} [data]
	 * @returns {*}
	 */
	uRequest.get = function (url, data) {
		return uRequest.ajax({
			type: 'GET',
			url: url,
			data: data,
			dataType: 'json'
		})
	}

	/**
	 * JSONP请求forJAVA
	 * @param {String} url
	 * @param {Object|String} [data]
	 * @returns {*}
	 */
	uRequest.getjson = function (type, url, data) {
		return uRequest.ajax({
			type: type,
			url: url,
			data: data,
			dataType: 'json',
			contentType: 'application/json;charset=utf-8'
		})
	}

	/**
	 * JSONP请求
	 * @param {String} url
	 * @param {Object|String} [data]
	 * @returns {*}
	 */
	uRequest.jsonp = function (url, data) {
		return uRequest.get(url + '?jsonpcallback=?', data)
	}

	/**
	 * POST请求
	 * @param {String} url
	 * @param {Object|String} [data]
	 * @returns {*}
	 */
	uRequest.post = function (url, data) {
		return uRequest.ajax({
			type: 'POST',
			url: url,
			data: data,
			dataType: 'json'
		})
	}

	/**
	 * 带文件上传的ajax POST表单提交
	 * @param {String} url
	 * @param {FormData} data
	 * @returns {*} 
	 */
	uRequest.upload = function (url, data) {
		return uRequest.ajax({
			type: 'POST',
			url: url,
			data: data,
			dataType: 'json',
			contentType: false,
			processData: false
		})
	}

	/**
	 * POST请求 with contentType
	 * @param {String} url
	 * @param {Object|String} [data]
	 * @returns {*}
	 */
	uRequest.contentPost = function (url, data) {
		return uRequest.ajax({
			type: 'POST',
			url: url,
			data: data,
			dataType: 'json',
			contentType: 'application/json;charset=utf-8'
		})
	}
	/**
	 * POST请求 with contentType
	 * @param {String} url
	 * @param {Object|String} [data]
	 * @returns {*}
	 */
	uRequest.contentPost2 = function (url, data, Authorization) {
		return uRequest.ajax({
			type: 'POST',
			url: url,
			data: data,
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			headers: {
				"Authorization": Authorization
			}
		})
	}
	/**
	 * GET请求
	 * @param {String} url
	 * @param {Object|String} [data]
	 * @returns {*}
	 */
	uRequest.get2 = function (url, data, Authorization) {
		return uRequest.ajax({
			type: 'GET',
			url: url,
			data: data,
			dataType: 'json',
			headers: {
				"Authorization": Authorization
			}
		})
	}

	return uRequest
})