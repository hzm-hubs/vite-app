import dayjs from "dayjs";
// import vue from "vue";

// vue3 舍弃了 filter功能
// 类型“typeof import("/Users/huangliuliu/Documents/Code/viteApp/node_modules/vue/dist/vue")”上不存在属性“filter”。
// vue.filter("timeFormatSec", (value: any) => {
//     return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
// });

(dayjs as any).timeFormatSec = (value: any) => {
    return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
};

(dayjs as any).timeFormatJSec = (value: any) => {
    return dayjs(value).format("YYYY-MM-DD HH:mm");
};

(dayjs as any).timeFormatDate = (value: any) => {
    return dayjs(value).format("YY/MM/DD/HH:mm");
};

(dayjs as any).timeFormatDay = (value: any) => {
    return dayjs(value).format("YYYY-MM-DD");
};

(dayjs as any).manyNum = (value: any) => {
    return (value / 10000).toFixed(2);
};

(dayjs as any).percentNum = (value: any) => {
    return (value * 100).toFixed(2) + "%";
};

(dayjs as any).judgeDateType = (value: any) => {
    // 当天最小的时间戳
    let currentTimes = new Date(new Date().toDateString()).getTime();
    let timeDev = Math.abs(value - currentTimes);
    // 判断是否在一当天
    if (value - currentTimes > 0) {
        return {
            result: "isToday",
            finishTime: "今天 " + dayjs(value).format("HH:mm"),
        }; // 当天
    } else if (currentTimes - value < 1000 * 60 * 60 * 24) {
        return {
            result: "isLast",
            finishTime: "昨天 " + dayjs(value).format("HH:mm"),
        }; // 当天
    } else if (timeDev < 1000 * 60 * 60 * 24 * 7) {
        return {
            result: "inWeek",
            finishTime: dayjs(value).format("MM-DD HH:mm"),
        }; // 当天 // 一周内
    } else {
        return {
            result: "more",
            finishTime: dayjs(value).format("YYYY-MM-DD"),
        }; // 较早;
    }
};

export default dayjs;
