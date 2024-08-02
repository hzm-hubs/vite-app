<template>
    <!-- 外层页面入口 -->
    <div class="viteapp">
        <!-- <router-view></router-view> -->

        <!-- 可以通过插槽开启扩展性，如keep-alive/transition -->
        <router-view v-slot="{ Component }">
            <!-- <component :is="Component" /> -->

            <keep-alive>
                <component :is="Component" />
            </keep-alive>

            <!-- <transition>
                <keep-alive>
                    <component :is="Component" />
                </keep-alive>
            </transition> -->
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
