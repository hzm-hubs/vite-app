/**
 *  vue3 中使用 mapState 并没有 vue2 中方便，参考文档重新封装了
 *  可以供全页面使用
 */

import { computed } from "vue";

import { mapState, useStore } from "vuex";

// getKeys 是一个数组，为你想要获取的属性
export const useMapState = (getKeys) => {
    const store = useStore();

    const storeState = {};

    const storeFns = mapState(getKeys);

    Object.keys(storeFns).forEach((fnKeys) => {
        const fn = storeFns[fnKeys].bind({ $store: store });
        storeState[fnKeys] = computed(fn);
    });

    // 返回的是传入的 getKeys 属性的对象
    return storeState;
};
