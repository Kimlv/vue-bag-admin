const result = (data = []) => {
    return {
        code: 1,
        data,
        msg: ''
    }
}

const menus = [
    {
        id: 1,
        title: '用户管理',
        file: '/src/app/views/user/index.vue',
        path: '/user',
        name: 'user',
        icon: 'BookOutline'
    },
    {
        id: 2,
        title: '项目管理',
        file: '/src/app/views/pmp/index.vue',
        path: '/pmp',
        name: 'pmp'
    },
    {
        id: 3,
        title: '图标管理',
        file: '/src/app/views/icon/index.vue',
        path: '/icon',
        name: 'icon'
    },
    {
        id: 4,
        title: '编辑器',
        file: '/src/app/views/editor/index.vue',
        path: '/editor',
        name: 'editor',
        icon: 'BookOutline',
        children: [
            {
                id: 5,
                title: 'MD文档',
                file: '/src/app/views/editor/md.vue',
                path: '/md',
                name: 'md',
            },
            {
                id: 6,
                title: '富文本',
                file: '/src/app/views/editor/rich.vue',
                path: '/rich',
                name: 'rich',
            },
        ]
    }]


const gcjsMenus = [
    {
        id: 201,
        title: '用户管理2',
        file: '/src/app/views/user/index.vue',
        path: '/user2',
        name: 'user2',
        icon: 'BookOutline'
    },
]


const baseMenus = [
    {
        id: 101,
        title: '基础功能-测试',
        file: '/src/app/views/editor/rich.vue',
        path: '/rich3',
        name: 'rich3',
    },
]

export default [
    {
        url: "/api/getMenus",
        method: "post",
        response: () => {
            return result(menus)
        }
    },
    {
        url: "/api/getClassify",
        method: "post",
        response: () => {
            return result([
                {
                    id: 100,
                    title: '基础功能',
                    file: '/src/app/views/user/index.vue',
                    path: '/user',
                    name: 'user',
                    children: baseMenus,
                },
                {
                    id: 200,
                    title: '工程建设',
                    file: '/src/app/views/user/index.vue',
                    path: '/user',
                    name: 'user',
                    children: gcjsMenus,
                },
                {
                    id: 300,
                    title: '政府采购',
                    file: '/src/app/views/user/index.vue',
                    path: '/user',
                    name: 'user',
                },
                {
                    id: 400,
                    title: '系统设置',
                    file: '/src/app/views/user/index.vue',
                    path: '/user',
                    name: 'user',
                },
            ])
        }
    }
]