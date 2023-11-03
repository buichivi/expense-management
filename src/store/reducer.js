import {
    ADD_EXPENSE,
    ADD_EXPENSE_TYPE,
    EDIT_EXPENSE,
    DELETE_EXPENSE,
    DELETE_EXPENSE_TYPE,
} from "./constants";
import storage from './storage'

const initState = {
    exp_types: ["Tiền nhà", "Ăn uống", "Học hành", "Gửi tiết kiệm"],
    exp_list: [],
};

const getInitState = (init) => {
    return storage.get() ?? init;
}

function reducer(state, action) {
    switch (action.type) {
        case ADD_EXPENSE:
            return {
                ...state,
                exp_list: [action.payLoad, ...state.exp_list],
            };
        case ADD_EXPENSE_TYPE:
            return {
                ...state,
                exp_types: [...state.exp_types, action.payLoad],
            };
        case EDIT_EXPENSE:
            const { expId, newExp } = action.payLoad;
            const newExpList = [...state.exp_list].map((exp) => {
                if (exp.id == expId) {
                    const newExpItem = {
                        ...newExp,
                        id: expId,
                    }
                    return newExpItem
                }
                return exp;
            });
            return {
                ...state,
                exp_list: newExpList,
            };
        case DELETE_EXPENSE:
            const newExpList_2 = state.exp_list.filter((exp) => exp.id !== action.payLoad)
            return {
                ...state,
                exp_list: newExpList_2,
            };
        case DELETE_EXPENSE_TYPE: 
            const newExpTypes = [...state.exp_types]
            const newExpList_3 = state.exp_list.filter((exp) => exp.exp_type != action.payLoad)
            newExpTypes.splice(action.payLoad, 1 , undefined);
            return {
                ...state,
                exp_types: newExpTypes,
                exp_list: newExpList_3
            }
        default:
            throw new Error("Invalid action!");
    }
}

export { initState, getInitState };
export default reducer;
