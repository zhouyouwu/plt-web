import {mapState} from "vuex";

export default {
    name: "c-watch",
    data() {
        let validateLinkTypeId = (rule, value, callback) => {
            if (this.dataForm.isUse && (this.dataForm.linkTypeId==null||this.dataForm.linkTypeId==='')) {
                callback(new Error('所属章节不能为空'))
            } else {
                callback()
            }
        }
        return {
            tableData: [],
            visibleAdd: false,
            visibleMdf: false,
            dataForm: {
                typeDescription: '',
                isUse: false,
                typeName: '',
                typeLevel: 1,
                linkTypeId: '',
                linkTypeLevel: '',
            },
            dataRule: {
                typeName: [
                    {required: true, message: '名字不能为空', trigger: 'blur'}
                ],
                linkTypeId: [
                    {validator: validateLinkTypeId, trigger: 'blur'}
                ],
            },
            options: [],

        }
    },
    created() {
        this.getQuestionType()
        this.getChapterType();
    },
    methods: {
        switchChange() {
            if (this.dataForm.isUse) {
                this.dataForm.typeLevel = 2;
                this.dataForm.linkTypeLevel = 1;
            } else {
                this.dataForm.typeLevel = 1;
                this.dataForm.linkTypeLevel = '';
                this.dataForm.linkTypeId = '';
            }
        },
        useChapter(row) {
            let vm = this;
            vm.$axios.put(vm.GLOBAL.Knowledge + 'type/' + row.typeId + "/1").then(res => {
                if (res.status && res.data.code === 0) {
                    this.$message({
                        type: "success",
                        message: "启用成功"
                    });
                    this.getChapterType();
                }
            })
        },
        delChapter(row) {
            let vm = this;
            vm.$axios.put(vm.GLOBAL.Knowledge + 'type/' + row.typeId + "/0").then(res => {
                if (res.status && res.data.code === 0) {
                    this.$message({
                        type: "success",
                        message: "禁用成功"
                    });
                    this.getChapterType();
                }
            })
        },
        addChapter() {
            this.dataForm = {
                typeDescription: '',
                isUse: false,
                typeName: '',
                typeLevel: 1,
                linkTypeId: '',
                linkTypeLevel: '',
            };
            this.visibleAdd = true;
        },
        mdfChapter(row) {
            this.dataForm.typeId = row.typeId;
            this.dataForm.linkTypeLevel = row.linkTypeLevel;
            this.dataForm.typeDescription = row.typeDescription;
            this.dataForm.isUse = row.typeLevel !== 1;
            this.dataForm.typeName = row.typeName;
            this.dataForm.typeLevel = row.typeLevel;
            this.dataForm.linkTypeId = row.linkTypeId;
            console.log(this.dataForm)
            this.visibleMdf = true;
        },
        getChapterType() {
            let vm = this;
            vm.$axios.get(vm.GLOBAL.Knowledge + 'chapterType').then(res => {
                if (res.status && res.data.code === 0) {
                    this.tableData = res.data.result;
                }
            })
        },
        /**
         * 为级联选择器查数据
         */
        getQuestionType() {
            let vm = this;
            vm.$axios.get(vm.GLOBAL.Knowledge + 'type').then(res => {
                if (res.status && res.data.code === 0) {
                    this.options = res.data.result;
                }
            })
        },
        dataSubmit() {
            this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                    let vm = this;
                    vm.$axios.post(vm.GLOBAL.Knowledge + 'type', {
                        typeDescription: this.dataForm.typeDescription,
                        typeName: this.dataForm.typeName,
                        typeLevel: this.dataForm.typeLevel,
                        linkTypeId: this.dataForm.linkTypeId,
                        linkTypeLevel: this.dataForm.linkTypeLevel
                    }, {
                        headers: {'Content-Type': 'application/json;charset=UTF-8'},
                        transformRequest: function (data) {
                            return JSON.stringify(data);
                        }
                    }).then(res => {
                        if (res.status && res.data.code === 0) {
                            this.$message({
                                type: "success",
                                message: "添加成功"
                            });
                            this.getChapterType();
                            this.getQuestionType();
                            this.visibleAdd = false
                        }
                    })
                }
            })
        },
        mdfSubmit() {
            this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                    let vm = this;
                    vm.$axios.put(vm.GLOBAL.Knowledge + 'type/' + this.dataForm.typeId, {
                        typeDescription: this.dataForm.typeDescription,
                        typeName: this.dataForm.typeName,
                        typeLevel: this.dataForm.typeLevel,
                        linkTypeId: this.dataForm.linkTypeId,
                        linkTypeLevel: this.dataForm.linkTypeLevel
                    }, {
                        headers: {'Content-Type': 'application/json;charset=UTF-8'},
                        transformRequest: function (data) {
                            return JSON.stringify(data);
                        }
                    }).then(res => {
                        if (res.status && res.data.code === 0) {
                            this.$message({
                                type: "success",
                                message: "修改成功"
                            });
                            this.getChapterType();
                            this.getQuestionType();
                            this.visibleMdf = false;
                        }
                    })
                }
            })
        }
    },
    computed: {
        ...mapState([
            'documentClientHeight',
        ]),
        siteContentViewHeight() {
            return this.documentClientHeight - 200 - 80;
        },
    }
}
