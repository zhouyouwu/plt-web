<template>
    <el-form>
        <h2>布局设置</h2>
        <el-form-item label="导航条类型">
            <el-radio-group v-model="navbarLayoutTypeVal" @change="setNav">
                <el-radio label="default" border>default</el-radio>
                <el-radio label="inverse" border>inverse</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="侧边栏皮肤">
            <el-radio-group v-model="sidebarLayoutSkinVal" @change="setSide">
                <el-radio label="light" border>light</el-radio>
                <el-radio label="dark" border>dark</el-radio>
            </el-radio-group>
        </el-form-item>
    </el-form>
</template>

<script>
    import {mapState} from "vuex";
    import store from '../../store/index'

    export default {
        data() {
            return {
                sidebarLayoutSkinVal: '',
                navbarLayoutTypeVal: ''
            }
        },
        created() {
            this.sidebarLayoutSkinVal = this.sidebarLayoutSkin
            this.navbarLayoutTypeVal = this.navbarLayoutType
        },
        methods: {
            setNav() {
                console.log(this.navbarLayoutTypeVal)
                store.state.navbarLayoutType = this.navbarLayoutTypeVal;
            },
            setSide() {
                console.log(this.sidebarLayoutSkinVal)
                store.state.sidebarLayoutSkin = this.sidebarLayoutSkinVal;
            }
        },
        computed: {
            ...mapState([
                'sidebarLayoutSkin',
                'navbarLayoutType'
            ])
        }
    }
</script>

