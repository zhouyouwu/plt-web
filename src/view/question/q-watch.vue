<template>
    <div class="mod-home">
        <h2>题目管理</h2>
        <div class="header">
            <el-select v-model="currMode" placeholder="请选择" size="mini" @change="getQuestion">
                <el-option label="选择题" value="normal"/>
                <el-option label="编程题" value="program"/>
            </el-select>
            <el-cascader
                    v-model="currTypeId"
                    :options="options"
                    :props="{ checkStrictly: true }"
                    clearable
                    placeholder="请选择所属章节"
                    size="mini" @change="getQuestion"/>
            <el-button type="primary" @click="addQues" style="float: right" size="mini">新增题目</el-button>
        </div>
        <div class="content">
            <el-dialog
                    title="新增题目"
                    :visible="visibleAdd"
                    :append-to-body="true"
                    :show-close="false">

                <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="150px">

                    <el-form-item label="题目" prop="quesTopic">
                        <el-input type="textarea" v-model="dataForm.quesTopic"></el-input>
                    </el-form-item>
                    <el-form-item label="是否是编程题">
                        <el-switch v-model="dataForm.isProgram" @click="switchChange"></el-switch>
                    </el-form-item>
                    <el-form-item label="选项(使用&~分隔)" prop="quesOptions">
                        <el-input type="text" v-model="dataForm.quesOptions" :disabled="dataForm.isProgram"></el-input>
                    </el-form-item>
                    <el-form-item label="答案" prop="quesAnswer">
                        <el-input type="text" v-model="dataForm.quesAnswer"></el-input>
                    </el-form-item>
                    <el-form-item label="所属章节" prop="quesType">
                        <el-cascader
                                v-model="dataForm.quesType"
                                :options="options"
                                :props="{ checkStrictly: true }"
                                clearable
                                placeholder="请选择所属章节"
                                size="mini"/>
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
                        prop="quesId"
                        label="题目编号">
                </el-table-column>
                <el-table-column
                        prop="quesTopic"
                        label="题目">
                </el-table-column>
                <el-table-column
                        v-if="currMode === 'normal'"
                        prop="quesOptions"
                        label="选项">
                </el-table-column>
                <el-table-column
                        prop="quesAnswer"
                        label="答案">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button @click="mdfQues(scope.row)" type="primary" size="mini">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
                    layout="sizes, prev, pager, next"
                    :total="total"
                    :page-size="size"
                    :current-page="page"
                    @size-change="changeSize">
            </el-pagination>
        </div>

        <el-dialog
                title="修改题目"
                :visible="visibleMdf"
                :append-to-body="true"
                :show-close="false">
            <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="150px">

                <el-form-item label="题目" prop="quesTopic">
                    <el-input type="textarea" v-model="dataForm.quesTopic"></el-input>
                </el-form-item>
                <el-form-item label="选项(使用&~分隔)" prop="quesOptions" v-if="dataForm.quesMode === 'normal'">
                    <el-input type="text" v-model="dataForm.quesOptions" :disabled="dataForm.isProgram"></el-input>
                </el-form-item>
                <el-form-item label="答案" prop="quesAnswer">
                    <el-input type="text" v-model="dataForm.quesAnswer"></el-input>
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
    import qWatch from '../../assets/js/ques/q-watch'
    export default qWatch;
</script>

<style scoped>

</style>
