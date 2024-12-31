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
    router.push("/books");
}

onMounted(() => {
    console.log("page --init");
});
</script>
<script>
import { defineComponent } from "vue";
export default defineComponent({
    name: "Home", // 在 defineComponent 中设置 name
});

</script>
<style lang=""></style>
