<template>
    <div class="book">
        <Loading></Loading>
        <div class="book__banner">
            <div
                v-for="(banner, index) in booksList"
                :key="index"
                class="book__banner_item"
                @click="clickItem(banner)"
            >
                <div class="book__banner_name">{{ banner.bookName }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useMapState } from "@/plugins/useMapState";
import { useRouter, useRoute } from "vue-router";

export default {
    // setup() 钩子是在组件中使用组合式 API 的入口，通常只在以下情况下使用：

    // 需要在非单文件组件中使用组合式 API 时。
    // 需要在基于选项式 API 的组件中集成基于组合式 API 的代码时。
    // setup() 接收俩个参数 （props，context）props为当前页面组件的声明属性，context为当前上下文
    // context也可以解构传入 setup(props, { attrs, slots, emit, expose })
    // expose 函数用于显式地限制该组件暴露出的属性，
    // 当父组件通过模板引用访问该组件的实例时，将仅能访问 expose 函数暴露出的内容：
    setup(props, context) {
        const count = ref(12);
        // 法1: 单独声明使用 store
        const store = useStore();

        const pageInfo = reactive({
            props: JSON.stringify(props),
            context: JSON.stringify(context),
        });

        const peopleA = computed(() => store.state.userInfo);

        // 法2: 通过封装mapState方法
        const peopleB = useMapState(["userInfo"]);

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

        // 暴露一个属性 此时父组件可以通过模板引用来访问这个 increment 方法。
        // expose({
        //     dependCount
        // })

        return {
            count,
            dependCount,
            peopleA,
            peopleB,
            pageInfo,
            route: useRoute(),
            router: useRouter(),
        };
    },

    data() {
        return {
            booksList: [],
        };
    },

    mounted() {
        // console.log("peopleA", this.peopleA);
        console.log("peopleB", this.peopleB);
        console.log("pageInfo", this.pageInfo);
        this.getBannerData();
    },

    methods: {
        getBannerData() {
            this.booksList = [
                {
                    bookName: "滕王阁",
                },
                {
                    bookName: "史记",
                },
                {
                    bookName: "山海经",
                },
            ];
        },

        clickItem(item) {
            this.router.push("/books/tengwangge");
        },
    },
};
</script>

<style lang="less" scoped>
.book {
    padding: 20px;
}
</style>
