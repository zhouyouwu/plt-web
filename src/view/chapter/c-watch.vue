<template>
    <div class="mod-home">
        <h2>章节管理<el-button type="primary" @click="addChapter" style="float: right" size="small">新增章节</el-button></h2>
        <div class="content">

            <el-dialog
                    title="新增章节"
                    :visible="visibleAdd"
                    :append-to-body="true"
                    :show-close="false">

                <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="150px">

                    <el-form-item label="章节名" prop="typeName">
                        <el-input type="text" v-model="dataForm.typeName"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" prop="typeDescription">
                        <el-input type="text" v-model="dataForm.typeDescription"></el-input>
                    </el-form-item>
                    <el-form-item label="是否有所属章节">
                        <el-switch v-model="dataForm.isUse" @click="switchChange"></el-switch>
                    </el-form-item>
                    <el-form-item label="所属章节" prop="linkTypeId" >
                        <el-cascader
                                v-model="dataForm.linkTypeId"
                                :options="options"
                                :props="{ checkStrictly: true }"
                                clearable
                                placeholder="请选择所属章节"
                                size="mini" :disabled="!dataForm.isUse"/>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                <el-button @click="visibleAdd = false">取消</el-button>
                <el-button type="primary" @click="dataSubmit">确定</el-button>
                </span>
            </el-dialog>
            <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%; height: 500px">
                <el-table-column
                        prop="typeId"
                        label="章节编号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="typeName"
                        label="章节名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="linkTypeId"
                        label="上级章节编号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="typeDescription"
                        label="描述">
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="状态">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status === 1">使用中</el-tag>
                        <el-tag v-else type="danger">已禁用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button v-if='scope.row.status === 1' @click="delChapter(scope.row)" type="danger" size="mini">禁用</el-button>
                        <el-button v-if='scope.row.status === 0' @click="useChapter(scope.row)" type="info" size="mini">启用</el-button>
                        <el-button @click="mdfChapter(scope.row)" type="primary" size="mini">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog
                title="修改章节"
                :visible="visibleMdf"
                :append-to-body="true"
                :show-close="false">
            <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="150px">
            <el-form-item label="章节名" prop="typeName">
                <el-input type="text" v-model="dataForm.typeName"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="typeDescription">
                <el-input type="text" v-model="dataForm.typeDescription"></el-input>
            </el-form-item>
            <el-form-item label="是否有所属章节">
                <el-switch v-model="dataForm.isUse" @click="switchChange"></el-switch>
            </el-form-item>
            <el-form-item label="所属章节" prop="linkTypeId">
                <el-cascader
                        v-model="dataForm.linkTypeId"
                        :options="options"
                        :props="{ checkStrictly: true }"
                        clearable
                        placeholder="请选择所属章节"
                        size="mini" :disabled="!dataForm.isUse"/>
            </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visibleMdf = false">取消</el-button>
                <el-button type="primary" @click="mdfSubmit">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import cWatch from '../../assets/js/c-watch'

    export default cWatch;
</script>

<style scoped>

</style>
