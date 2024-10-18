<template>
    <div class="plant">
        <van-popup v-model:show="isLoading" class="plant__loading">
            <img :src="loadingImg" />
            <div>识别中…</div>
        </van-popup>
        <div class="plant__title">植物识别系统</div>

        <div class="plant__image">
            <van-uploader
                capture="camera"
                :max-count="1"
                :after-read="handleRead"
            >
                <img :src="logoUrl" />
            </van-uploader>
        </div>

        <van-uploader capture="camera" :max-count="1" :after-read="handleRead">
            <van-button class="plant__btn">拍照上传</van-button>
        </van-uploader>

        <div>
            <van-uploader :max-count="1" :after-read="handleRead">
                <div>从照片中选择</div>
            </van-uploader>
        </div>

        <van-popup v-model:show="isResult" class="plant__result">
            <div class="plant__title">
                <img
                    class="plant__title_back"
                    :src="backImg"
                    @click="closeDetail"
                />
                {{ resultInfo.name }}
            </div>
            <div class="plant__result_url">
                <img :src="tempUrl" />
            </div>
            <div class="plant__result_info">
                <div class="plant__result_name">{{ resultInfo.name }}</div>
                <div>{{ resultInfo.category }}</div>
            </div>
            <div class="plant__result_block">植物信息</div>
            <div class="plant__result_detail">
                {{ resultInfo.info }}
            </div>
        </van-popup>
    </div>
</template>
<script setup>
import loadingImg from "@/assets/images/loading.png";
import logoUrl from "@/assets/images/photo.png";
import backImg from "@/assets/images/back.png";
import { uploadUrl } from "@/apis";
import { showToast } from "vant";
import { ref, reactive } from "vue";

const isLoading = ref(false);
const isResult = ref(false);
const resultInfo = ref("");
const tempUrl = ref("");

async function handleRead({ file, objectUrl, content }) {
    // console.log("file", file);
    if (!file?.size) {
        return showToast({
            message: "文件过小",
            position: "bottom",
            className: "plant__toast",
        });
    }
    isLoading.value = true;
    const formData = new FormData();
    formData.append("image", file);
    const { data, code } = await uploadUrl(formData);
    isLoading.value = false;
    if (code !== 1000) {
        showToast({
            message: "请检查图片是否保护植物",
            position: "bottom",
            className: "plant__toast",
        });
        resultInfo.value = "";
    } else {
        isResult.value = true;
        resultInfo.value = data;
        tempUrl.value = content;
    }
    console.log("data", resultInfo.value);
}

function closeDetail() {
    console.log("123");
    isResult.value = false;
}

onMounted(() => {
    console.log("page --init");
});
</script>
<style lang="less" scoped>
.plant {
    width: 100%;
    height: 100vh;
    position: relative;
    background: #0f1528;
    color: #ffffff;
    text-align: center;
    font-size: 0.32rem;
    line-height: 0.45rem;
    overflow: auto;

    &__loading {
        width: 100vw;
        max-width: 100vw;
        height: 100vh;
        font-size: 0.36rem;
        color: #1eebcb;
        line-height: 0.5rem;
        background: #000000;
        z-index: 1000;
        .flex(center,center,wrap,column);

        img {
            margin: 0 0 0.41rem 0;
            width: 2.14rem;
            height: 2.16rem;
        }
    }

    &__title {
        height: 0.98rem;
        line-height: 0.98rem;
        color: #ffffff;
        font-size: 0.36rem;
        font-weight: 500;
        position: relative;

        &_back {
            position: absolute;
            top: 0.21rem;
            left: -0.14rem;
            width: 0.56rem;
            height: 0.56rem;
        }
    }

    &__image {
        margin: 1.8rem 0 0.61rem;
        img {
            width: 3.97rem;
            height: 3.97rem;
        }
    }

    &__btn {
        margin: 0 0 0.42rem 0;
        width: 5.69rem;
        height: 0.96rem;
        background: linear-gradient(270deg, #05ebe2 0%, #85eb74 100%);
        box-shadow: 0 0.08rem 0.16rem 0 rgba(38, 235, 199, 0.18);
        border-radius: 0.48rem;
    }

    &__result {
        padding: 0.32rem;
        width: 100vw;
        max-width: 100vw;
        height: 100vh;
        background: url("@/assets/images/backimage2.png") 100%;
        font-size: 0.24rem;
        color: rgba(255, 255, 255, 0.65);
        line-height: 0.36rem;

        &_url {
            margin: 0.26rem 0;
            width: 100%;
            height: 3.15rem;
            object-fit: contain;
            border-radius: 0.16rem;
            border: 2px solid #79a1cf;
            .flex(center,center);
            img {
                max-width: 100%;
                max-height: 3.16rem;
                object-fit: contain;
            }
        }

        &_info {
            margin: 0 0 0.55rem 0;
            padding: 0.2rem 0.4rem;
            background: linear-gradient(
                180deg,
                rgba(5, 235, 226, 0.2) 0%,
                rgba(133, 235, 116, 0) 100%
            );
            line-height: 0.4rem;
            border-radius: 0.16rem;
            border: 2px solid rgba(133, 235, 116, 1);

            text-align: left;
        }

        &_name {
            margin: 0 0 0.07rem 0;
            font-size: 0.36rem;
            color: #ffffff;
            line-height: 0.5rem;
        }

        &_block {
            margin: 0 0 0.32rem 0;
            font-weight: 500;
            font-size: 0.32rem;
            color: #ffffff;
            line-height: 0.45rem;
            .flex(center);

            &::before {
                margin: 0 0.15rem 0 0;
                content: "";
                width: 0.06rem;
                height: 0.28rem;
                background: linear-gradient(270deg, #05ebe2 0%, #85eb74 100%);
                box-shadow: 0px 8 16px 0px rgba(38, 235, 199, 0.18);
                display: block;
            }
        }

        &_detail {
            text-align: left;
        }

        &__toast {
            padding: 0.2rem;
            color: #ffffff;
            text-align: center;
            font-size: 0.32rem;
            line-height: 0.45rem;
        }
    }
}
</style>
<style>
.plant__toast {
    background: #f5f5f5;
    padding: 0.12rem;
    border-radius: 0.16rem;
    top: 90%;
}
.van-toast__text {
    color: #292828;
    text-align: center;
    font-size: 0.28rem;
    line-height: 0.3rem;
}
</style>
