// 创建store

import { createStore } from "vuex";

export default createStore({
    state() {
        return {
            count: 0,

            userInfo: {},
        };
    },

    mutations: {
        userLogin(data: any) {
            this.state.userInfo = data;
        },
    },

    actions: {
        login({ commit }, context) {
            commit("userLogin", context);
        },
    },

    modules: {},
});
