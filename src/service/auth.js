const axios = require('axios').default;
const API_URL = 'http://localhost:3000/api/auth/';
const BearerToken = `bearer ${JSON.parse(localStorage.getItem('token'))}`;
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
    getOneUser(id) {
        return axios
            .get(`${API_URL}${id}`, {
                headers: {
                    'Accept': "application/json",
                    'Authorization': BearerToken
                },
            })
    }
    updateProfil(infos) {
        return axios({
            method: 'PUT',
            url: API_URL + "update-profil",
            data: infos,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': BearerToken
            }
        })
    }
    updateImage(image) {
        return axios({
            method: 'PUT',
            url: API_URL + "update-image",
            data: image,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': BearerToken
            }
        })
    }
    updatePassword(password) {
        return axios({
            method: 'PUT',
            url: API_URL + "update-password",
            data: password,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': BearerToken
            }
        })
    }
    deleteUser(password) {
        return axios.delete(API_URL + "users/delete", {
            data: password,
            headers: {
                'Accept': 'application/json',
                'Authorization': BearerToken
            },
        });
    }

    getUsers() {
        return axios
            .get(`${API_URL}users`, {
                headers: {
                    'Accept': "application/json",
                    'Authorization': BearerToken
                },
            })
    }
    addAdmin(admin) {
        return axios({
            method: 'post',
            url: API_URL + 'admin',
            data: admin,
            headers: {
                'Accept': 'application/json',
                'Authorization': BearerToken
            }
        })
    }
}
export default new AuthService();