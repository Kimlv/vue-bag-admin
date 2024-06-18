export const defaultBuiltRouter = [
    {
        path: '/',
        name: 'layout',
        redirect: '/home',
        component: () => import("@/packages/layout/index.vue"),
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import("@/packages/views/home/index.vue"),
                meta: {
                    id: 'home',
                    title: '首页',
                }
            },
        ],
    },
    // 注意点 1.如果省略最后一个'*'在解析或推送时将对params中的'/'字符进行编码
    // 2.不要写name属性，否则添加动态路由浏览器出现警告 和 已经添加过的路由跳转还是404
    {
        path: '/:pathMatch(.*)*',
        component: () => import("@/packages/views/error/index.vue"),
        title: '404',
        hidden: true,
    }
]