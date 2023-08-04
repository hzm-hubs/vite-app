<template>
    <div>about</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
/**
 * 组合式调用
 */
// 初始并设置变量值为1
const count = ref(1);

// 这种方法不适用数组中存在相同的元素
function twoSum(nums, target) {
    console.log("给定的数组", nums);
    const dataMap = new Map();

    for (let i of nums) {
        if (i <= target) {
            dataMap.set(i, nums.indexOf(i));
        }
    }

    let turnList = [];

    // 存在键值对
    if (dataMap.size) {
        for (let [key, sortIndex] of dataMap) {
            if (dataMap.get(target - key)) {
                console.log("找到结果", [sortIndex, dataMap.get(target - key)]);
                return [sortIndex, dataMap.get(target - key)];
            } else {
                console.log("继续");
            }
        }
    }

    // console.log("转化结果", turnList);

    console.log("dataMap", dataMap);
}

function betterSun(nums, target) {
    let hash = [];
    for (let i = 0; i < nums.length; i++) {
        // 如果已经存在则直接返回
        if (hash[target - nums[i]] !== undefined) {
            console.log("hash值", hash);
            return [i, hash[target - nums[i]]];
        }
        // 记录当前值的索引
        hash[nums[i]] = i;
    }
    return [];
}



// 针对链表 listnode
function addTwoNumbers(l1, l2) {
    let reverse = function (data) {
        let result = [];
        for (let i = 0; i < data.length; i++) {
            console.log("i", i);
            // result.push(data[data.length - i - 1]);
        }
        return result;
    };
    let tempValue = eval(reverse(l1).join("")) + eval(reverse(l2).join(""));
    console.log("结果", tempValue);
    return reverse(String(tempValue).split(""));
}

onMounted(() => {
    if (count.value == 1) {
        console.log("count value is 1");
    }
    twoSum([3, 3], 6);

    addTwoNumbers([2, 3, 4], [5, 6, 4]);
});
</script>

<style></style>
