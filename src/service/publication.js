const axios = require('axios').default;
const API_URL = 'http://localhost:3000/api/publications';

class PublicationService {
    postPublication(publication){
        return axios({
            method: 'post',
            url: API_URL,
            data: publication,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })

    }

}
export default new PublicationService();