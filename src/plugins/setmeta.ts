// meta 信息
export default async function (d: any, c: any, r: any) {
    // d document ， c config , r router
    // console.log("传入的信息", d, c, r);
    // 根据传入的信息 自定义一个标签
    let versionElement = d.createElement("meta");
    versionElement.name = "version";
    // 不生效
    // versionElement.time = new Date().toLocaleString();
    versionElement.content = `v${c.version}`;
    /**
     * 设置指定元素上的某个属性值。如果属性已经存在，则更新该值；否则，使用指定的名称和值添加一个新的属性。
     * 要获取某个属性当前的值，可使用 getAttribute()；要删除某个属性，可使用 removeAttribute()。
     */
    versionElement.setAttribute("time", new Date().toLocaleString());

    // 编码格式标签
    let charElement = d.createElement("meta");
    charElement.setAttribute("charset", "utf-8");

    // console.log("titleElement", titleElement);

    // router.currentRoute获取需要延时 ，换到下面的方法
    let findRoute: any = Array.from(r.options.routes).find(
        (item: any) => item.path == r.options.history.location,
    );
    // console.log("findRoute", findRoute);
    // 判断 r 中是否有标题设置 有就更新
    if (findRoute?.meta?.title) {
        let titleElement = document.head.getElementsByTagName("title")[0];
        titleElement.innerHTML = findRoute.meta.title;
    }

    // 将版本信息推入head头部
    d.head.append(charElement, versionElement);

    console.log("set-meta over");
}
