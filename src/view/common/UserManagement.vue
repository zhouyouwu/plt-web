<template>
    <div class="mod-home">
        <h2>账号管理<el-button type="primary" @click="addUser" size="small" style="float: right">新增账户</el-button></h2>
        <div class="content">

            <el-dialog
                    title="新增账户"
                    :visible="visibleAddUser"
                    :append-to-body="true"
                    :show-close="false">

                <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="80px">

                    <el-form-item label="使用者" prop="nickname">
                        <el-input type="text" v-model="dataForm.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码" prop="phoneNo">
                        <el-input type="text" v-model="dataForm.phoneNo"></el-input>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                <el-button @click="visibleAddUser = false">取消</el-button>
                <el-button type="primary" @click="dataSubmit">确定</el-button>
                </span>
            </el-dialog>
            <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%; height: 500px">
                <el-table-column
                        prop="userId"
                        label="账号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="nickname"
                        label="姓名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="phoneNo"
                        label="电话">
                </el-table-column>
                <el-table-column
                        prop="roles"
                        label="权限">
                    <template slot-scope="scope">
                        <span v-for="role in scope.row.roles" :key="role.id">
                            <el-tag>{{role.name}}</el-tag>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="lastLoginTime"
                        label="最后登录时间">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button @click="delUser(scope.row)" type="danger" size="mini">删除账号</el-button>
                        <el-button @click="handleRoles(scope.row)" type="info" size="mini">修改权限</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="10"
                    :current-page="page"
                    @current-change="changeSize">
            </el-pagination>
        </div>

        <el-dialog
                title="修改权限"
                :visible="visible"
                :append-to-body="true"
                :show-close="false">

            <h3>要修改的账号：{{ currentUser.nickname }}</h3>
            <el-transfer v-model="transferValue"
                         :data="transferData"
                         :titles="['可选角色','已选角色']"/>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取消</el-button>
                <el-button type="primary" @click="dataTransferSubmit">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import UserManagement from "@/assets/js/UserManagement";

    export default UserManagement;
</script>

<style scoped>

</style>
