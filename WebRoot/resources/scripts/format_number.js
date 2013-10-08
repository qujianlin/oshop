/*
 * 数字格式化相关方法
 */

/**
 * 把数字按照规则进行格式化用于显示。
 * 
 * @param num
 *            要格式化的数字
 * @returns {Number}
 */
function formatToMoney(num) {
    return fmoney(num, inputConst.moneyPrecision);
}

/**
 * 将容器内指定偏移量子元素内的数值相加后放入结果元素
 * 
 * @param ctnId
 *            容器id，此方法只实现了table元素。
 * @param offset
 *            偏移量，标识获取第几个元素的内容。
 * @param destId
 *            要写入的元素id
 */
function calSum(ctnId, offset, destId) {
    var sum = 0.00;
    $("#" + ctnId).find("tr td:nth-child(" + offset + ")").each(function() {
        var t = $(this).text();
        if (!t.length)
            return true;
        var amt = restoreFormatCurrency(t);
        if (isFinite(amt))
            sum += parseFloat(amt);
    });
    var text = formatToMoney(sum);
    $("#" + destId).text(text);
    $("#" + destId + "Tip").text(digit_uppercase(text));
}

/**
 * 数据格式化，添加视觉辅助单位。
 * 
 * @param s
 * @param n
 * @returns {Number}
 */
function fmoney(s, n) {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
    t = "";
    for ( var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? inputConst.thousandSepaInput : "");
    }
    return t.split("").reverse().join("") + "." + r;
}

var thousandSepaInputRegex = new RegExp(inputConst.thousandSepaInput, "g");

/**
 * 还原货币格式化函数，去除显示时添加的额外标记。
 * 
 * @param num
 * @returns {Number}
 */
function restoreFormatCurrency(num) {
    return isNaN(num) ? num.replace(inputConst.thousandSepaInput, '').replace(thousandSepaInputRegex, '') : num;
}

var fraction = [ '角', '分' ];
var digit = [ '零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖' ];
var unit = [ [ '元', '万', '亿' ], [ '', '拾', '佰', '仟' ] ];

/**
 * 生成金额的中文大写表示
 * 
 * @param n
 *            阿拉伯金额数字
 * @returns {String}
 */
function digit_uppercase(n) {
	var unit = "千佰拾亿千佰拾万千佰拾元角分", str = "";
	n += "00";
	var p = n.indexOf('.');
	if (p >= 0)
		n = n.substring(0, p) + n.substr(p + 1, 2);
	unit = unit.substr(unit.length - n.length);
	for ( var i = 0; i < n.length; i++)
		str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
	return str.replace(/零(千|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(
			/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(
			/^元零?|零分/g, "").replace(/元$/g, "元整").replace(/^分$/, '零元整'); 
}