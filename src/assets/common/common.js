/**
 * 封装公共方法
 */
import XLSX from "xlsx";

export default {
    // 日期格式化
    dayIdFormatter(dt, fmt) {
        var o = {
            "M+": dt.getMonth() + 1,                 //月份
            "d+": dt.getDate(),                    //日
            "h+": dt.getHours(),                   //小时
            "m+": dt.getMinutes(),                 //分
            "s+": dt.getSeconds(),                 //秒
            "q+": Math.floor((dt.getMonth() + 3) / 3), //季度
            "S": dt.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (dt.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    // 天数加减
    getDateDayPlus(addDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate() + addDayCount);//获取AddDayCount天后的日期
        return dd
    },
    getDateDayPlusByDate(date, addDayCount) {
        date.setDate(date.getDate() + addDayCount);//获取AddDayCount天后的日期
        return date
    },
    // 月份加减
    getDateMonthPlus(addMonthCount) {
        var d = new Date();
        d.setMonth(d.getMonth() + addMonthCount);
        return d;
    },
    // 返回当前月一号日期
    getDateFirstDay() {
        var dd = new Date();
        var year = dd.getFullYear();
        var month = dd.getMonth();
        var d = new Date(year, month, 1)
        return d;
    },
    hoursConvert(hours) {
        if (hours == undefined || hours == null || hours == '') {
            return '00:00'
        }
        if (Number(hours) >= 0 && Number(hours) <= 9) {
            return '0' + hours + ':00'
        } else if (Number(hours) >= 10 && Number(hours) <= 24) {
            return hours + ':00'
        }
    },
    // 将带有层级的数组转化为树状结构，children->id->pid
    toTree(data) {
        let result = []
        if (!Array.isArray(data)) {
            return result
        }
        data.forEach(item => {
            delete item.children;
        });
        // 利用hashtable的思想映射下标
        let map = {};
        data.forEach(item => {
            map[item.id] = item;
        });
        data.forEach(item => {
            let parent = map[item.pId];
            if (parent) {
                (parent.children || (parent.children = [])).push(item);
            } else {
                if (item.gridLevel == 1)
                    result.push(item);
            }
        });
        return result;
    },
    // 提示友好的console
    console(level, msg) {
        // 根据四种级别打印不同颜色的样式
        const color = new Map([
            ['info', '#909399'],
            ['debug', '#303133'],
            ['warn', '#E6A23C'],
            ['error', '#F56C6C']
        ])
        window.console.log(`%c ${level}: %c ${msg} %c`,
            `background:${color.get(level)} ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff`,
            'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
            'background:transparent')
    },
    //获取主页链接中的参数
    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r) {
            return unescape(r[2]);
        } else {
            return null;
        }
    },
    //获取任务名称
    getTaskName(type) {
        if (type === 9) {
            return "祝福短信";
        }
        if (type === 11) {
            return "外出驻点";
        }
        if (type === 12) {
            return "外出驻点-短信预热";
        }
        if (type === 13) {
            return "外出驻点-短信预热+装维同行";
        }
        if (type === 14) {
            return "流动服务";
        }
        if (type === 15) {
            return "流动服务-短信预热";
        }
        if (type === 16) {
            return "流动服务-短信预热+装维同行";
        }
        if (type === 17) {
            return "终端换机-换机促销";
        }
        if (type === 18) {
            return "终端换机-节日促销";
        }
        if (type === 19) {
            return "终端换机-店庆促销";
        }
        if (type === 20) {
            return "智能终端购买-换机促销";
        }
        if (type === 21) {
            return "智能终端购买-节日促销";
        }
        if (type === 22) {
            return "智能终端购买-店庆促销";
        }
        if (type === 23) {
            return "外出驻点-装维同行";
        }
        if (type === 24) {
            return "流动服务-装维同行";
        }
        if (type === 25) {
            return "预警指标-常客维系任务";
        }
        if (type === 26 || type === 30) {
            return "驻点服务-外呼";
        }
        if (type === 27 || type === 31) {
            return "驻点服务-短信-外呼";
        }
        if (type === 28 || type === 32) {
            return "流动服务-外呼";
        }
        if (type === 29 || type === 33) {
            return "流动服务-短信-外呼";
        }
    },
    //获取任务Type
    getTaskType(taskName) {
        if (taskName === "外出驻点") {
            return 11;
        }
        if (taskName === "外出驻点-短信预热") {
            return 12;
        }
        if (taskName === "外出驻点-短信预热+装维同行") {
            return 13;
        }
        if (taskName === "流动服务") {
            return 14;
        }
        if (taskName === "流动服务-短信预热") {
            return 15;
        }
        if (taskName === "流动服务-短信预热+装维同行") {
            return 16;
        }
        if (taskName === "终端换机-换机促销") {
            return 17;
        }
        if (taskName === "终端换机-节日促销") {
            return 18;
        }
        if (taskName === "终端换机-店庆促销") {
            return 19;
        }
        if (taskName === "智能终端购买-换机促销") {
            return 20;
        }
        if (taskName === "智能终端购买-节日促销") {
            return 21;
        }
        if (taskName === "智能终端购买-店庆促销") {
            return 22;
        }
    },
    //创建报表
    createTable(headers, values, merges, fileName, maxRow) {
        let cols = [
            {wpx: 80},
            {wpx: 80},
            {wpx: 80},
            {wpx: 90},
            {wpx: 80},
            {wpx: 80},
            {wpx: 80},
            {wpx: 90},
            {wpx: 80},
            {wpx: 90},
            {wpx: 80},
            {wpx: 90},
            {wpx: 80},
            {wpx: 80},
            {wpx: 80},
            {wpx: 80},
            {wpx: 90},
            {wpx: 80},
            {wpx: 90},
            {wpx: 80},
            {wpx: 80},
            {wpx: 80},
            {wpx: 90},
            {wpx: 80},
            {wpx: 80},
            {wpx: 80},
            {wpx: 90},
            {wpx: 80},
            {wpx: 90},
            {wpx: 80},
            {wpx: 90},
            {wpx: 80},
            {wpx: 80},
            {wpx: 80},
            {wpx: 80},
            {wpx: 90},
            {wpx: 80},
        ];
        // 合并 headers 和 data
        let output = Object.assign({}, headers, values);

        // 表格范围，范围越大生成越慢
        let ref = 'A1:' + maxRow + (values['size'] + 3);
        // 构建 workbook 对象
        let wb = {
            SheetNames: ['sheet'],
            Sheets: {
                sheet: Object.assign({}, output, {'!ref': ref, '!merges': merges})
            }
        };
        wb.Sheets.sheet["!cols"] = cols;
        // 导出 Excel
        XLSX.writeFile(wb, fileName);
    },
}
