<template>
    <div class="home-page">
        <h2>{{ pageTitle }}</h2>
        <SvgIcon :src="svgImg"></SvgIcon>
        <el-button type="button" @click="count++"
            >count is {{ count }}</el-button
        >
        <el-button type="button" @click="goRouter">跳转</el-button>
    </div>
</template>
<script setup>
import svgImg from "@/assets/images/svg/file-icon.svg";
import SvgIcon from "@/components/SvgIcon.vue";
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
<style lang="less">
.home-page {
    currentcolor: #000;
}
</style>
