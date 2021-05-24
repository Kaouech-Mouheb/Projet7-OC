import AuthService from '../service/auth';

export const auth = {
    namespaced: true,
    state: {
        connected: false,
        register: false,
        user: null,
        userProfil: null

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
        GetUserById({
            commit
        }, id) {
            return AuthService.getOneUser(id)
                .then(res => {
                    commit('USER_PROFIL', res.data);
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
        },
        USER_PROFIL(state, val) {
            state.userProfil = val
        },
        INITIAL_STATE_AUTH(state) {
            let initial = {
                connected: false,
                register: false,
                user: null,
                userProfil: null

            }
            Object.assign(state, initial)

        }

    }
};