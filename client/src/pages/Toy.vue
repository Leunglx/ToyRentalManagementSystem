<template>
  <div class="bg">
    <!-- 顶部按钮 -->
    <div class="top-btn">
      <el-button type="primary" plain>玩具录入</el-button>
      <el-button type="primary" plain>批量删除</el-button>
    </div>

    <!-- 表格 -->
    <el-table 
      :data="filterTableData" 
      height="510" 
      style="width: 100%"
      ref="multipleTableRef"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" :selectable="selectable" width="55" />
      <el-table-column align="center" label="玩具" prop="tname" />
      <el-table-column align="center" label="价格" prop="price" />
      <el-table-column align="center" label="附件数量" prop="attachmentNum" />
      <el-table-column align="center" label="进货日期" prop="purchaseDate" />
      <el-table-column align="center" label="是否出租" prop="isRented" />
      <el-table-column align="center" label="损坏情况" prop="damageCondition" show-overflow-tooltip />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="搜索玩具" />
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
          :current-page="state.page"
          :page-size="state.limit"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, reactive } from 'vue'

const search = ref('')
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.tname.toLowerCase().includes(search.value.toLowerCase())
  )
)
const multipleTableRef = ref()
const multipleSelection = ref([])

const tableData = [
  {
    tname: '玩具名1',
    price: 12,
    attachmentNum: 3,
    purchaseDate: '2016-05-03',
    isRented: 0,
    damageCondition: '测试测试测试测试No. 189, Grove St, Los Angeles测试测试测试测试No. 189, Grove St, Los Angeles测试测试测试测试No. 189, Grove St, Los Angeles测试测试测试测试No. 189, Grove St, Los Angeles测试测试测试测试No. 189, Grove St, Los Angeles测试测试测试测试No. 189, Grove St, Los Angeles',
  },
  {
    tname: '玩具名2',
    price: 12,
    attachmentNum: 3,
    purchaseDate: '2016-05-03',
    isRented: 0,
    damageCondition: '测试',
  },
  {
    tname: '玩具名3',
    price: 12,
    attachmentNum: 3,
    purchaseDate: '2016-05-03',
    isRented: 0,
    damageCondition: '测试',
  },
  {
    tname: '玩具名4',
    price: 12,
    attachmentNum: 3,
    purchaseDate: '2016-05-03',
    isRented: 0,
    damageCondition: '测试',
  },
  {
    tname: '玩具名5',
    price: 12,
    attachmentNum: 3,
    purchaseDate: '2016-05-03',
    isRented: 0,
    damageCondition: '测试',
  },
  {
    tname: '玩具名6',
    price: 12,
    attachmentNum: 3,
    purchaseDate: '2016-05-03',
    isRented: 0,
    damageCondition: '测试',
  },
  {
    tname: '玩具名7',
    price: 12,
    attachmentNum: 3,
    purchaseDate: '2016-05-03',
    isRented: 0,
    damageCondition: '测试',
  },
  {
    tname: '玩具名8',
    price: 12,
    attachmentNum: 3,
    purchaseDate: '2016-05-03',
    isRented: 0,
    damageCondition: '测试',
  },
  {
    tname: '玩具名9',
    price: 12,
    attachmentNum: 3,
    purchaseDate: '2016-05-03',
    isRented: 0,
    damageCondition: '测试',
  },
  {
    tname: '玩具名10',
    price: 12,
    attachmentNum: 3,
    purchaseDate: '2016-05-03',
    isRented: 0,
    damageCondition: '测试',
  },
  {
    tname: '玩具名11',
    price: 12,
    attachmentNum: 3,
    purchaseDate: '2016-05-03',
    isRented: 0,
    damageCondition: '测试',
  },
  {
    tname: '玩具名12',
    price: 12,
    attachmentNum: 3,
    purchaseDate: '2016-05-03',
    isRented: 0,
    damageCondition: '测试',
  },
]

// 分页用到的数据
const state = reactive({
  page: 2,
  limit: 10,
  total: 12
})

const handleEdit = (index, row) => {
  console.log(index, row)
}
const handleDelete = (index, row) => {
  console.log(index, row)
}
const toggleSelection = (rows, ignoreSelectable) => {
  if (rows) {
    rows.forEach((row) => {
      multipleTableRef.value.toggleRowSelection(
        row,
        undefined,
        ignoreSelectable
      )
    })
  } else {
    multipleTableRef.value.clearSelection()
  }
}
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

// 改变页码
const handleCurrentChange = (val) => {
  state.page = val
  // searchApplication({ current: val, size: state.limit, input: router.currentRoute.value.query.input, type: router.currentRoute.value.query.type })
}
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
</style>
