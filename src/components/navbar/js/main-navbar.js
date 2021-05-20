import {mapState} from "vuex";
import store from '../../../store/index'

export default {
    data() {
        let validateConfirmPassword = (rule, value, callback) => {
            if (this.dataForm.newPassword !== value) {
                callback(new Error('确认密码与新密码不一致'))
            } else {
                callback()
            }
        }
        return {
            visible: false,
            dataForm: {
                password: '',
                newPassword: '',
                confirmPassword: ''
            },
            dataRule: {
                password: [
                    {required: true, message: '原密码不能为空', trigger: 'blur'}
                ],
                newPassword: [
                    {required: true, message: '新密码不能为空', trigger: 'blur'}
                ],
                confirmPassword: [
                    {required: true, message: '确认密码不能为空', trigger: 'blur'},
                    {validator: validateConfirmPassword, trigger: 'blur'}
                ]
            }
        }
    },
    created() {
    },
    computed: {
        ...mapState([
            'navbarLayoutType',
            'user',
            'sidebarFold'
        ]),
    },
    methods: {
        setSideBarFold(){
            store.state.sidebarFold = (!this.sidebarFold);
        },
        updatePassword(){
            this.dataForm = {
                password: '',
                newPassword: '',
                confirmPassword: ''
            }
            this.visible = true;
        },
        dataFormSubmit () {
            this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                    let vm = this;
                    vm.$axios.put(vm.GLOBAL.user + vm.user.userId + "/password",{
                        oldPassword: this.dataForm.password,
                        newPassword: this.dataForm.newPassword
                    }).then(res => {
                        if (res.status && res.data.code === 0) {
                            this.$message({
                                message: '操作成功',
                                type: 'success'
                            })
                            this.visible = false;
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })
                }
            })
        }
    }
}
