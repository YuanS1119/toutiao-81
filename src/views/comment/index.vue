<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <!-- 表格组件 -->
    <template>
      <el-table style="width: 100%" :data="commentInfo" stripe>
        <el-table-column prop='title' label="标题" width="400"></el-table-column>
        <el-table-column :formatter='formatter' prop='comment_status' label="评论状态" width="145"></el-table-column>
        <el-table-column prop='total_comment_count' label="评论总数" width="145"></el-table-column>
        <el-table-column prop='fans_comment_count' label="粉丝评论数" width="145"></el-table-column>
        <el-table-column label="操作" width="145" >
          <el-button type="text">修改</el-button>
          <el-button type="text">关闭评论</el-button>
        </el-table-column>
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
  },
  methods: {
    // 查询评论数据
    getComments () {
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(res => {
        console.log(res)
        this.commentInfo = res.data.results// 将取到的数据给当前数据对象
      })
    },
    formatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    }

  },
  created () {
    this.getComments()
  }
}
</script>

<style>
</style>
