import { Column } from "@ant-design/charts";
import { useEffect, useState } from "react";
import useStore from "../../store/hooks";
import dayjs from "dayjs";

window.dayjs = dayjs;

function BarChar({ timeOption, isDarkMode }) {
    const { timeType, month, year } = timeOption;
    const [{ exp_list, exp_types }, dispatch] = useStore();
    const [data, setData] = useState([]);

    const formatDate = 'YYYY-MM-DD';
    const formatMonth = 'YYYY-MM'

    function spendInADay(day) {
        return exp_list.reduce((acc, cur) => {
            return cur.exp_date === day
                ? acc + +cur.exp_spend
                : acc;
        }, 0);
    }

    function spendInAWeek() {
        const result = [];
        const weekDays = [
            "Chủ nhật",
            "Thứ hai",
            "Thứ ba",
            "Thứ tư",
            "Thứ năm",
            "Thứ sáu",
            "Thứ bảy",
        ];
        const today = new Date().getDate();
        const curYear = new Date().getUTCFullYear()
        const curMonth = new Date().getMonth() + 1
        const prevMonth = new Date().getMonth()
        const recentWeek = [];
        for (let i = 6; i >= 0; i--) {
            let day;
            if (today - i <= 0) {
                day = `${curYear}-${prevMonth}-${new Date(curYear, prevMonth, 0).getDate() - (i - today)}`;
            }
            else 
                day = `${curYear}-${curMonth}-${today - i}`
            recentWeek.push(dayjs(day,formatDate).format(formatDate));
        }

        for (let i = 0; i < 7; i++) {
            const date = new Date(recentWeek[i]);
            result.push({
                day:
                    weekDays[date.getDay()] +
                    (recentWeek[i].split('-')[2] == today ? " (Hôm nay)" : ""),
                spend: spendInADay(recentWeek[i]),
            });
        }
        return result;
    }

    // get data in a month
    function daysInCurrentMonth(month, year) {
        const numDays = [];
        const date = new Date(year, month, 0);
        const numDay = date.getDate();

        for (let i = 1; i <= numDay; i++) {
            const day = new Date(year, month - 1, i);
            numDays.push(dayjs(day).format(formatDate));
        }
        return numDays;
    } 

    function getSpendInCurMonth() {
        const result = [];
        const today = new Date();
        const days = daysInCurrentMonth(
            today.getUTCMonth() + 1,
            today.getUTCFullYear()
        );
        for (const day of days) {
            const daySpend = exp_list.reduce((acc, exp) => {
                return exp.exp_date === day ? acc + +exp.exp_spend : acc;
            }, 0);
            result.push({
                day,
                spend: daySpend,
            });
        }
        return result;
    }

    function getSpendByMonth(month, year) {
        const result = [];
        const days = daysInCurrentMonth(month, year);
        for (const day of days) {
            const daySpend = exp_list.reduce((acc, exp) => {
                return exp.exp_date === day ? acc + +exp.exp_spend : acc;
            }, 0);
            result.push({
                day,
                spend: daySpend,
            });
        }
        return result;
    }
    // Get data in current year
    function getSpendInAMonth(month, year) {
        return exp_list.reduce((acc, exp) => {
            return dayjs(exp.exp_date, formatDate).format(formatMonth) ===
                dayjs(`${year}-${month}`, formatMonth).format(formatMonth)
                ? acc + +exp.exp_spend
                : acc;
        }, 0);
    }

    function getSpendInCurYear() {
        const result = [];
        for (let i = 0; i < 12; i++) {
            result.push({
                month: "Tháng " + (i + 1),
                spend: getSpendInAMonth(i + 1, new Date().getFullYear()),
            });
        }
        return result;
    }

    function getSpendByYear(year) {
        const result = [];
        for (let i = 0; i < 12; i++) {
            result.push({
                month: "Tháng " + (i + 1),
                spend: getSpendInAMonth(i + 1, year),
            });
        }
        return result;
    }

    

    // get data in a month

    useEffect(() => {
        switch (timeType) {
            case "week":
                setData(spendInAWeek());
                break;
            case "month":
                if (month) {
                    setData(getSpendByMonth(month, year));
                } else setData(getSpendInCurMonth());
                break;
            case "year":
                if (year) {
                    setData(getSpendByYear(year))
                } else
                    setData(getSpendInCurYear());
                break;
            default:
                break;
        }
    }, [timeType, month, year]);

    const config = {
        data,
        padding: [20, 0, 0, 30],
        appendPadding: 50,
        autoFit: true,
        height: 400,
        minColumnWidth: 20,
        maxColumnWidth: 40,
        color: "#4a69bd",
        xField: timeType !== "year" ? "day" : "month",
        yField: "spend",
        yAxis: {
            label: {
                formatter: (v) =>
                    `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
                style: {
                    fill: isDarkMode ? '#fff' : '#333',
                },
            },
        },
        xAxis: {
            label: {
                autoRotate: false,
                style: {
                    fill: isDarkMode ? '#fff' : '#333',
                    fontSize: 12,
                },
            },
        },

        meta: {
            spend: {
                alias: "Chi tiêu",
            },
        },
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
    return <Column {...finalConfig} />;
}

export default BarChar;
