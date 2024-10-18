<template>
    <!-- 外层页面入口 -->
    <div class="viteapp">
        <!-- <router-view></router-view> -->

        <!-- 可以通过插槽开启扩展性，如keep-alive/transition -->
        <router-view v-slot="{ Component }">
            <!-- 一 -->
            <!-- <component :is="Component" /> -->

            <!-- 二 -->
            <!-- <transition>
                    <component :is="Component" />
            </transition> -->

            <!-- 三 -->
            <keep-alive>
                <component v-if="$route.meta.keepAlive" :is="Component" />
            </keep-alive>
            <component v-if="!$route.meta.keepAlive" :is="Component" />
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
