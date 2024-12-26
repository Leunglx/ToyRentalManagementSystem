<template>
  <div class="bg">
    <!-- 顶部按钮 -->
    <div class="top-btn">
      <el-button type="primary" plain @click="centerDialogVisible = true; formTitile = '值班信息录入'">值班信息录入</el-button>
      <el-popconfirm
        title="确认删除吗?此操作不可逆"
        confirm-button-text="是"
        cancel-button-text="否"
        confirm-button-type="danger"
        :hide-after="50"
        @confirm="handleMultiDelete()"
      >
        <template #reference>
           <el-button type="primary" plain>批量删除</el-button>
        </template>
      </el-popconfirm>
    </div>

    <!-- 值班信息录入表单 -->
    <el-dialog
      v-model="centerDialogVisible"
      :title="formTitile"
      width="500"
      align-center
    >
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="form"
        :rules="rules"
        label-width="auto"
      >
        <el-form-item label="营业员id" prop="clerkId">
          <el-input v-model="form.clerkId" />
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            v-model="form.startTime"
            type="datetime"
            aria-label="选择时间"
            placeholder="选择时间"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            v-model="form.endTime"
            type="datetime"
            aria-label="选择时间"
            placeholder="选择时间"
            style="width: 100%"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="clearForm(ruleFormRef)">取消</el-button>
          <el-button type="primary" @click="commitForm()">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 表格 -->
    <el-table 
      :data="tableData" 
      height="510" 
      style="width: 100%"
      ref="multipleTableRef"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" :selectable="selectable" width="55" />
      <el-table-column align="center" label="id" prop="id" />
      <el-table-column align="center" label="营业员id" prop="clerkId" />
      <el-table-column align="center" label="开始时间" prop="startTime" :formatter="startPlaybackFormat" />
      <el-table-column align="center" label="结束时间" prop="endTime" :formatter="endPlaybackFormat" />
      <el-table-column align="right">
        <template #header>
          <div class="search-box">
            <el-input v-model="search" size="small" placeholder="根据营业员id搜索..." class="input" @keyup.enter="searchWork()" />
            <el-button type="primary" size="small" class="search-btn" @click="searchWork()">搜索</el-button>
          </div>
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            修改
          </el-button>
          <el-popconfirm
            title="确认删除吗?此操作不可逆"
            confirm-button-text="是"
            cancel-button-text="否"
            confirm-button-type="danger"
            :hide-after="50"
            @confirm="handleDelete(scope.$index, scope.row)"
          >
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination">
      <div class="pagination-block">
        <el-pagination
          background
          layout="prev, pager, next, total"
          :total="state.total"
          :current-page="state.currentPage"
          :page-size="state.pageSize"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { unref, ref, reactive, inject, onMounted, watch } from 'vue'

import moment from 'moment/moment'
import 'moment/locale/zh-cn'

const $API = inject('$API')
const $Tools = inject('$Tools')

const search = ref('')
const tableData = ref([])

const centerDialogVisible = ref(false)
const multipleTableRef = ref()
const multipleSelection = ref([])
const formTitile = ref('值班信息录入')
// 暂时存放值班信息id 用于更新
let tempId = 0

// 获取表单元素
const ruleFormRef = ref()
// 表单数据
const form = reactive({
  clerkId: '',
  startTime: '',
  endTime: ''
})
// id校验规则
const validateId = (rule, value, callback) => {
  const reg = /^[1-9]\d*$/
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error('必须为一个正整数！'))
  }
}
// 表单校验规则
const rules = reactive({
  clerkId: { required: true, message: '请输入营业员id', trigger: 'blur' },
  startTime: { type: 'datetime', required: true, message: '请选择开始时间', trigger: 'blur' },
  endTime: { type: 'datetime', required: true, message: '请选择结束时间', trigger: 'blur' },
})

// 分页用到的数据
const state = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 勾选后的响应
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

// 改变页码
const handleCurrentChange = (val) => {
  state.currentPage = val
  getWorkList({ clerkId: '', currentPage: state.currentPage, pageSize: state.pageSize})
}

// 查询值班信息列表
async function getWorkList(params) {
  await $API.work.getWorkList(params)
    .then(({ data }) =>{
      console.log('查询res', data.data)
      tableData.value = data.data.works
      state.currentPage = data.data.pagenition.currentPage
      state.pageSize = data.data.pagenition.pageSize
      state.total = data.data.pagenition.total
    })
    .catch(err => {
      console.log('查询err',err)
      // $Tools.handleMuiltiErrMsg(err)
    })
}

