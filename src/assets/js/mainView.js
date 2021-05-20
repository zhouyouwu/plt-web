import MainNavbar from '../../components/navbar/main-navbar'
import MainSidebar from '../../components/sidebar/main-sidebar'
import { mapState } from 'vuex'
import store from '../../store/index'

export default {
    data() {
        return {
            loading: true
        }
    },
    components: {
        MainNavbar,
        MainSidebar
    },
    computed: {
        ...mapState([
            'documentClientHeight',
            'sidebarFold',
            'contentIsNeedRefresh'
        ]),
        siteContentViewHeight () {
            var height = this.documentClientHeight - 50 - 30 - 2
            return { minHeight: height + 'px' }
        }
    },
    created() {
    },
    mounted() {
        this.resetDocumentClientHeight()
        this.loading = false
    },
    methods: {
        // 重置窗口可视高度
        resetDocumentClientHeight() {
            store.state.documentClientHeight = document.documentElement['clientHeight']
            window.onresize = () => {
                store.state.documentClientHeight = document.documentElement['clientHeight']
            }
        },
    }
}
