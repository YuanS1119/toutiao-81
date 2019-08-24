<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <!-- 表格组件 -->
    <template>
      <el-table style="width: 100%" :data="commentInfo" stripe>
        <el-table-column prop="title" label="标题" width="400"></el-table-column>
        <el-table-column :formatter="formatter" prop="comment_status" label="评论状态"></el-table-column>
        <el-table-column prop="total_comment_count" label="评论总数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="obj">
            <el-button type="text">修改</el-button>
            <el-button
              @click="closeOrOpen(obj.row)"
              :style="{color: obj.row.comment_status ? '#E6A23C' : '#409EFF'}"
              type="text"
            >{{ obj.row.comment_status ? "关闭评论" : "打开评论" }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-row type="flex" justify="space-around">
      <el-pagination
        background
        :total="page.totalPage"
        :page-size="page.pageSize"
        :current-page="page.currentPage"
        @current-change="changePage"
        layout="prev, pager, next"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      commentInfo: [],
      page: {
        pageSize: 10,
        totalPage: 0,
        currentPage: 1
      }
    }
  },
  methods: {
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getComments()// 每次改变需要重新查询一次
    },
    // 查询评论数据
    getComments () {
      let page = this.page.currentPage// 页数
      // let per_page = this.page.pageSize// 每页数量
      let transformPage = { page, per_page: this.page.pageSize }
      console.log(transformPage)
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment',
          ...transformPage
        }
      }).then(res => {
        console.log(res)
        this.commentInfo = res.data.results // 将取到的数据给当前数据对象
        this.page.totalPage = res.data.total_count
      })
    },
    // table中写好的过滤属性
    formatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    closeOrOpen (row) {
      // console.log(row.id.toString())
      let status = row.comment_status ? '关闭' : '打开'
      this.$confirm(`确认${status}评论吗？`, '提示').then(() => {
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }
        }).then(() => {
          this.getComments()
        })
      })
    }
  },
  created () {
    this.getComments()
  }
}
</script>

<style>
</style>
