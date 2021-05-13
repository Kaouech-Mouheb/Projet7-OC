const axios = require('axios').default;
const API_URL = 'http://localhost:3000/api/auth/';
const BearerToken =`bearer ${JSON.parse(localStorage.getItem('token'))}`; 
class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'login', {
                email: user.email,
                password: user.password
            })

    }

    register(user) {
        return axios
            .post(API_URL + 'register', {
                username: user.username,
                email: user.email,
                password: user.password
            })
    }
    getUserAccount() {
        return axios
            .get(API_URL, {
                headers: {
                    'Accept': "application/json",
                    'Authorization': BearerToken
                }
            })
    }
    getUsers() {
        return axios
            .get(API_URL + "users", {
                headers: {
                    'Accept': "application/json",
                    'Authorization': BearerToken
                },
            })
    }
    updateProfil(infos) {
        return axios({
            method: 'PUT',
            url: API_URL + "update",
            data: infos,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': BearerToken
            }
        })
    }
}
export default new AuthService();