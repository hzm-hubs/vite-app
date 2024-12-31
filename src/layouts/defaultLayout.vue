<template>
    <div class="layout">
        <TagViews></TagViews>
        <router-view class="main-content" v-slot="{ Component }">
            <!-- keep-alive 不设置 include 默认缓存全部 -->
            <keep-alive :include="cachedViews">
                <component :is="Component" :key="$route.path"></component>
            </keep-alive>
        </router-view>
    </div>
</template>
<script setup>
import { computed } from "vue";
import TagViews from "./components/TagViews.vue";
import { useStore } from "vuex";
const store = useStore();
const cachedViews = computed(() => {
    console.log("cachedViews1", store.state?.tagviews?.cachedViews);
    let tempValue = store.state?.tagviews?.cachedViews || [];
    console.log("cachedViews2", tempValue);
    return tempValue;
});
</script>
<style scoped>
.layout {
    padding: 0;
    margin: 0;
}
</style>
