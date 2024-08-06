<template>
    <div class="viteapp">
        <router-view></router-view>
    </div>
</template>
<script setup>
if (import.meta.env.SSR) {
    console.log("已启用ssr渲染");
}
</script>
<style>
.viteapp {
    padding: 10px;
    width: calc(100vw - 20px);
    height: calc(100vh - 20px);
    overflow: auto;
}
</style>
