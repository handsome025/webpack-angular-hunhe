;define(function (require, exports) {
	var common = {}
	
	common.loadCommon = function(container,pagename){
		var html = require('../../pages/'+pagename+'/'+pagename+'.html')
		var js = require('../../pages/'+pagename+'/'+pagename+'.js')
		require('../../pages/'+pagename+'/'+pagename+'.scss')
		$(container).html(html)
		$(container).append(js)
		js.init()
	}
	// 生成分页
	common.paging = function(currpage,totalpages){
		var minpage = currpage - 4
		var maxpage = currpage + 4
		minpage < 1 ? minpage = 1 : minpage = minpage
		maxpage > totalpages ? maxpage = totalpages : maxpage = maxpage
		var arr = [minpage,maxpage]
		return arr
	}

	return common
})