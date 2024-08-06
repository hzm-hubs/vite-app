<template>
    <div class="flow-page">
        <VueFlow v-model:nodes="nodes" v-model:edges="edges"></VueFlow>
    </div>
</template>
<script setup>
import { VueFlow } from "@vue-flow/core";
/* import the required styles */
import "@vue-flow/core/dist/style.css";
import "@vue-flow/core/dist/theme-default.css";

const nodes = ref([
    { id: "1", type: "input", label: "Node 1", position: { x: 250, y: 5 } },
    { id: "2", label: "Node 2", position: { x: 100, y: 100 } },
    { id: "3", label: "Node 3", position: { x: 400, y: 100 } },
    { id: "4", label: "Node 4", position: { x: 400, y: 200 } },
]);

const edges = ref([
    { id: "e1-2", source: "1", target: "2", animated: true },
    { id: "e1-3", source: "1", target: "3" },
]);

function getData() {
    return Promise.resolve(5);
}

onMounted(async () => {
    console.log("getData:", getData());
});
</script>
<style lang="less" scoped>
.flow-page {
    width: 600px;
    height: 700px;
    background: #f5f5f5;
}
</style>