// 值班信息录入
function addWork() {
  $API.work.addWork(form)
    .then(({ data }) =>{
      // console.log('增res', data.data)
      getWorkList({ clerkId: '', currentPage: state.currentPage, pageSize: state.pageSize})
      $Tools.showMessage('值班信息录入成功', 'success')
      clearForm(ruleFormRef)
    })
    .catch(err => {
      console.log('增err',err)
      if (err.status === 400) $Tools.handleMuiltiErrMsg(err)
    })
}

// 更新值班信息
function updateWork(id) {
  $API.work.updateWork(id, form)
    .then(({ data }) =>{
      // console.log('改res', data.data)
      getWorkList({ clerkId: '', currentPage: state.currentPage, pageSize: state.pageSize})
      $Tools.showMessage('值班信息更新成功', 'success')
      clearForm(ruleFormRef)
    })
    .catch(err => {
      console.log('改err',err)
      if (err.status === 400) $Tools.handleMuiltiErrMsg(err)
    })
}

// 删除值班信息（单个）
async function deleteWork(id) {
  await $API.work.deleteWork(id)
    .then(() =>{})
    .catch(err => {
      console.log('删err',err)
    })
}

// 确认新增/修改值班信息
function commitForm() {
  ruleFormRef.value.validate(valid => {
    if (valid) {
      if (formTitile.value === '值班信息录入') {
        addWork()
      } else if (formTitile.value === '更新值班信息') {
        updateWork(tempId)
      }
    }
  })

}

// 清空表单
function clearForm(formEl) {
  centerDialogVisible.value = false
  for (let key in form) form[key] = ''
  // 重置校验提示
  if (!formEl) return
  unref(formEl).resetFields()
}

// 点击修改值班信息
const handleEdit = (index, row) => {
  console.log(index, row)
  // 查询值班信息详情
  $API.work.getWorkDetail(row.id)
    .then(({data}) =>{
      // console.log('详情res', data.data.work)
      form.clerkId = data.data.work.clerkId
      form.startTime = data.data.work.startTime
      form.endTime = data.data.work.endTime

      tempId =  row.id
    })
    .catch(err => {
      console.log('删err',err)
      $Tools.showMessage('获取值班信息详情信息失败', 'error')
    })

  formTitile.value = '更新值班信息'
  centerDialogVisible.value = true
}

// 点击删除值班信息按钮
const handleDelete = async (index, row) => {
  await deleteWork(row.id)
  // 重新查询
  await getWorkList({ clerkId: '', currentPage: state.currentPage, pageSize: state.pageSize})
  $Tools.showMessage('删除值班信息成功', 'success')
}

// 批量删除值班信息
async function handleMultiDelete() {
  for (let i = 0; i < multipleSelection.value.length; i++) {
    await deleteWork(multipleSelection.value[i].id)
  }
  await getWorkList({ clerkId: '', currentPage: state.currentPage, pageSize: state.pageSize})
  $Tools.showMessage('批量删除值班信息成功', 'success')
}

// 搜索值班信息
function searchWork() {
  state.currentPage = 1
  getWorkList({ clerkId: search.value, currentPage: state.currentPage, pageSize: state.pageSize})
}

// // 将后台返回的0/1 转变显示为是/否
function startPlaybackFormat(row, column) {
  return moment(row.startTime).format('lll')
}
function endPlaybackFormat(row, column) {
  return moment(row.endTime).format('lll')
}

onMounted(() => {
  getWorkList({ clerkId: '', currentPage: state.currentPage, pageSize: state.pageSize})
})

watch(
  () => centerDialogVisible.value,
  (val) => {
    if(!val) clearForm(ruleFormRef)
  }
)
</script>

<style>
.pagination {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 分页组件 必须设z-index 不然就在下层 点不了 */
.pagination-block {
  margin-top: 20px;
}

.pagination-block .btn-prev,
.pagination-block .el-pager,
.pagination-block .btn-next {
  z-index: 2;
}

.search-box {
  display: flex;
  align-items: center;
}

.search-box .input {
  margin-right: 5px;
  width: 90%;
}
</style>
