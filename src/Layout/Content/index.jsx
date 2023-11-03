import { Routes, Route } from "react-router-dom";
import ExpensePage from "../../pages/ExpensePage";
import ExpenseTypePage from "../../pages/ExpenseTypePage";
import StatisticPage from "../../pages/StatisticPage";

function Content({ isDarkMode }) {
    return (
        <div className="content" style={{
            marginLeft: 250,
            height: '100%',
            width: '100%',
        }}>
            <Routes>
                <Route path="/" element={<StatisticPage isDarkMode={isDarkMode}/>} />
                <Route
                    path="/expense-types"
                    element={<ExpenseTypePage isDarkMode={isDarkMode}/>}
                />
                <Route path="/expense" element={<ExpensePage />} />
            </Routes>
        </div>
    );
}

export default Content;
