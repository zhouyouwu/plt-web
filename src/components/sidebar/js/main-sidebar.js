import SubMenu from '../main-sidebar-sub-menu'
import {isURL} from '@/utils/validate'
import {mapState} from "vuex";

export default {
    data() {
        return {
            dynamicMenuRoutes: []
        }
    },
    components: {
        SubMenu
    },
    computed: {
        ...mapState([
            'sidebarLayoutSkin',
            'menuActiveName',
            'sidebarFold'
        ]),
    },
    watch: {
        $route: 'routeHandle'
    },
    created() {
        this.routeHandle(this.$route)
    },
    methods: {
        // 路由操作
        routeHandle(route) {
            if (route.meta.isTab) {
                // tab选中, 不存在先添加
                var tab = this.mainTabs.filter(item => item.name === route.name)[0]
                if (!tab) {
                    if (route.meta.isDynamic) {
                        route = this.dynamicMenuRoutes.filter(item => item.name === route.name)[0]
                        if (!route) {
                            return console.error('未能找到可用标签页!')
                        }
                    }
                    tab = {
                        menuId: route.meta.menuId || route.name,
                        name: route.name,
                        title: route.meta.title,
                        type: isURL(route.meta.iframeUrl) ? 'iframe' : 'module',
                        iframeUrl: route.meta.iframeUrl || '',
                        params: route.params,
                        query: route.query
                    }
                    this.mainTabs = this.mainTabs.concat(tab)
                }
                this.menuActiveName = tab.menuId + ''
                this.mainTabsActiveName = tab.name
            }
        }
    }
}
