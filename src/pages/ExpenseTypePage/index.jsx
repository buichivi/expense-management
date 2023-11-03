import { useEffect, useState } from "react";
import ExpenseTypePageStyle from "./ExpenseTypePage.module.scss";
import AddExpenseType from "../../components/AddExpenseType";
import useStore from "../../store/hooks";
import PieChart from "../../components/PieChart";
import ModalExpenseType from "../../components/ModalExpenseType";
import storage from "../../store/storage";

function ExpenseTypePage({ isDarkMode }) {
    const [{ exp_list, exp_types }, dispatch] = useStore();
    const [showModal, setShowModal] = useState(false);
    const [typeIndex, setTypeIndex] = useState();

    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    useEffect(() => {
        storage.set({ exp_types, exp_list });
    }, [exp_list]);

    return (
        <div className={ExpenseTypePageStyle.expense_type_page}>
            <div className="grid">
                <div className="row">
                    <div
                        className="col l-6 m-6 c-12"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                    >
                        <AddExpenseType />
                        <div className={ExpenseTypePageStyle.type_list_wrap}>
                            <h2
                                className={
                                    ExpenseTypePageStyle.type_list_heading
                                }
                            >
                                Tổng chi tiêu:{" "}
                                {VND.format(
                                    exp_list.reduce(
                                        (acc, exp) => acc + +exp.exp_spend,
                                        0
                                    )
                                )}
                            </h2>
                            <ul className={ExpenseTypePageStyle.type_list}>
                                {exp_types.map(
                                    (type, index) =>
                                        type && (
                                            <li
                                                className={
                                                    ExpenseTypePageStyle.type_item
                                                }
                                                key={index}
                                                onClick={() => {
                                                    setShowModal(true);
                                                    setTypeIndex(index);
                                                }}
                                            >
                                                {type}
                                                <span>
                                                    {VND.format(
                                                        exp_list.reduce(
                                                            (acc, exp) => {
                                                                return exp.exp_type ==
                                                                    index
                                                                    ? acc +
                                                                          +exp.exp_spend
                                                                    : acc;
                                                            },
                                                            0
                                                        )
                                                    )}
                                                </span>
                                            </li>
                                        )
                                )}
                            </ul>
                            <ModalExpenseType
                                modalState={{ showModal, setShowModal }}
                                typeIndex={typeIndex}
                            />
                        </div>
                    </div>
                    <div className="col l-6 m-6 c-12">
                        <PieChart isDarkMode={isDarkMode}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExpenseTypePage;
