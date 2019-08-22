<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <!-- 表格组件 -->
    <template>
      <el-table style="width: 100%">
        <el-table-column label="标题" width="400"></el-table-column>
        <el-table-column label="评论状态" width="145"></el-table-column>
        <el-table-column label="评论总数" width="145"></el-table-column>
        <el-table-column label="粉丝评论数" width="145"></el-table-column>
        <el-table-column label="操作" width="145"></el-table-column>
      </el-table>
    </template>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      commentInfo: []
    }
  }
}
</script>

<style>
</style>
