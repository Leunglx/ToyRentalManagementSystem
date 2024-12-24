<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header-box">
        <div class="header-content">
          <div class="header-left">
            <div class="menu-items">
              <router-link to="/Toy" class="items" active-class="active">玩具</router-link>
              <router-link to="/Member" class="items" active-class="active">会员</router-link>
              <router-link to="/Clerk" class="items" active-class="active">营业员</router-link>
              <router-link to="/RentalList" class="items" active-class="active">玩具出租</router-link>
              <router-link to="/Work" class="items" active-class="active">值班安排</router-link>
            </div>
          </div>
        </div>
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>

</script>

<style>
.header-box {
  position: fixed;
  top: 0;
  left: 0;
  margin-bottom: 20px;
  padding: 0 40px;

  width: 100vw;
  height: 50px;
  line-height: 50px;

  background-color: #fff;
  box-shadow: #dedede 0px 0px 20px 5px;
  z-index: 10;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 100%;
}

.header-left,
.hearder-right {
  display: flex;
  align-items: center;
}

.header-content .menu-items {
  display: flex;
  align-items: center;
  justify-content: start;
}

.header-content .items {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
  padding: 0 10px;

  height: 35px;
  width: 85px;
  line-height: 35px;

  font-size: 16px;
  font-weight: 600;
  color: #788387;

  border-bottom: 3px solid transparent;
  border-radius: 2px;
  transition: all 0.2s;
}

.header-content .items:hover {
  color: rgb(160, 207, 255);

  border-color: rgb(160, 207, 255);
  transition: all 0.2s;
}

.header-content .active {
  border-color: rgba(160, 207, 255, 0.8);
  color: rgb(160, 207, 255);
}

.header-content .flex-btn {
  display: flex;
  align-items: center;

  cursor: pointer;
}
</style>
