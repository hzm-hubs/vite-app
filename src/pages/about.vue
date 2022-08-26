<template>
    <div>about</div>
</template>

<script>
export default {
    // 应用注册页面提供
    inject: ["message"],

    mounted() {
        // path变量 来自于 mixin 注册的通用组件
        console.log("page about mounted", this.path);

        // 实例
        // console.log("page about this", this.$router);
    },
};
</script>

<style></style>
