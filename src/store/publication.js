import PublicationService from '../service/publication';

export const pub = {
    namespaced: true,
    state: {
        publications: null,
    },
    actions: {
        GetPublications({
            commit
        }, val) {
            return PublicationService.getPublication(val)
                .then(pub => {
                    commit('PUBLICATIONS_SUCCESS', pub.data);
                    return Promise.resolve(pub);
                })
                .catch(error => {
                    return Promise.reject(error);
                })
        }
    },
    mutations: {
        PUBLICATIONS_SUCCESS(state, val) {
            state.publications = val;
        },
        INITIAL_STATE_PUB(state){
            state.publications = null
        },
    }
};