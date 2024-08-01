export default async function (router) {
    // 判断当前路径是否存在于路由菜单中
    /**
     *  router.currentRoute.value.path 获取到的当前路径打印出来是对的，
     *  但取值就是 '/', 需要使用延时方法才能获取到正确的
     *  可能由于app实例的返回是代理的
     */
    // // 1
    // setTimeout(() => {
    // let pathList = router.getRoutes().map((router) => {
    //     return router.path;
    // });
    // // 当前路径
    // let currentPath = router.currentRoute._value.path;
    // // 已有的路径中不存在当前的 跳往404页面
    // if (!pathList.includes(currentPath)) {
    //     // console.log("不存在");
    //     router.replace("/404");
    // } else {
    // }
    // }, 200);

    // // 2 options中获取当前路径
    let pathList = router.getRoutes().map((router) => {
        return router.path;
    });

    // 当前路径 复制粘贴太耗性能
    // let current = JSON.parse(JSON.stringify(router));

    // 换到options中获取当前路径
    let currentPath = router?.options?.history.location;

    /**
     *   router.hasRoute(currentPath) 中检测路径需要去除前面的 "/"
     *   如 router.hasRoute(“/404”) 返回false，router.hasRoute(“404”) 返回true
     */
    // 已有的路径中不存在当前的 跳往404页面
    if (!pathList.includes(currentPath)) {
        // console.log("不存在该路径, 将跳往404页面");
        return {
            name: "404",
        };
    } else {
        // console.log("auth over");
        return "";
    }
}
