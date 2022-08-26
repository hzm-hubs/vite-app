// @ts-nocheck

// 路由

import { createRouter, createWebHistory } from "vue-router";

const routes = [
    // 首页
    {
        path: "/",
        name: "home",
        component: () => import("@/pages/index.vue"),
    },
    {
        path: "/about",
        name: "about",
        component: () => import("@/pages/about.vue"),
    },
    {
        path: "/404",
        name: "404",
        component: () => import("@/pages/404.vue"),
    },
    {
        path: "/500",
        name: "500",
        component: () => import("@/pages/500.vue"),
    },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
