<template>
    <svg class="icon" :style="{ fill: iconColor }">
        <use :xlink:href="src" />
    </svg>
</template>

<script setup>
defineProps({
    src: {
        type: String,
        default: "", // 展示的svg文件地址，如 `@/assets/icons.svg#icon-arrow`
    },

    iconColor: {
        type: String,
        default: "currentcolor", // 展示的填充色，默认使用 currentColor, 即继承自身的 color 色值
    },
});
</script>

<style scoped>
.icon {
    width: 24px;
    height: 24px;
    color: #42b983; /* 通过color控制fill颜色 */

    &:hover {
        color: #ff5722;
    }
}
</style>
