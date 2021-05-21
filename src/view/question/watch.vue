<template>
    <div class="mod-home">
        <h1>查看题目</h1>
        <el-cascader
                :options="options"
                :props="{ checkStrictly: true }"
                clearable/>
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
    import {mapState} from 'vuex'

    export default {
        name: "watch",
        data() {
            return {
                carouselData: [],
                refresh: true,
                total: 0,
                page: 1,
                typeId: '',
                options: []
            }
        },
        created(){
            this.getQuestion();
            this.getQuestionType()
        },
        computed: {
            ...mapState([
                'documentClientHeight',
            ]),
            siteContentViewHeight() {
                return this.documentClientHeight - 200 - 20;
            },
            siteCarouselViewHeight() {
                return this.documentClientHeight - 200;
            }
        },
        methods: {
            getQuestion() {
                let vm = this;
                vm.$axios.get(vm.GLOBAL.Knowledge + 'knowledge', {
                    params: {
                        page: this.page,
                        size: 10,
                        typeId: this.typeId
                    }
                }).then(res => {
                    if (res.status && res.data.code === 0) {
                        this.carouselData = [];
                        this.total = res.data.result.total;
                        res.data.result.list.forEach(o => {
                            this.carouselData.push(o.knowUrl);
                        })
                    }
                })
            },
            changePage(val) {
                this.page = val;
                this.getQuestion();
            },
            getQuestionType() {
                let vm = this;
                vm.$axios.get(vm.GLOBAL.Knowledge + 'type').then(res => {
                    if (res.status && res.data.code === 0) {
                        this.options = res.data.result;
                    }
                })
            },
        }

    }
</script>

<style scoped>

</style>
