import { Line } from "@ant-design/charts";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import useStore from "../../store/hooks";

function LineChart({ timeOption, isDarkMode }) {
    const { timeType, month, year } = timeOption;
    const [{ exp_list, exp_types }, dispatch] = useStore();
    const [data, setData] = useState([]);

    const formatDate = "YYYY-MM-DD";
    const formatMonth = "YYYY-MM";

    function spendInADayInWeekByType(day) {
        const weekDays = [
            "Chủ nhật",
            "Thứ hai",
            "Thứ ba",
            "Thứ tư",
            "Thứ năm",
            "Thứ sáu",
            "Thứ bảy",
        ];
        const result = [];
        const expListByDay = exp_list.filter((exp) => exp.exp_date === day);
        const date = new Date(day);
        exp_types.forEach((type, index) => {
            if (type) {
                result.push({
                    day:
                        weekDays[date.getDay()] +
                        (date.getDate() === new Date().getDate()
                            ? " (Hôm nay)"
                            : ""),
                    spend: expListByDay.reduce(
                        (acc, exp) =>
                            exp.exp_type == index ? acc + +exp.exp_spend : acc,
                        0
                    ),
                    type: type,
                });
            }
        });
        return result;
    }

    function spendInAWeekByType() {
        const result = [];
        const recentWeek = [];
        const today = new Date().getDate();
        const curYear = new Date().getUTCFullYear()
        const curMonth = new Date().getMonth() + 1
        const prevMonth = new Date().getMonth()
        for (let i = 6; i >= 0; i--) {
            let day;
            if (today - i <= 0) {
                day = `${curYear}-${prevMonth}-${new Date(curYear, prevMonth, 0).getDate() - (i - today)}`;
            }
            else 
                day = `${curYear}-${curMonth}-${today - i}`
            recentWeek.push(dayjs(day,formatDate).format(formatDate));
        }
        recentWeek.forEach((day) => {
            const spendInADay = spendInADayInWeekByType(day);
            result.push(...spendInADay);
        });
        return result;
    }

    // Month
    function getSpendInADayByType(day) {
        const result = [];
        const expListByDay = exp_list.filter((exp) => exp.exp_date === day);
        exp_types.forEach((type, index) => {
            if (type) {
                result.push({
                    day,
                    spend: expListByDay.reduce(
                        (acc, exp) =>
                            exp.exp_type == index ? acc + +exp.exp_spend : acc,
                        0
                    ),
                    type: type,
                });
            }
        });
        return result;
    }

    function numdaysInAMonth(month, year) {
        const numDays = [];
        const date = new Date(year, month, 0);
        const numDay = date.getDate();

        for (let i = 1; i <= numDay; i++) {
            const day = new Date(year, month - 1, i);
            numDays.push(dayjs(day).format(formatDate));
        }
        return numDays;
    }

    function getSpendInCurMonthByType() {
        const result = [];
        const today = new Date();
        const days = numdaysInAMonth(
            today.getUTCMonth() + 1,
            today.getUTCFullYear()
        );
        for (const day of days) {
            const spendADayByType = getSpendInADayByType(day);
            result.push(...spendADayByType);
        }
        return result;
    }

    function getSpendInMonthByType(month, year) {
        const result = [];
        const days = numdaysInAMonth(month, year);
        for (const day of days) {
            const spendADayByType = getSpendInADayByType(day);
            result.push(...spendADayByType);
        }
        return result;
    }

    // Year
    function getSpendInAMonthByType(month, year) {
        const result = [];
        const expInAMonth = exp_list.filter(
            (exp) =>
                dayjs(exp.exp_date, formatDate).format(formatMonth) ===
                dayjs(`${year}-${month}`, formatMonth).format(formatMonth)
        );
        exp_types.forEach((type, index) => {
            if (type) {
                result.push({
                    month: "Tháng " + month,
                    spend: expInAMonth.reduce((acc, exp) => {
                        return exp.exp_type == index ? acc + +exp.exp_spend : acc;
                    }, 0),
                    type,
                });
            }
        });
        return result;
    }

    function getSpendInCurYearByType() {
        const result = [];
        for (let i = 1; i <= 12; i++) {
            result.push(...getSpendInAMonthByType(i, new Date().getFullYear()));
        }
        return result;
    }

    function getSpendInAYearByType(year) {
        const result = [];
        for (let i = 1; i <= 12; i++) {
            result.push(...getSpendInAMonthByType(i, year));
        }
        return result;
    }

    useEffect(() => {
        switch (timeType) {
            case "week":
                setData(spendInAWeekByType());
                break;
            case "month":
                if (month) {
                    setData(getSpendInMonthByType(month, year));
                } else setData(getSpendInCurMonthByType());
                break;
            case "year":
                if (year) {
                    setData(getSpendInAYearByType(year));
                } else setData(getSpendInCurYearByType());
                break;
            default:
                break;
        }
    }, [timeType, month, year]);
    // const data = spendInAWeekByType();

    // const data = getSpendInCurMonthByType();

    const config = {
        data,
        padding: [20, 0, 0, 30],
        appendPadding: 50,
        xField: timeType !== "year" ? "day" : "month",
        yField: "spend",
        seriesField: "type",
        yAxis: {
            label: {
                formatter: (v) =>
                    `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
                style: {
                    fill: isDarkMode ? '#fff' : '#333',
                },
            },
            position: "left",
        },
        xAxis: {
            label: {
                style: {
                    fill: isDarkMode ? '#fff' : '#333',
                    fontSize: 12,
                },
            },
        },
        lineStyle: {
            lineWidth: 3, // Độ dày của đường
        },
        legend: {
            position: "top",
            padding: [0, 0, 50, 0],
            itemName: {
                style: {
                    fill: isDarkMode ? '#fff' : '#333',
                },
            },
        },
        animation: {
            appear: {
                animation: "path-in",
                duration: 2000,
            },
        },
        tooltip: {},
        scrollbar: () => {
            return (
                timeType === "month" && {
                    type: "horizontal",
                    categorySize: 70,
                    style: {
                        trackColor: "#c9cacd",
                        thumbColor: "#93959a",
                        thumbHighlightColor: "#93959a",
                    },
                }
            );
        },
    };

    const finalConfig = { ...config, scrollbar: config.scrollbar() };
    return <Line {...finalConfig} />;
}

export default LineChart;
