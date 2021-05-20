const axios = require('axios').default;
const API_URL = 'http://localhost:3000/api/comments';
const BearerToken = `bearer ${JSON.parse(localStorage.getItem('token'))}`;
class CommentaireService {
    addCommentaire(id, comment) {
        return axios({
            method: 'post',
            url: `${API_URL}/${id}`,
            data: comment,
            headers: {
                'Accept': 'application/json',
                'Authorization': BearerToken
            }
        })

    }
    delete(id) {
        return axios.delete(`${API_URL}/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': BearerToken
            },
        });
    }

}
export default new CommentaireService();