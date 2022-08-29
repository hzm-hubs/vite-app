<template>
    <div>about</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
/**
 * 组合式调用
 */
// 初始并设置变量值为1
const count = ref(1);

onMounted(() => {
    if (count.value == 1) {
        console.log("count value is 1");
    }
});
</script>

<style></style>
