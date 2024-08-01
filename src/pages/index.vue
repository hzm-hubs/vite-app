<template>
    <div>
        <h2>{{ pageTitle }}</h2>

        <button type="button" @click="count++">count is {{ count }}</button>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
const pageTitle = ref("hello word");

const count = ref(0);

onMounted(() => {
    console.log("page --init");
});
</script>
<style lang=""></style>
