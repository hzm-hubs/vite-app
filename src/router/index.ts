// @ts-nocheck

// 路由

import { createRouter, createWebHistory } from "vue-router";

const routes = [
    // 首页
    {
        path: "/",
        name: "home",
        meta: {
            title: "首页",
        },
        component: () => import("@/pages/index.vue"),
    },
    {
        path: "/about",
        name: "about",
        meta: {
            title: "关于",
        },
        component: () => import("@/pages/about.vue"),
    },
    {
        path: "/wait",
        name: "wait",
        meta: {
            title: "wait",
        },
        component: () => import("@/pages/wait.vue"),
    },
    {
        path: "/404",
        name: "404",
        meta: {
            title: "页面未找到",
        },
        component: () => import("@/pages/404.vue"),
    },
    {
        path: "/500",
        name: "500",
        meta: {
            title: "500",
        },
        component: () => import("@/pages/500.vue"),
    },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
