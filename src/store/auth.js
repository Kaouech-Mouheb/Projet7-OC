import AuthService from '../service/auth';

export const auth = {
    namespaced: true,
    state: {
        connected: false,
        register: false,
        user: null,

    },
    actions: {
        Login({
            commit
        }, val) {
            return AuthService.login(val)
                .then(res => {
                    commit('CONNECTED_SUCCESS');
                    localStorage.setItem('user', JSON.stringify(res.data.userId));
                    localStorage.setItem('token', JSON.stringify(res.data.token));
                    localStorage.setItem('admin', JSON.stringify(res.data.isAdmin));

                    return Promise.resolve(res);
                })
                .catch(error => {
                    return Promise.reject(error)
                })
        },
        Register({
            commit
        }, val) {
            return AuthService.register(val)
                .then(res => {
                    commit('REGISTER_SUCCESS');
                    return Promise.resolve(res);
                })
                .catch(error => {
                    return Promise.reject(error)
                })
        },
        GetOneUser({
            commit
        }) {
            return AuthService.getUserAccount()
                .then(res => {
                    commit('USER_ACCOUNT', res.data);
                    console.log(res.data)
                    return Promise.resolve(res)
                })
                .catch(error => {
                    return Promise.reject(error)
                })
        },
        UpdateProfil({
            commit
        }, infos) {
            return AuthService.updateProfil(infos)
                .then(res => {
                    commit("USER_ACCOUNT", res.data);
                    return Promise.resolve(res)
                })
                .catch(error => {
                    return Promise.reject(error)
                })
        },
        Loggout({
            commit
        }) {
            commit("LOGGOUT");
            localStorage.removeItem("user");
            localStorage.removeItem("admin");
            localStorage.removeItem("token");

        },
    },
    mutations: {
        CONNECTED_SUCCESS(state) {
            state.connected = true;
        },
        LOGGOUT(state) {
            state.connected = false;
        },
        REGISTER_SUCCESS(state) {
            state.register = true
        },
        USER_ACCOUNT(state, val) {
            state.user = val
        }

    }
};