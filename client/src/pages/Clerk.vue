<template>
  <div class="bg">
    <!-- 顶部按钮 -->
    <div class="top-btn">
      <el-button type="primary" plain @click="centerDialogVisible = true; formTitile = '营业员录入'">营业员录入</el-button>
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

    <!-- 营业员录入表单 -->
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
        <el-form-item label="营业员名" prop="cname">
          <el-input v-model="form.cname" maxlength="20" show-word-limit />
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
      <el-table-column align="center" label="营业员" prop="cname" />
      <el-table-column align="right">
        <template #header>
          <div class="search-box">
            <el-input v-model="search" size="small" placeholder="搜索营业员" class="input" @keyup.enter="searchClerk()" />
            <el-button type="primary" size="small" class="search-btn" @click="searchClerk()">搜索</el-button>
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

const $API = inject('$API')
const $Tools = inject('$Tools')

const search = ref('')
const tableData = ref([])

const centerDialogVisible = ref(false)
const multipleTableRef = ref()
const multipleSelection = ref([])
const formTitile = ref('营业员录入')
// 暂时存放营业员id 用于更新
let tempId = 0

// 获取表单元素
const ruleFormRef = ref()
// 表单数据
const form = reactive({
  cname: ''
})
// 表单校验规则
const rules = reactive({
  cname: { required: true, message: '请输入营业员名', trigger: 'blur' },
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
  getClerkList({ cname: '', currentPage: state.currentPage, pageSize: state.pageSize})
}

// 查询营业员列表
async function getClerkList(params) {
  await $API.clerk.getClerkList(params)
    .then(({ data }) =>{
      // console.log('查询res', data.data)
      tableData.value = data.data.clerks
      state.currentPage = data.data.pagenition.currentPage
      state.pageSize = data.data.pagenition.pageSize
      state.total = data.data.pagenition.total
    })
    .catch(err => {
      console.log('查询err',err)
      // $Tools.handleMuiltiErrMsg(err)
    })
}

// 营业员录入
function addClerk() {
  $API.clerk.addClerk(form)
    .then(({ data }) =>{
      // console.log('增res', data.data)
      getClerkList({ cname: '', currentPage: state.currentPage, pageSize: state.pageSize})
      $Tools.showMessage('营业员录入成功', 'success')
      clearForm(ruleFormRef)
    })
    .catch(err => {
      console.log('增err',err)
      if (err.status === 400) $Tools.handleMuiltiErrMsg(err)
    })
}

// 更新营业员
function updateClerk(id) {
  $API.clerk.updateClerk(id, form)
    .then(({ data }) =>{
      // console.log('改res', data.data)
      getClerkList({ cname: '', currentPage: state.currentPage, pageSize: state.pageSize})
      $Tools.showMessage('营业员更新成功', 'success')
      clearForm(ruleFormRef)
    })
    .catch(err => {
      console.log('改err',err)
      if (err.status === 400) $Tools.handleMuiltiErrMsg(err)
    })
}

// 删除营业员（单个）
async function deleteClerk(id) {
  await $API.clerk.deleteClerk(id)
    .then(() =>{})
    .catch(err => {
      console.log('删err',err)
    })
}

// 确认新增/修改营业员
function commitForm() {
  ruleFormRef.value.validate(valid => {
    if (valid) {
      if (formTitile.value === '营业员录入') {
        addClerk()
      } else if (formTitile.value === '更新营业员信息') {
        updateClerk(tempId)
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

// 点击修改营业员
const handleEdit = (index, row) => {
  console.log(index, row)
  // 查询营业员详情
  $API.clerk.getClerkDetail(row.id)
    .then(({data}) =>{
      // console.log('详情res', data.data.clerk)
      form.cname = data.data.clerk.cname

      tempId =  row.id
    })
    .catch(err => {
      console.log('删err',err)
      $Tools.showMessage('获取营业员详情信息失败', 'error')
    })

  formTitile.value = '更新营业员信息'
  centerDialogVisible.value = true
}

// 点击删除营业员按钮
const handleDelete = async (index, row) => {
  await deleteClerk(row.id)
  // 重新查询
  await getClerkList({ cname: '', currentPage: state.currentPage, pageSize: state.pageSize})
  $Tools.showMessage('删除营业员成功', 'success')
}

// 批量删除营业员
async function handleMultiDelete() {
  for (let i = 0; i < multipleSelection.value.length; i++) {
    await deleteClerk(multipleSelection.value[i].id)
  }
  await getClerkList({ cname: '', currentPage: state.currentPage, pageSize: state.pageSize})
  $Tools.showMessage('批量删除营业员成功', 'success')
}

// 搜索营业员
function searchClerk() {
  state.currentPage = 1
  getClerkList({ cname: search.value, currentPage: state.currentPage, pageSize: state.pageSize})
}

onMounted(() => {
  getClerkList({ cname: '', currentPage: state.currentPage, pageSize: state.pageSize})
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
