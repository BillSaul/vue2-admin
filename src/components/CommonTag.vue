<template>
  <div class="tabs">
    <el-tag
      v-for="(item, index) in tags"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handleClose(item, index)"
      size="small"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
  methods: {
    ...mapMutations({
      closeTab: "CLOSE_TAB",
    }),
    // 点击 tag 跳转功能
    changeMenu(item) {
      this.$router.push({ name: item.name });
    },
    // 点击 tag 删除功能
    handleClose(item, index) {
      this.closeTab(item);
      const length = this.tags.length;
      console.log(length, index);
      console.log(this.tags);
      // 路由跳转
      if (item.name !== this.$route.name) {
        return;
      }
      if (index === length) {
        this.$router.push({ name: this.tags[index - 1].name });
      } else {
        this.$router.push({ name: this.tags[index].name });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-left: 15px;
    cursor: pointer;
  }
}
</style>
