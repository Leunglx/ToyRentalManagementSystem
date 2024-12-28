<template>
  <div class="bg">
    <!-- 顶部按钮 -->
    <div class="top-btn">
      <el-button type="primary" plain @click="centerDialogVisible = true; formTitile = '玩具出租信息录入'; isEditing = false">玩具出租信息录入</el-button>
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

    <!-- 玩具出租信息录入表单 -->
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
        <el-form-item label="玩具id" prop="toyId">
          <el-input v-model="form.toyId" :disabled="isEditing" />
        </el-form-item>
        <el-form-item label="会员id" prop="memberId">
          <el-input v-model="form.memberId" :disabled="isEditing" />
        </el-form-item>
        <el-form-item label="营业员id" prop="clerkId">
          <el-input v-model="form.clerkId" :disabled="isEditing" />
        </el-form-item>
        <el-form-item label="出租日期" prop="rentDate">
          <el-date-picker
            v-model="form.rentDate"
            type="date"
            aria-label="选择日期"
            placeholder="选择日期"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="归还日期" prop="returnDate">
          <el-date-picker
            v-model="form.returnDate"
            type="date"
            aria-label="选择日期"
            placeholder="选择日期"
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
      <el-table-column align="center" label="玩具id" prop="toyId" />
      <el-table-column align="center" label="会员id" prop="memberId" />
      <el-table-column align="center" label="营业员id" prop="clerkId" />
      <el-table-column align="center" label="出租日期" prop="rentDate" />
      <el-table-column align="center" label="归还日期" prop="returnDate"  :formatter="playbackFormat" />
      <el-table-column align="right">
        <template #header>
          <div class="search-box">
            <el-input v-model="search" size="small" placeholder="根据玩具id搜索..." class="input" @keyup.enter="searchRentalList()" />
            <el-button type="primary" size="small" class="search-btn" @click="searchRentalList()">搜索</el-button>
          </div>
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            玩具归还
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
const formTitile = ref('玩具出租信息录入')
// 表单是否正在修改
const isEditing = ref()

// 暂时存放玩具出租信息id 用于更新
let tempId = 0

