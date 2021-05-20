const state = {
    // 页面文档可视高度(随窗口改变大小)
    documentClientHeight: 0,
    // 导航条, 布局风格, defalut(默认) / inverse(反向)
    navbarLayoutType: 'default',
    // 侧边栏, 布局皮肤, light(浅色) / dark(黑色)
    sidebarLayoutSkin: 'dark',
    // 侧边栏, 折叠状态
    sidebarFold: false,
    // 侧边栏, 菜单
    menuList: [],
    menuActiveName: '',
    // 内容, 是否需要刷新
    contentIsNeedRefresh: false,
    // 主入口标签页
    mainTabs: [],
    mainTabsActiveName: '',

    user: {
        userId: '123',
        wxOpenid: '123',
        sessionKey: '',
        password: '',
        nickname: '123456',
        phoneNo: '',
        signature: '',
        profilePhoto: '',
        eMail: '',
        sex: '',
        birthday: '',
        lastLoginTime: '',
        token: ''
    }
}

export default state;
