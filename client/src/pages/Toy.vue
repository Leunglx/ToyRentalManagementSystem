<template>
  <div class="bg">
    <!-- 顶部按钮 -->
    <div class="top-btn">
      <el-button type="primary" plain @click="centerDialogVisible = true; formTitile = '玩具录入'; isEditing = false">玩具录入</el-button>
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

    <!-- 玩具录入表单 -->
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
        <el-form-item label="玩具名" prop="tname">
          <el-input v-model="form.tname" maxlength="20" show-word-limit />
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="form.price" />
        </el-form-item>
        <el-form-item label="附件数量" prop="attachmentNum">
          <el-input v-model="form.attachmentNum" />
        </el-form-item>
        <el-form-item label="进货时间" prop="purchaseDate">
          <el-date-picker
            v-model="form.purchaseDate"
            type="date"
            aria-label="选择日期"
            placeholder="选择日期"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="是否已出租" prop="isRented">
          <el-radio-group v-model="form.isRented">
            <el-radio :value="0" :disabled="isEditing">否</el-radio>
            <el-radio :value="1" :disabled="isEditing">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="损坏情况" prop="damageCondition">
          <el-input v-model="form.damageCondition" type="textarea" maxlength="100" :rows="4" show-word-limit resize="none" />
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
      <el-table-column align="center" label="玩具" prop="tname" />
      <el-table-column align="center" label="价格" prop="price" />
      <el-table-column align="center" label="附件数量" prop="attachmentNum" />
      <el-table-column align="center" label="进货时间" prop="purchaseDate" />
      <el-table-column align="center" label="是否出租" prop="isRented" :formatter="playbackFormat" />
      <el-table-column align="center" label="损坏情况" prop="damageCondition" show-overflow-tooltip />
      <el-table-column align="right">
        <template #header>
          <div class="search-box">
            <el-input v-model="search" size="small" placeholder="搜索玩具" class="input" @keyup.enter="searchToy()" />
            <el-button type="primary" size="small" class="search-btn" @click="searchToy()">搜索</el-button>
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
const formTitile = ref('玩具录入')
// 是否正在修改表单
const isEditing = ref(false)

// 暂时存放玩具id 用于更新
let tempId = 0

// 获取表单元素
const ruleFormRef = ref()
// 表单数据
const form = reactive({
  tname: '',
  price: '',
  attachmentNum: '',
  purchaseDate: '',
  isRented: '',
  damageCondition: ''
})
// 价格、附件数量校验规则
const validateattachmentNum = (rule, value, callback) => {
  const reg = /^(?:0|[1-9]\d*)$/
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error('必须为一个正整数或0！'))
  }
}
const validatePrice = (rule, value, callback) => {
  const reg = /^[1-9]\d*$/
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error('必须为一个正整数！'))
  }
}
// 时间校验规则
const validateTime = (rule, value, callback) => {
  if (new Date(form.purchaseDate).getTime() > Date.now()) {
    callback(new Error('进货时间不能超过当前日期！'))
  } else callback()
}
// 表单校验规则
const rules = reactive({
  tname: { required: true, message: '请输入玩具名', trigger: 'blur' },
  price: [
    { required: true, message: '请输入价格', trigger: 'blur' },
    { validator: validatePrice, trigger: 'change' }
  ],
  attachmentNum: [
    { required: true, message: '请输入附件数量', trigger: 'blur' },
    { validator: validateattachmentNum, trigger: 'blur' }
  ],
  purchaseDate: [
    { type: 'date', required: true, message: '请选择进货时间', trigger: 'blur' },
    { validator: validateTime, trigger: 'change' }
  ],
  isRented: { required: true, message: '请选择租借情况', trigger: 'change' }
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
  getToyList({ tname: '', currentPage: state.currentPage, pageSize: state.pageSize})
}

// 查询玩具列表
async function getToyList(params) {
  await $API.toy.getToyList(params)
    .then(({ data }) =>{
      // console.log('查询res', data.data)
      tableData.value = data.data.toys
      state.currentPage = data.data.pagenition.currentPage
      state.pageSize = data.data.pagenition.pageSize
      state.total = data.data.pagenition.total
    })
    .catch(err => {
      console.log('查询err',err)
      // $Tools.handleMuiltiErrMsg(err)
    })
}

// 玩具录入
function addToy() {
  $API.toy.addToy(form)
    .then(({ data }) =>{
      // console.log('增res', data.data)
      getToyList({ tname: '', currentPage: state.currentPage, pageSize: state.pageSize})
      $Tools.showMessage('玩具录入成功', 'success')
      clearForm(ruleFormRef)
    })
    .catch(err => {
      console.log('增err',err)
      if (err.status === 400) $Tools.handleMuiltiErrMsg(err)
    })
}

// 更新玩具
function updateToy(id) {
  $API.toy.updateToy(id, form)
    .then(({ data }) =>{
      // console.log('改res', data.data)
      getToyList({ tname: '', currentPage: state.currentPage, pageSize: state.pageSize})
      $Tools.showMessage('玩具更新成功', 'success')
      clearForm(ruleFormRef)
    })
    .catch(err => {
      console.log('改err',err)
      if (err.status === 400) $Tools.handleMuiltiErrMsg(err)
    })
}

// 删除玩具（单个）
async function deleteToy(id) {
  await $API.toy.deleteToy(id)
    .then(() =>{})
    .catch(err => {
      console.log('删err',err)
    })
}

// 确认新增/修改玩具
function commitForm() {
  ruleFormRef.value.validate(valid => {
    if (valid) {
      if (formTitile.value === '玩具录入') {
        addToy()
      } else if (formTitile.value === '更新玩具信息') {
        updateToy(tempId)
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

// 点击修改玩具
const handleEdit = (index, row) => {
  console.log(index, row)
  // 查询玩具详情
  $API.toy.getToyDetail(row.id)
    .then(({data}) =>{
      // console.log('详情res', data.data.toy)
      form.tname = data.data.toy.tname
      form.price = data.data.toy.price
      form.attachmentNum = data.data.toy.attachmentNum
      form.purchaseDate = data.data.toy.purchaseDate
      form.isRented = data.data.toy.isRented
      form.damageCondition = data.data.toy.damageCondition

      tempId =  row.id
    })
    .catch(err => {
      console.log('删err',err)
      $Tools.showMessage('获取玩具详情信息失败', 'error')
    })

  formTitile.value = '更新玩具信息'
  // 禁用是否出租单选框
  isEditing.value = true
  centerDialogVisible.value = true
}

// 点击删除玩具按钮
const handleDelete = async (index, row) => {
  await deleteToy(row.id)
  // 重新查询
  await getToyList({ tname: '', currentPage: state.currentPage, pageSize: state.pageSize})
  $Tools.showMessage('删除玩具成功', 'success')
}

// 批量删除玩具
async function handleMultiDelete() {
  for (let i = 0; i < multipleSelection.value.length; i++) {
    await deleteToy(multipleSelection.value[i].id)
  }
  await getToyList({ tname: '', currentPage: state.currentPage, pageSize: state.pageSize})
  $Tools.showMessage('批量删除玩具成功', 'success')
}

// 搜索玩具
function searchToy() {
  state.currentPage = 1
  getToyList({ tname: search.value, currentPage: state.currentPage, pageSize: state.pageSize})
}

// 将后台返回的0/1 转变显示为是/否
function playbackFormat(row, column) {
  if (row.isRented === 0) {
      return '否'
    } else  {
      return '是'
    } 
}

onMounted(() => {
  getToyList({ tname: '', currentPage: state.currentPage, pageSize: state.pageSize})
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
