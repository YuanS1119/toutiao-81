<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
 <el-form ref="myForm" :model="formData" :rules="rules" label-width="80px" class="publish-form">
      <el-form-item prop="title" label="标题">
        <el-input v-model="formData.title" style="width:400px;"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容">
        <el-input v-model="formData.content" type="textarea" :rows="4" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="封面" v-model="formData.cover.type">
        <el-radio-group>
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <div>选择图片</div>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="formData.channel_id">
          <el-option :label="item.name" :value="item.id" v-for="item in channels" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publish(false)">发布</el-button>
        <el-button @click="publish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      channels: [],
      formData: {
        title: '',
        content: '',
        channel_id: null,
        cover: {
          type: 0,
          images: []
        } // 默认给个无图
      },
      rules: {
        title: [
          { required: true, message: '标题内容不能为空' },
          { min: 5, max: 30, message: '内容字符要在5-30个之间' }
        ],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]
      }
    }
  },
  methods: {
    // 发布内容/草稿
    publish (draft) {
      this.$refs.myForm.validate(async isOK => {
        if (isOK) {
          // 发布文章
          let { articleId } = this.$route.params
          let method = articleId ? 'put' : 'post'
          await this.$axios({
            method,
            url: '/articles',
            data: this.formData,
            params: { draft }
          })
          this.$router.push('/home/articles')
        }
      })
    },
    async getChannels () {
      let result = await this.$axios({
        url: '/channels'
      })
      this.channels = result.data.channels
    },
    async getActicleById () {
      let { articleId } = this.$route.params
      let res = await this.$axios({
        url: `/articles/${articleId}`
      })
      this.formData = res.data
    }
  },
  created () {
    this.getChannels() // 获取频道
    let { articleId } = this.$route.params
    articleId && this.getActicleById()// 根据文章id获取文章内容
  }
}
</script>
<style lang='less' scoped>
.publish-form {
  margin-left: 50px;
}
</style>
