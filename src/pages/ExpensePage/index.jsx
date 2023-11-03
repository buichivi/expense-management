import { useState, useEffect } from "react";
import AddExpenseCard from "../../components/AddExpenseCard";
import useStore from "../../store/hooks";
import action from "../../store/actions";
import { DELETE_EXPENSE } from "../../store";
import HistoryExpense from "../../components/HistoryExpense";
import storage from "../../store/storage";

function ExpensePage() {
    const [{ exp_types, exp_list }, dispatch] = useStore();

    useEffect(() => {
        storage.set({ exp_types, exp_list });
    }, [exp_list]);

    return (
        <div
            style={{
                padding: "24px",
                width: "100%",
                minHeight: "100%",
            }}
        >
            <div className="grid">
                <div className="row">
                    <div className="col l-5 m-5 c-12">
                        <AddExpenseCard />
                    </div>
                    <div className="col l-7 m-7 c-12">
                        <HistoryExpense />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExpensePage;
