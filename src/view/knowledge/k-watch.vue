<template>
    <div class="mod-home">
        <h2>查看知识点</h2>
        <el-cascader
                v-model="typeId"
                :options="options"
                :props="{ checkStrictly: true }"
                clearable size="mini"/>
        <el-carousel trigger="click" :height="siteCarouselViewHeight + 'px'"
                     :autoplay="false">
            <el-carousel-item v-for="item in carouselData" :key="item">
                <h3 class="small">
                    <iframe v-if="refresh" :src="item" width="100%" :height="siteContentViewHeight+'px'"
                            frameborder="0"/>
                </h3>
            </el-carousel-item>
        </el-carousel>

        <el-pagination
                layout="prev, pager, next"
                :total="total"
                :page-size="10"
                :current-page="page"
                @current-change="changePage">
        </el-pagination>
    </div>
</template>

<script>
    import Watch from '../../assets/js/know/watch'

    export default Watch;
</script>

<style scoped>

</style>
