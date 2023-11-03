import { Pie } from "@ant-design/plots";
import useStore from "../../store/hooks";

function PieChart({ isDarkMode }) {
    const [{ exp_list, exp_types }, dispatch] = useStore();

    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    function amountForEachType(list, types) {
        const result = [];
        for (let type of types) {
            if (type) {
                result.push({
                    type,
                    value: +list
                        .filter((cur) => types[cur.exp_type] === type)
                        .reduce((acc, cur) => +acc + +cur.exp_spend, 0),
                });
            }
        }
        return result;
    }
    const data = amountForEachType(exp_list, exp_types)

    const config = {
        appendPadding: 10,
        data,
        angleField: "value",
        colorField: "type",
        radius: 1,
        label: {
            autoRotate: false,
            offset: -60,
            style: {
                fill: isDarkMode ? '#fff' : '#333', // Đổi màu của nhãn thành màu đỏ
                fontSize: 14,
                textAlign: "center",
            },
            type: "inner",
            labelHeight: 10,
            content: "{percentage}",
        },
        legend: {
            itemName: {
                style: {
                    fill: isDarkMode ? '#fff' : '#333', // Đổi màu của nhãn thành màu đỏ
                },
            },
            marker: {
                symbol: "diamond",
            },
        },
        interactions: [
            {
                type: "element-selected",
            },
            {
                type: "element-active",
            },
        ],
        state: {
            active: {
                animate: { duration: 100, easing: "easeLinear" },
                style: {
                    lineWidth: 2,
                    stroke: isDarkMode ? '#fff' : '#333',
                },
            },
        },
        tooltip: {
            formatter: (datum) => {
                return { name: datum.type, value: VND.format(datum.value) };
            },
            fields: ["type", "value"],
        },
    };
    return (
        <div style={{ width: "100%", paddingTop: 50 }}>
            <Pie {...config} />
        </div>
    );
}

export default PieChart;
