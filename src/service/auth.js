const axios = require('axios').default;
const API_URL = 'http://localhost:3000/api/auth/';
class AuthService {
    login(user){
        return axios
        .post(API_URL + 'login',{
            email:user.email,
            password:user.password
        })

    }

    register(user){
        return axios
        .post(API_URL + 'register',{
            username: user.username,
            email:user.email,
            password:user.password
        })
    }
}
export default new AuthService();