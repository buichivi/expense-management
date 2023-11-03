import { useState, useRef } from "react";
import { Form } from "react-bootstrap";
import dayjs from "dayjs";
import Graph from "../../components/Graph";
import { DatePicker } from "antd";
import "./StatisticPage.scss";

function StatisticPage({ isDarkMode }) {
    const [chartType, setChartType] = useState(1);
    const [timeType, setTimeType] = useState("week");
    const [year, setYear] = useState();
    const [month, setMonth] = useState()

    const timeSelect = useRef();
    const typeSelect = useRef();

    return (
        <div
            className="statistic"
            style={{
                backgroundColor: "var(--bg-primary-color)",
                width: "85%",
                minHeight: "100%",
                paddingTop: 50,
                margin: '0 auto'
            }}
        >
            <div className="graph_controls">
                <h3 className="graph_controls_heading">Thống kê</h3>
                <div className="option">
                    <DatePicker
                        picker={timeType === 'month' ? 'month' : 'year'}
                        allowClear={false}
                        defaultValue={dayjs(new Date(), "YYYY-MM")}
                        disabled={timeType === "week"}
                        onChange={(moment, date) => {
                            const [yearSelect, monthSelect] = date.split('-')
                            setYear(+yearSelect)
                            setMonth(+monthSelect)
                        }}
                    />
                    <div className="time_option_group">
                        <Form.Select
                            className="time_options"
                            ref={timeSelect}
                            onChange={() =>
                                setTimeType(timeSelect.current.value)
                            }
                            size="lg"
                        >
                            <option className="time_option_item" value="week">
                                Tuần
                            </option>
                            <option className="time_option_item" value="month">
                                Tháng
                            </option>
                            <option className="time_option_item" value="year">
                                Năm
                            </option>
                        </Form.Select>
                    </div>
                    <div className="chart_type_group">
                        <Form.Select
                            className="chart_type_list"
                            ref={typeSelect}
                            onChange={() =>
                                setChartType(+typeSelect.current.value)
                            }
                            size="lg"
                        >
                            <option className="chart_type_item" value="1">
                                Cột
                            </option>
                            <option className="chart_type_item" value="2">
                                Đường
                            </option>
                        </Form.Select>
                    </div>
                </div>
            </div>
            <Graph type={chartType} timeOption={{ timeType, month, year }} isDarkMode={isDarkMode}/>
        </div>
    );
}

export default StatisticPage;
