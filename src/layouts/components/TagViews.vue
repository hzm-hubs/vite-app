<template>
    <div class="tagview">
        <router-link
            v-for="tab in tabs"
            :key="tab.pathName"
            class="tagview__item"
            :class="{ tagview__item_active: tab.pathName === activeTab }"
            :to="tab.path"
        >
            {{ tab.pathName }}
        </router-link>
    </div>
</template>

<script setup>
import { computed, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { mapState, useStore } from "vuex";
const route = useRoute();
const router = useRouter();
const store = useStore();
const activeTab = ref("");

const tabs = computed(() => {
    return store.state?.tagviews?.visitedViews || [];
});

watch(
    () => route,
    (newV) => {
        activeTab.active = newV.name;
        console.log("路由变化", route.path);
        console.log("newV", newV);
        store.dispatch("tagviews/addView", newV);
    },
    {
        immediate: true,
        deep: true,
    },
);

onMounted(() => {});
</script>

<style lang="less">
.tagview {
    // position: fixed;
    // top: 60px;
    // left: 0;
    // z-index: 2000;
    width: 100%;
    height: 60px;
    background: #fff;
    border: 1px solid #f6f6f6;
    color: #fff;
    .flex(center);

    &__item {
        padding: 4px 8px;
        margin: 0 0 0 10px;
        width: fit-content;
        background: #f5f5f5;
        border-radius: 2px;
        cursor: pointer;
        &_active {
            background: #4890d8;
        }
    }
}
</style>
