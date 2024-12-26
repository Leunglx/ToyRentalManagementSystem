<template>
  <div class="bg">
    <!-- 顶部按钮 -->
    <div class="top-btn">
      <el-button type="primary" plain @click="centerDialogVisible = true; formTitile = '会员录入'">会员录入</el-button>
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

    <!-- 会员录入表单 -->
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
        <el-form-item label="会员名" prop="mname">
          <el-input v-model="form.mname" maxlength="20" show-word-limit />
        </el-form-item>
        <el-form-item label="联系方式" prop="tel">
          <el-input v-model="form.tel" />
        </el-form-item>
        <el-form-item label="注册时间" prop="registerTime">
          <el-date-picker
            v-model="form.registerTime"
            type="date"
            aria-label="选择日期"
            placeholder="选择日期"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="押金" prop="deposit">
          <el-input v-model="form.deposit" />
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
      <el-table-column align="center" label="会员名" prop="mname" />
      <el-table-column align="center" label="联系方式" prop="tel" />
      <el-table-column align="center" label="注册时间" prop="registerTime" />
      <el-table-column align="center" label="押金" prop="deposit" />
      <el-table-column align="right">
        <template #header>
          <div class="search-box">
            <el-input v-model="search" size="small" placeholder="搜索会员" class="input" @keyup.enter="searchMember()" />
            <el-button type="primary" size="small" class="search-btn" @click="searchMember()">搜索</el-button>
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
const formTitile = ref('会员录入')
// 暂时存放会员id 用于更新
let tempId = 0

// 获取表单元素
const ruleFormRef = ref()
// 表单数据
const form = reactive({
  mname: '',
  tel: '',
  registerTime: '',
  deposit: ''
})
// 押金校验规则
const validateDeposit = (rule, value, callback) => {
  const reg = /^(?:0|[1-9]\d*)$/
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error('必须为一个正整数或0！'))
  }
}
// 表单校验规则
const rules = reactive({
  mname: { required: true, message: '请输入会员名', trigger: 'blur' },
  tel: [
    { required: true, message: '请输入联系方式', trigger: 'blur' }
  ],
  registerTime: { type: 'date', required: true, message: '请选择会员注册时间', trigger: 'blur' },
  deposit: [
    { required: true, message: '请输入押金', trigger: 'blur' },
    { validator: validateDeposit, trigger: 'change' }
  ],
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
  getMemberList({ mname: '', currentPage: state.currentPage, pageSize: state.pageSize})
}

// 查询会员列表
async function getMemberList(params) {
  await $API.member.getMemberList(params)
    .then(({ data }) =>{
      // console.log('查询res', data.data)
      tableData.value = data.data.members
      state.currentPage = data.data.pagenition.currentPage
      state.pageSize = data.data.pagenition.pageSize
      state.total = data.data.pagenition.total
    })
    .catch(err => {
      console.log('查询err',err)
      // $Tools.handleMuiltiErrMsg(err)
    })
}

// 会员录入
function addMember() {
  $API.member.addMember(form)
    .then(({ data }) =>{
      // console.log('增res', data.data)
      getMemberList({ mname: '', currentPage: state.currentPage, pageSize: state.pageSize})
      $Tools.showMessage('会员录入成功', 'success')
      clearForm(ruleFormRef)
    })
    .catch(err => {
      console.log('增err',err)
      if (err.status === 400) $Tools.handleMuiltiErrMsg(err)
    })
}

// 更新会员
function updateMember(id) {
  $API.member.updateMember(id, form)
    .then(({ data }) =>{
      // console.log('改res', data.data)
      getMemberList({ mname: '', currentPage: state.currentPage, pageSize: state.pageSize})
      $Tools.showMessage('会员更新成功', 'success')
      clearForm(ruleFormRef)
    })
    .catch(err => {
      console.log('改err',err)
      if (err.status === 400) $Tools.handleMuiltiErrMsg(err)
    })
}

// 删除会员（单个）
async function deleteMember(id) {
  await $API.member.deleteMember(id)
    .then(() =>{})
    .catch(err => {
      console.log('删err',err)
    })
}

// 确认新增/修改会员
function commitForm() {
  ruleFormRef.value.validate(valid => {
    if (valid) {
      if (formTitile.value === '会员录入') {
        addMember()
      } else if (formTitile.value === '更新会员信息') {
        updateMember(tempId)
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

// 点击修改会员
const handleEdit = (index, row) => {
  console.log(index, row)
  // 查询会员详情
  $API.member.getMemberDetail(row.id)
    .then(({data}) =>{
      // console.log('详情res', data.data.member)
      form.mname = data.data.member.mname
      form.tel = data.data.member.tel
      form.registerTime = data.data.member.registerTime
      form.deposit = data.data.member.deposit

      tempId =  row.id
    })
    .catch(err => {
      console.log('删err',err)
      $Tools.showMessage('获取会员详情信息失败', 'error')
    })

  formTitile.value = '更新会员信息'
  centerDialogVisible.value = true
}

// 点击删除会员按钮
const handleDelete = async (index, row) => {
  await deleteMember(row.id)
  // 重新查询
  await getMemberList({ mname: '', currentPage: state.currentPage, pageSize: state.pageSize})
  $Tools.showMessage('删除会员成功', 'success')
}

// 批量删除会员
async function handleMultiDelete() {
  for (let i = 0; i < multipleSelection.value.length; i++) {
    await deleteMember(multipleSelection.value[i].id)
  }
  await getMemberList({ mname: '', currentPage: state.currentPage, pageSize: state.pageSize})
  $Tools.showMessage('批量删除会员成功', 'success')
}

// 搜索会员
function searchMember() {
  state.currentPage = 1
  getMemberList({ mname: search.value, currentPage: state.currentPage, pageSize: state.pageSize})
}

onMounted(() => {
  getMemberList({ mname: '', currentPage: state.currentPage, pageSize: state.pageSize})
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
