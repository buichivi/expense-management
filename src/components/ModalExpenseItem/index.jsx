import { Modal, Button } from 'react-bootstrap'
import { useEffect } from 'react';
import { EDIT_EXPENSE } from '../../store'
import Validator from '../Validator';
import './ModalExpenseItem.scss'
import useStore from '../../store/hooks';
import action from '../../store/actions';

function ModalExpenseItem({ modalState, expId = 0 }) {
    const [{ exp_list, exp_types }, dispatch] = useStore();

    // Modal state
    const {showModal, setShowModal} = modalState
    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        Validator({
            form: '#form-edit',
            errorSelector: '.form_message',
            formGroupSelector: '.form_group',
            rules: [
                Validator.isRequired('#exp_name_edit', 'Vui lòng nhập tên khoản chi'),
                Validator.isRequired('#exp_spend_edit', 'Vui lòng nhập số tiền'),
                Validator.isNumber('#exp_spend_edit', 'Vui lòng nhập số'),
                Validator.isRequired('#exp_date_edit', 'Vui lòng chọn ngày'),
                Validator.isRequired('#exp_type_edit', 'Vui lòng chọn loại khoản chi')
            ],
            onSubmit: function(newExp) {
              // Call API
              dispatch(action(EDIT_EXPENSE, {expId, newExp}))
              handleCloseModal();
            }
        });
    })

    return (
        <>
            <Modal show={showModal} onHide={handleCloseModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className='my-modal'
                // size='lg'
            >
                <Modal.Body>
                    <form action="" className="form" id="form-edit" style={{ margin: 'auto', boxShadow: '0px 3px 20px 6px #000' }}>
                    <h3>Chỉnh sửa</h3>
                    <div className="form_group">
                        <label htmlFor="exp_name_edit" className="form_label">Tên khoản chi:</label>
                        <input id="exp_name_edit" name="exp_name" type="text" placeholder="VD: Coffee..." className="form_control" 
                            defaultValue={(exp_list.filter((exp) => exp.id == expId)[0] || {}).exp_name}
                        />
                        <span className="form_message"></span>
                    </div>
                    
                    <div className='grid'>
                        <div className='row'>
                            <div className='col l-6 m-6 c-12'>
                                <div className="form_group">
                                    <label htmlFor="exp_spend_edit" className="form_label">Số tiền:</label>
                                    <input id="exp_spend_edit" name="exp_spend"  type="text" placeholder="VD: 20000..." className="form_control" 
                                        defaultValue={(exp_list.filter((exp) => exp.id == expId)[0] || {}).exp_spend}
                                    />
                                    <span className="form_message"></span>
                                </div>
                            </div>
                            <div className='col l-6 m-6 c-12'>
                                <div className="form_group">
                                    <label htmlFor="exp_date_edit" className="form_label">Ngày tạo:</label>
                                    <input id="exp_date_edit" name="exp_date"  type="date" className="form_control" 
                                        defaultValue={(exp_list.filter((exp) => exp.id == expId)[0] || {}).exp_date}
                                    />
                                    <span className="form_message"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="form_group">
                        <label htmlFor="exp_type_edit" className="form_label">Loại khoản chi:</label>
                        <select id="exp_type_edit" name='exp_type' className="form_control" defaultValue={(exp_list.filter((exp) => exp.id == expId)[0] || {}).exp_type}>
                            <option value=''>---Chọn loại khoản chi---</option>
                            {exp_types
                                .map((type, index) => 
                                <option 
                                    key={index} 
                                    value={index}
                                >{type}</option>)
                                .filter((element, index) => !!exp_types[index])
                            }
                        </select>
                        <span className="form_message"></span>
                    </div>
                    <div className="form_group">
                        <label htmlFor="exp_note_edit" className="form_label">Ghi chú:</label>
                        <input id="exp_note_edit" name='exp_note' type="text" placeholder="VD: Mua ở WinMart..." className="form_control" 
                            defaultValue={(exp_list.filter((exp) => exp.id == expId)[0] || {}).exp_note}
                        />
                        <span className="form_message"></span>
                    </div>
                    <Button variant="danger" onClick={handleCloseModal} size='lg'>
                        Đóng
                    </Button>
                    <Button variant="info" type='submit' size='lg' 
                        style={{ marginLeft: 12 }}
                    >
                        Lưu
                    </Button>
                </form>
                </Modal.Body>
            </Modal>

        </>
    );
}

export default ModalExpenseItem;