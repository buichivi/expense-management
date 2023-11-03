const EXPENSE_TRACKER_APP = 'EXPENSE_TRACKER_APP'

const storage = {
    get() {
        return localStorage.getItem(EXPENSE_TRACKER_APP) 
            && JSON.parse(localStorage.getItem(EXPENSE_TRACKER_APP))
    }, 
    set(data) {
        localStorage.setItem(EXPENSE_TRACKER_APP, JSON.stringify(data))
    }
}

export default storage;