// 获取表单元素
const ruleFormRef = ref()
// 表单数据
const form = reactive({
  toyId: '',
  memberId: '',
  clerkId: '',
  rentDate: '',
  returnDate: null
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
// 时间校验规则
const validateRentDate = (rule, value, callback) => {
  if (new Date(form.rentDate).getTime() > Date.now()) {
    callback(new Error('出租日期不能超过当前日期！'))
  } else callback()
}
const validateReturnDate = (rule, value, callback) => {
  if (form.returnDate && new Date(form.returnDate).getTime() > Date.now()) {
    callback(new Error('归还日期不能超过当前日期！'))
  } else if (form.returnDate && new Date(form.rentDate).getTime() > new Date(form.returnDate).getTime()) {
    callback(new Error('归还日期不能早于出租日期！'))
  } else callback()
}
// 表单校验规则
const rules = reactive({
  toyId: [
    { required: true, message: '请输入玩具id', trigger: 'blur' },
    { validator: validateId, trigger: 'change' }
  ],
  memberId: [
    { required: true, message: '请输入会员id', trigger: 'blur' },
    { validator: validateId, trigger: 'change' }
  ],
  clerkId: [
    { required: true, message: '请输入营业员id', trigger: 'blur' },
    { validator: validateId, trigger: 'change' }
  ],
  rentDate: [
    { type: 'date', required: true, message: '请选择出租日期', trigger: 'blur' },
    { validator: validateRentDate, trigger: 'change' }
  ],
  returnDate: [
    { validator: validateReturnDate, trigger: 'change' }
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
  getRentalListList({ toyId: '', memberId:'', clerkId: '', currentPage: state.currentPage, pageSize: state.pageSize})
}

// 查询玩具出租信息列表
async function getRentalListList(params) {
  await $API.rentalList.getRentalListList(params)
    .then(({ data }) =>{
      console.log('查询res', data.data)
      tableData.value = data.data.rentalLists
      state.currentPage = data.data.pagenition.currentPage
      state.pageSize = data.data.pagenition.pageSize
      state.total = data.data.pagenition.total
    })
    .catch(err => {
      console.log('查询err',err)
      // $Tools.handleMuiltiErrMsg(err)
    })
}

// 玩具出租信息录入
function addRentalList() {
  $API.rentalList.addRentalList(form)
    .then(({ data }) =>{
      // console.log('增res', data.data)
      getRentalListList({ toyId: '', memberId:'', clerkId: '', currentPage: state.currentPage, pageSize: state.pageSize})
      $Tools.showMessage('玩具出租信息录入成功', 'success')
      clearForm(ruleFormRef)
    })
    .catch(err => {
      console.log('增err',err)
      if (err.status !== 200 || err.status !== 201) $Tools.handleMuiltiErrMsg(err)
    })
}

// 更新玩具出租信息
function updateRentalList(id) {
  $API.rentalList.updateRentalList(id, form)
    .then(({ data }) =>{
      // console.log('改res', data.data)
      getRentalListList({ toyId: '', memberId:'', clerkId: '', currentPage: state.currentPage, pageSize: state.pageSize})
      $Tools.showMessage('玩具出租信息更新成功', 'success')
      clearForm(ruleFormRef)
    })
    .catch(err => {
      console.log('改err',err)
      if (err.status === 400) $Tools.handleMuiltiErrMsg(err)
    })
}

// 删除玩具出租信息（单个）
async function deleteRentalList(id) {
  await $API.rentalList.deleteRentalList(id)
    .then(() =>{})
    .catch(err => {
      console.log('删err',err)
    })
}

// 确认新增/修改玩具出租信息
function commitForm() {
  ruleFormRef.value.validate(valid => {
    if (valid) {
      if (formTitile.value === '玩具出租信息录入') {
        addRentalList()
      } else if (formTitile.value === '更新玩具出租信息') {
        updateRentalList(tempId)
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

// 点击修改玩具出租信息
const handleEdit = (index, row) => {
  console.log(index, row)
  // 查询玩具出租信息详情
  $API.rentalList.getRentalListDetail(row.id)
    .then(({data}) =>{
      // console.log('详情res', data.data.rentalList)
      form.toyId = data.data.rentalList.toyId
      form.memberId = data.data.rentalList.memberId
      form.clerkId = data.data.rentalList.clerkId
      form.rentDate = data.data.rentalList.rentDate
      form.returnDate = data.data.rentalList.returnDate

      tempId =  row.id
    })
    .catch(err => {
      console.log('删err',err)
      $Tools.showMessage('获取玩具出租信息详情信息失败', 'error')
    })

  formTitile.value = '更新玩具出租信息'
  // 禁用id输入框
  isEditing.value = true
  centerDialogVisible.value = true
}

// 点击删除玩具出租信息按钮
const handleDelete = async (index, row) => {
  if (row.returnDate === 'Invalid date') {
    $Tools.showMessage('玩具仍在出租，不能删除', 'warning')
    return
  }
  await deleteRentalList(row.id)
  // 重新查询
  await getRentalListList({ toyId: '', memberId:'', clerkId: '', currentPage: state.currentPage, pageSize: state.pageSize})
  $Tools.showMessage('删除玩具出租信息成功', 'success')
}

// 批量删除玩具出租信息
async function handleMultiDelete() {
  for (let i = 0; i < multipleSelection.value.length; i++) {
    await deleteRentalList(multipleSelection.value[i].id)
  }
  await getRentalListList({ toyId: '', memberId:'', clerkId: '', currentPage: state.currentPage, pageSize: state.pageSize})
  $Tools.showMessage('批量删除玩具出租信息成功', 'success')
}

// 搜索玩具出租信息（只做根据玩具id搜索）
function searchRentalList() {
  state.currentPage = 1
  getRentalListList({ toyId: search.value, currentPage: state.currentPage, pageSize: state.pageSize})
}

// 归还日期显示格式化
function playbackFormat(row, column) {
  if (row.returnDate === 'Invalid date') {
      return '暂无'
  } else return row.returnDate
}

onMounted(() => {
  getRentalListList({ toyId: '', memberId:'', clerkId: '', currentPage: state.currentPage, pageSize: state.pageSize})
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
