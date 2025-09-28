<template>
    <div>
        1. 父元素会因为子元素的marginTop异位
        <div class="bfc" :style="reactiveStyle">
            <div class="bfc__child">第一个子集</div>
        </div>
        解决： 1.为父元素添加弹性属性，或者设置<code>overflow:hidden</code>
        <div>
            <el-button type="primary" @click="onClick('display', 'flex')"
                >添加 flex</el-button
            >
            <el-button type="primary" @click="onClick('overflow', 'hidden')"
                >添加 overflow</el-button
            >
        </div>
    </div>
</template>
<script setup>
import { reactive } from "vue";

const reactiveStyle = reactive({
    overflow: "",
    display: "",
});

function onClick(type, value) {
    if (reactiveStyle[type]) {
        reactiveStyle[type] = "";
    } else {
        reactiveStyle[type] = value;
    }
}

onMounted(() => {
    console.log("page --init");
});
</script>
<style lang="less">
.bfc {
    width: 100%;
    background: blue;
    &__child {
        margin: 40px 0 0 0;
        background: red;
    }
}
</style>
