// 创建store

import { createStore } from "vuex";

export default createStore({
    state() {
        return {
            count: 0,

            userInfo: {
                name: "nick",
            },
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
