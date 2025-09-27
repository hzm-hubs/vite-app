// 创建store

import { createStore } from "vuex";

export default createStore({
    // state中来定义数据
    state() {
        return {
            count: 0,

            userInfo: {
                name: "nick",
            },
        };
    },

    //getters用来处理数据，对state中的数据进行处理，得到自己想要的效果，当需要在多处组件使用这种数据时，gettters是你最好的选择
    getters: {},

    // mutations通常为修改state数据而使用，这用就可以避免直接修改state的数据
    mutations: {
        userLogin(state, data: any) {
            state.userInfo = data;
        },
    },

    // actions当你的数据是需要发送请求获取时，这是非常完美的选择
    actions: {
        login({ commit }, context) {
            commit("userLogin", context);
        },

        changeUser(data: any) {
            this.state.userInfo = data;
        },
    },

    modules: {},
});
