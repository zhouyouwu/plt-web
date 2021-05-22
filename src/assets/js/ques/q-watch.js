import {mapState} from "vuex";

export default {
    name: "q-watch",
    data() {
        let validateLinkTypeId = (rule, value, callback) => {
            if (this.dataForm.isUse && (this.dataForm.linkTypeId == null || this.dataForm.linkTypeId === '')) {
                callback(new Error('所属章节不能为空'))
            } else {
                callback()
            }
        }
        return {
            tableData: [],
            visibleAdd: false,
            visibleMdf: false,
            currMode: 'normal',
            currTypeId: '',
            dataForm: {
                quesId: '',
                quesTopic: '',
                quesOptions: '',
                quesAnswer: '',
                quesType: '',
                quesMode: 'normal',
                isProgram: false
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
            page: 1,
            total: 0,
            size: 10
        }
    },
    created() {
        this.getQuestionType()
        this.getQuestion();
    },
    methods: {
        switchChange() {
            if (this.dataForm.isProgram) {
                this.dataForm.quesOptions = ''
            }
            this.quesMode = this.dataForm.isProgram ? "program" : "normal";
        },
        changeSize(val) {
            this.size = val;
            this.getQuestion();
        },
        addQues() {
            this.dataForm = {
                quesId: '',
                quesTopic: '',
                quesOptions: '',
                quesAnswer: '',
                quesType: '',
                quesMode: 'normal'
            };
            this.visibleAdd = true;
        },
        mdfQues(row) {
            this.dataForm.quesId = row.quesId;
            this.dataForm.quesTopic = row.quesTopic;
            this.dataForm.quesOptions = row.quesOptions;
            this.dataForm.quesAnswer = row.quesAnswer;
            this.dataForm.quesType = row.quesType;
            this.dataForm.quesMode = row.quesMode;

            this.visibleMdf = true;
        },
        getQuestion() {
            let vm = this;
            vm.$axios.get(vm.GLOBAL.Knowledge + this.currMode + '/question', {
                params: {
                    page: this.page,
                    size: this.size,
                    typeId: this.currTypeId.lastItem
                }
            }).then(res => {
                if (res.status && res.data.code === 0) {
                    this.total = res.data.result.total;
                    this.tableData = res.data.result.list;
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
                    vm.$axios.post(vm.GLOBAL.Knowledge + this.dataForm.quesMode + "/" + this.dataForm.quesType + "/question", {
                        quesTopic: this.dataForm.quesTopic,
                        quesOptions: this.dataForm.quesOptions,
                        quesAnswer: this.dataForm.quesAnswer,
                        quesType: this.dataForm.quesType.lastItem,
                        quesMode: this.quesMode
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

                            this.getQuestion()
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
                    vm.$axios.put(vm.GLOBAL.Knowledge + this.dataForm.quesMode + "/" + this.dataForm.quesType + "/" + this.dataForm.quesId, {
                        quesTopic: this.dataForm.quesTopic,
                        quesOptions: this.dataForm.quesOptions,
                        quesAnswer: this.dataForm.quesAnswer,
                        quesId: this.dataForm.quesId
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

                            this.getQuestion();
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
