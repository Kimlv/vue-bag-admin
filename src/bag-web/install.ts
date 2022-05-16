import type { App } from 'vue'
import mitt from 'mitt'
import Equal from 'equal-vue'
import ElementPlus from 'element-plus'
import "ant-design-vue/dist/antd.min.css";
import 'equal-vue/dist/style.css'
import 'element-plus/theme-chalk/display.css'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'element-plus/dist/index.css'
import 'material-icons/iconfont/material-icons.css'
import '@/bag-web/style/index.less'
import { readonly } from 'vue'
import { setupGlobComponents } from '@/bag-web/components'
import { setupStore } from '@/bag-web/store'
import { setupRouter } from '@/bag-web/router'
import { httpNetwork } from '@/packages/config'
import {setupGlobDirectives} from "@/common/extend/directive";

interface $optionsType {
    router?: {
        routes?: Array<any>,
    },
    config?: {
        httpNetwork?: object,
    }
}

const install = (app: App, options?: $optionsType) => {
    const _options = {
        configAppRouter: {
            routes: options?.router?.routes || [],
        },
        configApp: {
            httpNetwork: { ...httpNetwork, ...options?.config?.httpNetwork },
        },
    }
    app.config.globalProperties = _options
    app.provide('$configAppOptions', readonly(_options))
    app.provide('$mitt', mitt())
    app.use(Equal)
    app.use(ElementPlus)
    app.use(setupStore)
    app.use(setupGlobComponents)
    app.use(setupRouter)
    app.use(setupGlobDirectives)
}

export default install
export {
    $optionsType,
}