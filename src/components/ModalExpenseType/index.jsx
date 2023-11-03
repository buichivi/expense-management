import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import useStore from "../../store/hooks";
import action from "../../store/actions";
import { DELETE_EXPENSE_TYPE } from "../../store";
function ModalExpenseType({ modalState, typeIndex }) {
    const [{ exp_list, exp_types }, dispatch] = useStore();

    const { showModal, setShowModal } = modalState;
    const handleCloseModal = () => setShowModal(false);

    return (
        <div>
            <Modal
                show={showModal}
                onHide={handleCloseModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size="sm"
            >
                <Modal.Header>Bạn có muốn xóa loại khoản chi này?</Modal.Header>
                <Modal.Body>
                    <p>
                        Khi xóa loại khoản chi tất cả các lịch sử chi tiêu của
                        khoản chi này sẽ bị xóa?{" "}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleCloseModal} size="lg">
                        Đóng
                    </Button>
                    <Button variant="danger" size="lg" onClick={() => {
                        dispatch(action(DELETE_EXPENSE_TYPE, typeIndex))
                        handleCloseModal()
                    }}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalExpenseType;
