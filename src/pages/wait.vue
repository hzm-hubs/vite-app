<template>
    <div>
        <h2>wait</h2>
    </div>
</template>

<script>
import { computed, ref } from "vue";
export default {
    // setup() 钩子是在组件中使用组合式 API 的入口，通常只在以下情况下使用：

    // 需要在非单文件组件中使用组合式 API 时。
    // 需要在基于选项式 API 的组件中集成基于组合式 API 的代码时。
    setup() {
        const count = ref(12);

        const dependCount = computed({
            get: (val) => {
                // console.log("count", val);
                // 绑定到与 count 有关
                return val || count.value;
            },

            set: () => {
                return count.value * 2;
            },
        });

        return {
            count,
            dependCount,
        };
    },

    data() {
        return {
            title: "wait",
        };
    },

    mounted() {
        console.log("dependCount", this.dependCount);
    },
};
</script>

<style></style>
