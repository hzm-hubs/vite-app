<template>
    <div>
        <div>植物识别系统</div>
        <van-button type="primary" @click="count++"
            >count is {{ count }}</van-button
        >
        <van-uploader :after-read="handleRead">上传并识别</van-uploader>
    </div>
</template>
<script setup>
import { uploadUrl } from "@/apis";
import { showToast } from "vant";

function handleRead({ file, objectUrl, content }) {
    console.log("file", file);

    if (!file?.size) {
        return showToast("文件大小不存在");
    }
    const formData = new FormData();
    formData.append("image", file);
    uploadUrl(formData);
}

onMounted(() => {
    console.log("page --init");
});
</script>
<style lang=""></style>
