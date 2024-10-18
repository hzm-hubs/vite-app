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
    /* padding: 10px; */
    width: 100vw;
    height: 100vh;
    /* overflow: auto; */
}
</style>
