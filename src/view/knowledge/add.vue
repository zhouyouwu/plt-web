<template>
    <div class="mod-home">
        <h2>添加知识点</h2>
        <div class="header" style="margin-bottom: 10px">
            <el-cascader
                    v-model="typeId"
                    :options="options"
                    :props="{ checkStrictly: true }"
                    clearable
                    placeholder="请选择知识点所属章节"
                    size="mini"/>
            <el-button type="primary" style="float: right" @click="saveHtml" size="mini">保存</el-button>
        </div>
        <div class="content">
            <quill-editor class="editor"
                          ref="myTextEditor"
                          v-model="content"
                          :options="editorOption"
                          :style="'height:'+ siteContentViewHeight+'px'">
            </quill-editor>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "add",
        data() {
            return {
                content: null,
                editorOption: {
                    modules: {
                        toolbar: [
                            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
                            ["blockquote", "code-block"], // 引用  代码块
                            [{header: 1}, {header: 2}], // 1、2 级标题
                            [{list: "ordered"}, {list: "bullet"}], // 有序、无序列表
                            [{script: "sub"}, {script: "super"}], // 上标/下标
                            [{indent: "-1"}, {indent: "+1"}], // 缩进
                            // [{'direction': 'rtl'}],                         // 文本方向
                            [{size: ["small", false, "large", "huge"]}], // 字体大小
                            [{header: [1, 2, 3, 4, 5, 6, false]}], // 标题
                            [{color: []}, {background: []}], // 字体颜色、字体背景颜色
                            [{font: []}], // 字体种类
                            [{align: []}], // 对齐方式
                            ["clean"], // 清除文本格式
                            ["link", "image", "video"] // 链接、图片、视频
                        ], //工具菜单栏配置
                    },
                    placeholder: '请编辑要添加的知识点', //提示
                    readyOnly: false, //是否只读
                    theme: 'snow', //主题 snow/bubble
                    syntax: true, //语法检测
                },
                options: [],
                typeId: '',
            }
        },
        created() {
            this.getQuestionType()
        },
        methods: {
            saveHtml() {
                let vm = this;
                if (!vm.typeId) {
                    this.$message({
                        message: '请选择章节',
                        type: 'error'
                    })
                } else {
                    vm.$axios.post(vm.GLOBAL.Knowledge + vm.typeId + '/knowledge', {
                        pageData: this.content
                    }).then(res => {
                        if (res.status && res.data.code === 0) {
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            })
                        }
                    })
                }
            },
            getQuestionType() {
                let vm = this;
                vm.$axios.get(vm.GLOBAL.Knowledge + 'type').then(res => {
                    if (res.status && res.data.code === 0) {
                        this.options = res.data.result;
                    }
                })
            },
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor;
            },
            ...mapState([
                'documentClientHeight',
            ]),
            siteContentViewHeight() {
                return this.documentClientHeight - 200 - 80;
            },
        }
    }
</script>

<style scoped>
</style>
