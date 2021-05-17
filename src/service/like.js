const axios = require('axios').default;
const API_URL = 'http://localhost:3000/api/likes';
const BearerToken = `bearer ${JSON.parse(localStorage.getItem('token'))}`;
class LikeService {
    addLike(id, like) {
        return axios({
            method: 'post',
            url: `${API_URL}/${id}`,
            data: like,
            headers: {
                'Accept': 'application/json',
                'Authorization': BearerToken
            }
        })

    }
    getLike(id) {
        return axios.get(`${API_URL}/${id}`, {
            headers: {
                'Accept': "application/json",
                'Authorization': BearerToken
            }
        })


    }
}
export default new LikeService();