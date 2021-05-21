export default {
    name: "UserManagement",
    data() {
        let validatePhoneNo = (rule, value, callback) => {
            let strTemp = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
            if (!strTemp.test(this.dataForm.phoneNo)) {
                callback(new Error('请输入正确的电话号码！'))
            } else {
                callback()
            }
        }
        return {
            total: 0,
            page: 1,
            tableData: [],
            transferValue: [],
            transferData: [],
            visible: false,
            visibleAddUser: false,
            currentUser: {},
            dataForm: {
                nickname: '',
                phoneNo: ''
            },
            dataRule: {
                nickname: [
                    {required: true, message: '使用者不能为空', trigger: 'blur'}
                ],
                phoneNo: [
                    {required: true, message: '电话号码不能为空', trigger: 'blur'},
                    {validator: validatePhoneNo, trigger: 'blur'}
                ],
            }
        }
    },
    created() {
        this.getUserAll();
        this.getRoles();
    },
    methods: {
        delUser(user) {
            let vm = this;
            vm.$axios.delete(vm.GLOBAL.user + user.userId).then(res => {
                if (res.status && res.data.code === 0) {
                    this.$message({
                        message: '已删除用户',
                        type: 'success'
                    })
                    this.getUserAll();
                }
            })
        },
        changeSize(val) {
            this.page = val;
            this.getUserAll();
        },
        getUserAll() {
            let vm = this;
            vm.$axios.get(vm.GLOBAL.user + "userAll", {
                params: {
                    page: this.page,
                    size: 10
                }
            }).then(res => {
                if (res.status && res.data.code === 0) {
                    let data = res.data.result.list;
                    this.tableData = Array.from(data).map(item => ({
                        userId: item.user.userId,
                        nickname: item.user.nickname,
                        phoneNo: item.user.phoneNo,
                        lastLoginTime: item.user.lastLoginTime,
                        roles: item.roles
                    }));
                    this.total = res.data.result.total;
                }
            })
        },
        handleRoles(user) {
            this.currentUser = user;
            this.transferValue = [];
            console.log(user.roles)
            user.roles.forEach(o => {
                console.log(o)
                this.transferValue.push(o.id)
            })

            this.visible = true;
        },
        getRoles() {
            let vm = this;
            vm.$axios.get(vm.GLOBAL.user + "roleAll").then(res => {
                if (res.status && res.data.code === 0) {
                    let data = res.data.result;
                    this.transferData = Array.from(data).map(item => ({
                        key: item.id,
                        label: item.name
                    }));
                }
            })
        },
        dataTransferSubmit() {
            let vm = this;
            let param = '';

            this.transferValue.forEach(o => {
                param += o
                param += "&";
            })

            vm.$axios.put(vm.GLOBAL.user + this.currentUser.userId + "/role", {

                roles: param.substr(0, param.length - 1)
            }).then(res => {
                if (res.status && res.data.code === 0) {
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    })
                    this.visible = false;
                    this.getUserAll();
                }
            })
        },
        addUser() {
            this.dataForm = {
                nickname: '',
                phoneNo: ''
            };
            this.visibleAddUser = true;
        },
        dataSubmit() {
            this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                    let vm = this;

                    vm.$axios.post(vm.GLOBAL.user + "admin", {
                        nickname: this.dataForm.nickname,
                        phoneNo: this.dataForm.phoneNo
                    }).then(res => {
                        if (res.status && res.data.code === 0) {
                            let data = res.data.result;
                            let message = '用户新增成功!<br/>用户账号为：' + data.userId + ", <br/>用户密码为：asdfghjkl，请及时更改！"
                            this.$alert(message, '提示', {
                                dangerouslyUseHTMLString:true,
                                confirmButtonText: '确定',
                            });
                            this.visible = false;
                            this.getUserAll();
                        }
                    })
                }
            })
        }

    }
}
