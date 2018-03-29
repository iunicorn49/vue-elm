/**
 * date.getFullYear() + '' 转换成字符串
 */
export function formatDate(date, format) {
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	let obj = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	}
	for (let k in obj) {
		if (new RegExp(`(${k})`).test(format)) {
			let str = obj[k] + ''
			format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : _padLeftZero(str))
		}
	}
	return format
}

function _padLeftZero(str) {
	return ('00' + str).substr()
}