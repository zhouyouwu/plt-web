<template>
    <div class="site-wrapper"
         :class="{ 'site-sidebar--fold': sidebarFold }"
         v-loading.fullscreen.lock="loading"
         element-loading-text="拼命加载中">
        <template v-if="!loading">
            <main-navbar/>
            <main-sidebar/>
            <div class="site-content__wrapper" :style="{ 'min-height': documentClientHeight + 'px' }">
                <main class="site-content">
                    <!-- 主入口标签页 e -->
                    <el-card :body-style="siteContentViewHeight">
                        <keep-alive>
                            <router-view v-if="!contentIsNeedRefresh"/>
                        </keep-alive>
                    </el-card>
                </main>
            </div>
        </template>
    </div>
</template>

<script>
    import mainView from "@/assets/js/mainView";

    export default mainView;
</script>

