const axios = require('axios').default;
const API_URL = 'http://localhost:3000/api/publications';
const BearerToken = `bearer ${JSON.parse(localStorage.getItem('token'))}`;

class PublicationService {
    createPublication(publication) {
        return axios({
            method: 'post',
            url: API_URL,
            data: publication,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': BearerToken
            }
        })

    }
    createPublicationText(publication) {
        return axios({
            method: 'post',
            url: API_URL + "/text",
            data: publication,
            headers: {
                'Accept': 'application/json',
                'Authorization': BearerToken
            }
        })

    }
    getPublication() {
        return axios
            .get(API_URL, {
                headers: {
                    'Accept': "application/json",
                    'Authorization': BearerToken
                }
            })
    }

}
export default new PublicationService();