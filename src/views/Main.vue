<template>
  <div>
    <el-container style="height: 100vh">
      <el-aside width="auto">
        <common-aside />
      </el-aside>
      <el-container>
        <el-header>
          <common-header />
        </el-header>
        <common-tab />
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "../components/CommonAside.vue";
import CommonHeader from "../components/CommonHeader.vue";
import CommonTab from "../components/CommonTag.vue";

export default {
  components: {
    CommonAside,
    CommonHeader,
    CommonTab,
  },
};
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
}
</style>
