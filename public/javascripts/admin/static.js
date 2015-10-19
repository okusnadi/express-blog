var config = {};
config.title = "登录系统";
config.name = "仪表盘";
config.email = "admin@admin.com";
config.sidebars = [{
    name: "文章",
    url: "root.home.articles",
    active: true
}, {
    name: "分类",
    url: "root.home.categories",
    active: false
}, {
    name: "标签",
    url: "root.home.tags",
    active: false
}, {
    name: "评论",
    url: "root.home.tags",
    active: false
}, {
    name: "设置",
    url: "root.home.tags",
    active: false
}];

config.angular = {
    name: "routeApp"
}

config.url = {
    home: "/home",
    login: "/login",
    haslogin: "/haslogin"
}
config.editor = null;