let setUser = 'SET_USER';

const mutations = {
    [setUser] (state, payload) {
        state.user = payload
    },
    setDocumentClientHeight(state, payload) {
        state.documentClientHeight = payload
    },
    navbarLayoutType(state, payload) {
        state.navbarLayoutType = payload
    },
    sidebarLayoutSkin(state, payload) {
        state.sidebarLayoutSkin = payload
    },
    updateSidebarFold(state, payload) {
        state.sidebarFold = payload
    },
    menuList(state, payload) {
        state.menuList = payload
    },
    menuActiveName(state, payload) {
        state.menuActiveName = payload
    },
    contentIsNeedRefresh(state, payload) {
        state.contentIsNeedRefresh = payload
    },
    mainTabs(state, payload) {
        state.mainTabs = payload
    },
    mainTabsActiveName(state, payload) {
        state.mainTabsActiveName = payload
    },
}

export default mutations;
