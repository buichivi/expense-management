import { useEffect, memo } from "react";
import Validator from "../Validator";
import action from "../../store/actions";
import { ADD_EXPENSE } from "../../store";
import useStore from "../../store/hooks";
import { v4 as uuidv4 } from "uuid";

function AddExpenseCard() {
    const [state, dispatch] = useStore();

    useEffect(() => {
        Validator({
            form: "#form_1",
            errorSelector: ".form_message",
            formGroupSelector: ".form_group",
            rules: [
                Validator.isRequired(
                    "#exp_name",
                    "Vui lòng nhập tên khoản chi"
                ),
                Validator.isRequired("#exp_spend", "Vui lòng nhập số tiền"),
                Validator.isNumber("#exp_spend", "Vui lòng nhập số"),
                Validator.isRequired("#exp_date", "Vui lòng chọn ngày"),
                Validator.isRequired(
                    "#exp_type",
                    "Vui lòng chọn loại khoản chi"
                ),
            ],
            onSubmit: function (exp) {
                // Call API
                dispatch(
                    action(ADD_EXPENSE, {
                        id: uuidv4(),
                        ...exp,
                    })
                );
            },
        });
    });

    return (
        <div className="add_expense_card">
            <form action="" className="form" id="form_1">
                <h3 className="heading">Thêm khoản chi</h3>
                {/* <p className="desc"></p> */}
                {/* <div className="spacer"></div> */}
                <div className="form_group">
                    <label htmlFor="exp_name" className="form_label">
                        Tên khoản chi:
                    </label>
                    <input
                        id="exp_name"
                        name="exp_name"
                        type="text"
                        placeholder="VD: Coffee..."
                        className="form_control"
                    />
                    <span className="form_message"></span>
                </div>

                <div className="grid">
                    <div className="row">
                        <div className="col l-6 m-6 c-12">
                            <div className="form_group">
                                <label
                                    htmlFor="exp_spend"
                                    className="form_label"
                                >
                                    Số tiền:
                                </label>
                                <input
                                    id="exp_spend"
                                    name="exp_spend"
                                    type="text"
                                    placeholder="VD: 20000..."
                                    className="form_control"
                                />
                                <span className="form_message"></span>
                            </div>
                        </div>
                        <div className="col l-6 m-6 c-12">
                            <div className="form_group">
                                <label
                                    htmlFor="exp_date"
                                    className="form_label"
                                >
                                    Ngày tạo:
                                </label>
                                <input
                                    id="exp_date"
                                    name="exp_date"
                                    type="date"
                                    className="form_control"
                                />
                                <span className="form_message"></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form_group">
                    <label htmlFor="exp_type" className="form_label">
                        Loại khoản chi:
                    </label>
                    <select
                        id="exp_type"
                        name="exp_type"
                        className="form_control"
                    >
                        <option value="">---Chọn loại khoản chi---</option>
                        {state.exp_types
                            .map((type, index) => (
                            <option key={index} value={index}>{type}</option>))
                            .filter((element, index) => !!state.exp_types[index])
                        }
                    </select>
                    <span className="form_message"></span>
                </div>
                <div className="form_group">
                    <label htmlFor="exp_note" className="form_label">
                        Ghi chú:
                    </label>
                    <input
                        id="exp_note"
                        name="exp_note"
                        type="text"
                        placeholder="VD: Mua ở WinMart..."
                        className="form_control"
                    />
                    <span className="form_message"></span>
                </div>
                <button className="form_submit" type="submit">
                    Thêm khoản chi
                </button>
            </form>
        </div>
    );
}

export default memo(AddExpenseCard);
