export default {
    // 命名隔离，避免不用模块之间的冲突
    namespaced: true,
    state: () => ({
        MAXCOUNT: 16,
        visitedViews: [],
        cachedViews: [],
    }),
    mutations: {
        // commit 触发
        ADD_VIEW(state, data) {
            let isExist = state.visitedViews.find(
                (item) => item.path === data.path,
            );
            if (!isExist) {
                state.visitedViews.push(data);
            }
            // console.log("页签", state.visitedViews);
        },
        ADD_CACHED(state, name) {
            let isExist = state.cachedViews.find((item) => item == name);
            if (!isExist) {
                state.cachedViews.push(name);
            }
        },
    },
    actions: {
        // dispatch 触发
        addView(context, data) {
            const { path, fullPath, name, meta } = data;
            const pathName = name || "no-name";
            console.log("pathName", pathName);
            context.commit("ADD_VIEW", {
                path,
                pathName,
                meta,
            });
            context.commit("ADD_CACHED", pathName);
        },

        delView({ commit }, data) {},
    },
    getters: {},
};
