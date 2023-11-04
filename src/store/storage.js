const EXPENSE_TRACKER_APP = 'EXPENSE_TRACKER_APP'
const EXPENSE_TRACKER_APP_DARK_MODE = 'EXPENSE_TRACKER_APP_DARK_MODE'

const storage = {
    get() {
        return localStorage.getItem(EXPENSE_TRACKER_APP) 
            && JSON.parse(localStorage.getItem(EXPENSE_TRACKER_APP))
    }, 
    set(data) {
        localStorage.setItem(EXPENSE_TRACKER_APP, JSON.stringify(data))
    },
    setTheme(theme) {
        localStorage.setItem(EXPENSE_TRACKER_APP_DARK_MODE, JSON.stringify(theme))
    },
    getTheme() {
        return localStorage.getItem(EXPENSE_TRACKER_APP_DARK_MODE)
         ? JSON.parse(localStorage.getItem(EXPENSE_TRACKER_APP_DARK_MODE))
         : false;
    }
}

export default storage;