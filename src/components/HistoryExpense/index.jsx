import { useEffect, useState } from "react";
import { Table, DatePicker } from "antd";
import useStore from "../../store/hooks";
import historyExpStyle from "./HistoryExpenseStyle.module.scss";
import action from "../../store/actions";
import { DELETE_EXPENSE } from "../../store";
import ModalExpenseItem from "../ModalExpenseItem";
const { RangePicker } = DatePicker;

function HistoryExpense() {
    const [{ exp_types, exp_list }, dispatch] = useStore();
    const [showModal, setShowModal] = useState(false);
    const [expId, setExpId] = useState();
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(exp_list.filter((exp) => !!exp_types[exp.exp_type]));
    }, [exp_list]);

    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    function handleOpenEditExpense(e, id) {
        if (
            !(
                e.target.className ===
                document.querySelector(`.${historyExpStyle.detele_exp_icon}`)
                    .className
            )
        ) {
            setShowModal(true);
            setExpId(id);
        }
    }

    function handleDeleteExp(id) {
        dispatch(action(DELETE_EXPENSE, id));
    }

    const columns = [
        {
            title: "Tên khoản chi",
            dataIndex: "exp_name",
            width: "25%",
            render: (name) => (
                <span className={historyExpStyle.limit_text}>{name}</span>
            ),
        },
        {
            title: "Loại khoản chi",
            dataIndex: "exp_type",
            render: (typeId) => exp_types[typeId],
            filters: exp_types
                .map((type) => type && { text: type, value: type })
                .filter((type) => !!type),
            onFilter: (value, record) => {
                return exp_types[record.exp_type].startsWith(value)
            },
            filterSearch: true,
        },
        {
            title: "Ngày tạo",
            dataIndex: "exp_date",
        },
        {
            title: "Số tiền",
            dataIndex: "exp_spend",
            render: (spend) => VND.format(spend),
            sorter: (a, b) => a.exp_spend - b.exp_spend,
        },
        {
            title: "Thao tác",
            dataIndex: "id",
            render: (id) => {
                return (
                    <i
                        className={`fa-regular fa-trash-can ${historyExpStyle.detele_exp_icon}`}
                        onClick={() => handleDeleteExp(id)}
                    ></i>
                );
            },
            align: "center",
        },
    ];
    return (
        <div>
            <h1 className={historyExpStyle.expense_history_heading}>
                Lịch sử chi tiêu
            </h1>
            <div className={historyExpStyle.search_group}>
                <div>
                    <i className="fa-solid fa-magnifying-glass search-icon"></i>
                    <input
                        id="search"
                        placeholder="Tên khoản chi..."
                        onChange={(e) =>
                            setData(
                                exp_list.filter(
                                    (exp) =>
                                        !!exp_types[exp.exp_type] &&
                                        exp.exp_name
                                            .toLowerCase()
                                            .includes(e.target.value)
                                )
                            )
                        }
                    />
                </div>
                <RangePicker
                    onChange={(moment, [startDate, endDate]) => {
                        const filterDateDate = exp_list.filter(
                            (exp) =>
                                !!exp_types[exp.exp_type] &&
                                exp.exp_date >= startDate &&
                                exp.exp_date <= endDate
                        );
                        return filterDateDate.length === 0
                            ? setData(exp_list.filter((exp) => !!exp_types[exp.exp_type]))
                            : setData(filterDateDate);
                    }}
                />
            </div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize: 6,
                    position: ["bottomCenter"],
                }}
                rowKey={(record) => record.id}
                onRow={(record) => {
                    return {
                        onClick: (e) => handleOpenEditExpense(e, record.id),
                        onMouseOver: (e) => (e.target.style.cursor = "pointer"),
                    };
                }}
            />
            <ModalExpenseItem
                modalState={{ showModal, setShowModal }}
                expId={expId}
            />
        </div>
    );
}

export default HistoryExpense;
