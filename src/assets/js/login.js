import {mapState} from 'vuex'
import store from "../../store/index";

export default {
    props: {
        fontSizeMin: {
            type: Number,
            default: 25
        },
        fontSizeMax: {
            type: Number,
            default: 30
        },
        backgroundColorMin: {
            type: Number,
            default: 255
        },
        backgroundColorMax: {
            type: Number,
            default: 255
        },
        colorMin: {
            type: Number,
            default: 0
        },
        colorMax: {
            type: Number,
            default: 160
        },
        lineColorMin: {
            type: Number,
            default: 100
        },
        lineColorMax: {
            type: Number,
            default: 255
        },
        dotColorMin: {
            type: Number,
            default: 0
        },
        dotColorMax: {
            type: Number,
            default: 255
        },
        contentWidth: {
            type: Number,
            default: 120
        },
        contentHeight: {
            type: Number,
            default: 34
        }
    },
    data() {
        return {
            dataForm: {
                userName: '',
                password: '',
                captcha: ''
            },
            dataRule: {
                userName: [
                    {required: true, message: '帐号不能为空', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '密码不能为空', trigger: 'blur'}
                ],
                captcha: [
                    { required: true, message: '验证码不能为空', trigger: 'blur' }
                ]
            },
            identifyCode: '',
        }
    },
    mounted() {
        this.createdCode()
    },
    methods: {
        // 提交表单
        dataFormSubmit() {
            this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                    if (this.identifyCode != this.dataForm.captcha) {
                        this.$message({
                            message: '验证码不正确',
                            type: 'error'
                        })
                        this.createdCode();
                        return;
                    }
                    let vm = this;
                    vm.$axios.post(vm.GLOBAL.login, {
                        userName: this.dataForm.userName,
                        password: this.dataForm.password
                    }).then(res => {
                        if (res.status && res.data.code === 0) {
                            store.state.user = res.data.result.user
                            this.$router.replace({name: 'main'})
                        }
                    })

                }
            })
        },
        createdCode() {
            const len = 4
            const codeList = []
            const chars = 'ABCDEFGHIJKLMNPQRSTUVWXYZ0123456789'
            const charsLen = chars.length
            for (let i = 0; i < len; i++) {
                codeList.push(chars.charAt(Math.floor(Math.random() * charsLen)))
            }
            this.identifyCode = codeList.join('')
            this.$emit('getIdentifyCode', this.identifyCode.toLowerCase())
            this.drawPic()
        },

        // 生成一个随机数
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min)
        },
        // 生成一个随机的颜色
        randomColor(min, max) {
            const r = this.randomNum(min, max)
            const g = this.randomNum(min, max)
            const b = this.randomNum(min, max)
            return 'rgb(' + r + ',' + g + ',' + b + ')'
        },

        drawPic() {
            const canvas = document.getElementById('s-canvas')
            const ctx = canvas.getContext('2d')
            ctx.textBaseline = 'bottom'
            // 绘制背景
            ctx.fillStyle = this.randomColor(this.backgroundColorMin, this.backgroundColorMax)
            ctx.fillRect(0, 0, this.contentWidth, this.contentHeight)
            // 绘制文字
            for (let i = 0; i < this.identifyCode.length; i++) {
                this.drawText(ctx, this.identifyCode[i], i)
            }
            this.drawLine(ctx)
            this.drawDot(ctx)
        },

        drawText(ctx, txt, i) {
            ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax)
            ctx.font = this.randomNum(this.fontSizeMin, this.fontSizeMax) + 'px SimHei'
            const x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1))
            const y = this.randomNum(this.fontSizeMax, this.contentHeight - 5)
            var deg = this.randomNum(-45, 45)
            // 修改坐标原点和旋转角度
            ctx.translate(x, y)
            ctx.rotate(deg * Math.PI / 180)
            ctx.fillText(txt, 0, 0)
            // 恢复坐标原点和旋转角度
            ctx.rotate(-deg * Math.PI / 180)
            ctx.translate(-x, -y)
        },

        // 绘制干扰线
        drawLine(ctx) {
            for (let i = 0; i < 5; i++) {
                ctx.strokeStyle = this.randomColor(this.lineColorMin, this.lineColorMax)
                ctx.beginPath()
                ctx.moveTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight))
                ctx.lineTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight))
                ctx.stroke()
            }
        },

        // 绘制干扰点
        drawDot(ctx) {
            for (let i = 0; i < 80; i++) {
                ctx.fillStyle = this.randomColor(0, 255)
                ctx.beginPath()
                ctx.arc(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight), 1, 0, 2 * Math.PI)
                ctx.fill()
            }
        }
    }
    , computed: {
        ...mapState([
            'user'
        ])
    }
}
