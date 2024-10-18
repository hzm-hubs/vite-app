<template>
    <div class="layout">
        <router-view></router-view>
    </div>
</template>
<script setup>
import rem from "@/plugins/rem.js";
const remScript = document.createElement("script");
remScript.type = "text/javascript";
remScript.id = "rem-func";
remScript.innerHTML = rem();
// 添加 rem 单位属性
document.head.appendChild(remScript);
</script>
<style scoped></style>
