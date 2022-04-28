export default class Backendurls {
    constructor() {
        this.main = 'http://127.0.0.1:8000/'
    }

    loggin() {
        return this.main + 'login'
    }

    forget() {
        return this.main + 'forget'
    }

    register() {
        return this.main + 'create'
    }

    add_school() {
        return this.main + 'add_school'
    }

    search_school() {
        return this.main + 'schoo_list'
    }

    delete_school() {
        return this.main + 'delete_school'
    }
}
