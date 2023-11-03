import { useEffect, useRef, memo } from 'react'
// import { Button } from 'react-bootstrap'
import Validator from '../Validator'
import useStore from '../../store/hooks';
import action from '../../store/actions';
import { ADD_EXPENSE_TYPE } from '../../store';


function AddExpenseType() {
    const [{ exp_types }, dispatch] = useStore()
    const inputRef = useRef()

    useEffect(() => {
        Validator({
            form: '#form_2',
            errorSelector: '.form_message',
            formGroupSelector: '.form_group',
            rules: [
                Validator.isRequired('#exp_type_name', 'Vui lòng nhập loại khoản chi'),
                Validator.isExist('#exp_type_name', exp_types, 'Loại khoản chi này đã tồn tại')
            ],
            onSubmit: function(data) {
              // Call API
              dispatch(action(ADD_EXPENSE_TYPE, data?.exp_type_name))
              inputRef.current.value = ''
              inputRef.current.focus()
            }
        });
    }) 

    return (
        <div className="add_expense_type">
            <form action="" className="form" id="form_2">
                <h3 className="heading">Thêm loại khoản chi</h3>
                <div className="spacer"></div>
                <div className="form_group">
                    <label htmlFor="exp_type_name" className="form_label">Tên loại khoản chi:</label>
                    <input ref={inputRef} id="exp_type_name" name="exp_type_name" type="text" placeholder="VD: Tiền nhà, Tiền học..." className="form_control" />
                    <span className="form_message"></span>
                </div>
                <button className="form_submit" type="submit">Thêm loại khoản chi</button>
            </form>
        </div>
    )
}

export default memo(AddExpenseType)