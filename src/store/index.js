import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

import {
    auth
} from './auth';
import {
    pub
} from './publication';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        pub
    },
    plugins: [createPersistedState()],
});