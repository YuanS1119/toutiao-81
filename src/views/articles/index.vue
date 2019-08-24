<template>
  <el-card class="out">
      <bread-crumb slot="header">
        <span slot="title">内容列表</span>
      </bread-crumb>
      <el-form>
        <el-form-item label="文章状态：">
          <el-radio-group v-model="searchParams.status" @change="refreshList">
            <el-radio :label="5">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表：">
          <el-select v-model="searchParams.channels_id" placeholder="请选择">
            <el-option
              v-for="item in channels"
              :key="item.id"
              :label="item.label"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择：">
          <el-date-picker
            v-model="searchParams.dataRange"
            @change="refreshList"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    <div class="conatiner">
      <div class="title">共找到{{page.total}}条符合条件的内容</div>
      <div class="list"  v-for="(item,id) in content" :key="id">
        <div class="left">
          <img src="../../assets/img/404.png" alt />
          <div class="content">
            <span>{{item.title}}</span>
            <el-tag :type="item.status | setStatusStyle" style="width:60px;">{{item.status | setStatus}}</el-tag>
            <span>{{item.pubdate}}</span>
          </div>
        </div>
        <div class="right">
          <span>
            <i class="el-icon-edit"></i>
            修改
          </span>
          <span>
            <i class="el-icon-delete"></i>
            删除
          </span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      content: {}, // 内容列表
      page: {
        total: 0
      }, // 页数
      searchParams: {
        status: 5,
        channels_id: null,
        dataRange: null
      }
    }
  },
  methods: {
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params: { ...params }
      }).then(res => {
        this.content = res.data.results
        this.page.total = res.data.total_count
      })
    },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    refreshList () {
      let { status, channels_id: cid, dataRange } = this.searchParams
      let params = {
        status: status === 5 ? null : status,
        channels_id: cid,
        begin_pubdate: dataRange && dataRange.length ? dataRange[0] : null,
        end_pubdate: dataRange && dataRange.length > 1 ? dataRange[1] : null
      }
      this.getArticles(params)
    }
  },
  filters: {
    setStatus (status) {
      switch (status) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    setStatusStyle (status) {
      switch (status) {
        case 0:
          return 'danger'
        case 1:
          return 'warning'
        case 2:
          return 'success'
        case 3:
          return 'info'
        case 4:
          return ''
      }
    }
  },
  created () {
    this.getArticles()
    this.getChannels()
  }
}
</script>

<style lang='less' scoped>
.out{
  width: 100%;
  padding: 0 10px;
  .title{
    height: 50px;
    line-height: 50px;
    border-bottom: 1px dashed  #ccc;
  }
  .list{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    .left{
      display: flex;
      align-items: center;
      img{
        width: 150px;
        height: 100px;
      }
      .content{
        height: 100px;
        display: flex;
        flex-direction: column;
        padding-left: 10px;
        justify-content: space-between;
      }
    }
    .right{
      font-size: 12px;
      span{
        padding-left: 10px;
      }
    }
  }
}
</style>
