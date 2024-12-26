<template>
  <!-- <HelloWorld msg="Hello Vue 3.0 + Vite" /> -->
   <Main />
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Main from './components/main.vue'
import { inject, onMounted } from 'vue'

const $API = inject('$API')
const $Tools = inject('$Tools')

onMounted(async() => {
  // console.log('--',await $API.toy.getToyList('',1,10))
  // console.log('-',await $API.toy.getToyDetail(1))
  function add() {
    $API.toy.addToy({
      tname: '测试1111',
      price: 2,
      attachmentNum: 0,
      purchaseDate: '2024.11.24',
      isRented: 0,
      damageCondition: ''
    })
    console.log('新增')
  }

  function updateToy() {
    $API.toy.updateToy(53, {
      tname: '1234',
      price: 333,
      attachmentNum: 2,
      purchaseDate: '2024.11.24',
      isRented: 0,
      damageCondition: ''
    })
    console.log('修改')
  }

  function deleteToy() {
    $API.toy.deleteToy(53)
    .then((res) =>{
      console.log('删除res', res)
    })
    .catch(err => {
      $Tools.handleErrMsg(err)
    })
  }

  // add()
  // updateToy()
  // deleteToy()

})

</script>
