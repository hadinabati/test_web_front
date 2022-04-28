import axios from 'axios'
import Urls from '../URL/urls'
import {
    SessionStorage
} from 'quasar'


const state = {
    logged: false,

    loggin: {
        error: false
    },

    info: {
        name: '',
        emails: '',
        token: '',
        phone: '',
        username: ''
    },

    schools: {
        info: [],
        is_updated: false

    }
}
const mutations = {

    updatelogged(state, payload) {
        state.logged = true
        state.loggin.error = false
    },

    error_log(state, payload) {
        state.loggin.error = true
    },

    setinfo(state, payload) {
        state.info.name = payload.name
        state.info.emails = payload.emails
        state.info.token = payload.token
        state.info.phone = payload.phone
        state.info.username = payload.username


    },

    Exit(state, payload) {
        state.info.name = ''
        state.info.emails = ''
        state.info.token = ''
        state.info.phone = ''
        state.info.username = ''
        state.logged = false
        sessionStorage.clear()
    },

    update_school(state, payload) {
        state.schools.info = []
        state.schools.info.push(payload)
    },

    updated_school_updated(state, payload) {
        state.schools.is_updated = true
    }


}
const actions = {

    checkloggin({
        commit
    }, payload) {
        const Url = new Urls()
        axios.post(Url.loggin(), {

            username: payload.username,
            passwords: payload.passwords

        }).then((value) => {

            if (value.data.OK === true && value.data.result === 1) {
                commit('updatelogged', payload)
                commit('setinfo', {
                    name: value.data.name,
                    emails: value.data.emails,
                    token: value.data.token,
                    phone: value.data.phone,
                    username: value.data.username
                })

                SessionStorage.set('username', payload.username)
                SessionStorage.set('name', value.data.name)
                SessionStorage.set('token', value.data.token)
                SessionStorage.set('phone', value.data.phone)
                SessionStorage.set('emails', value.data.emails)

            } else {
                commit('error_log', payload)
            }
        })
    },

    Enter_with_session({
        commit
    }, payload) {
        if (SessionStorage.getItem('username') !== '') {
            commit('updatelogged', payload)
            commit('setinfo', {
                name: SessionStorage.getItem('name'),
                emails: SessionStorage.getItem('emails'),
                token: SessionStorage.getItem('token'),
                phone: SessionStorage.getItem('phone'),
                username: SessionStorage.getItem('username'),
            })
        }

    },

    update_school({
        commit
    }, payload) {
        let info = {}
        for (let index = 0; index < payload.length; index++) {

            info.name = payload[index].name
            info.address = payload[index].adress
            info.paye = payload[index].paye
            info.kind = payload[index].kind
            info.token = payload[index].token
            commit('update_school', info)
        }
        commit('updated_school_updated', {})

    },

    updated_school_updated({ commit }, payload) {
        commit('updated_school_updated', {})
    },





    Exit({
        commit
    }, payload) {
        commit('Exit', payload)
    },




}
const getters = {

    getinto: (state) => {
        return state.info
    },

    gettersname: (state) => {
        return state.loggin.error
    },

    check_logged: (state) => {
        return state.logged

    },

    manager_code: (state) => {
        return state.info.token
    },

    school_list: (state) => {
        return state.schools
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
