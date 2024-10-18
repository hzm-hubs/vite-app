<template>
    <div>
        <h2>{{ pageTitle }}</h2>

        <el-button type="button" @click="count++"
            >count is {{ count }}</el-button
        >
        <el-button type="button" @click="goRouter">跳转</el-button>
    </div>
</template>
<script setup>
import { useRouter, useRoute } from "vue-router";

const pageTitle = ref("hello word");

const router = useRouter();

const count = ref(0);

function goRouter() {
    router.push("/flows");
}

onMounted(() => {
    console.log("page --init");
});
</script>
<style lang=""></style>
