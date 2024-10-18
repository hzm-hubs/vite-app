<template>
    <div>
        <h2>{{ pageTitle }}</h2>

        <van-button type="primary" @click="count++"
            >count is {{ count }}</van-button
        >
        <van-button type="primary" @click="goRouter">跳转</van-button>
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
