import AuthService from '../service/auth';

export const auth = {
    namespaced: true,
    state: {
        connected: false,
        register: false

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
        }
    },
    mutations: {
        CONNECTED_SUCCESS(state) {
            state.connected = true;
        },
        REGISTER_SUCCESS(state) {
            state.register = true
        }

    }
};