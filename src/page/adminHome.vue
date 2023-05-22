<template>
  <div class="fillcontain">
    <head-top></head-top>
    <h1 style="text-align: center;
    margin-top: 50px;">欢迎来到&nbsp;管理端</h1>
<!--      <vue-core-video-player src="http://localhost:8081/upload/test.mp4"></vue-core-video-player>-->

  </div>
</template>

<script>
import headTop from "../components/headTop";
import { } from "@/api/getData";
import { getStore } from "@/config/mUtils";

export default {
  data() {
    return {
      homeNum: {},
      currentRow: null,
      count: 0,
      pageSize: 10,
      currentPage: 1,
      uid: ""
    };
  },
  components: {
    headTop,

  },
  created() {},
  mounted() {
    this.uid = getStore("uid");
    this.getTableData();
  },
  methods: {
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableData();
    },
    async getTableData() {

    },
  },
};
</script>

<style lang="less">
</style>
