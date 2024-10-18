<template>
    <!-- 外层页面入口 -->
    <div class="viteapp">
        <router-view v-slot="{ Component }">
            <transition>
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>
<style>
.viteapp {
    padding: 10px;
    width: calc(100vw - 20px);
    height: calc(100vh - 20px);
    overflow: auto;
}
</style>
