<template>
    <el-row class="header_row" type="flex" justify="space-between">
        <el-col :span="10" class="header_left">
            <i class="el-icon-s-unfold" style="font-size:20px"></i>
            <span>江苏传智播客教育科技股份有限公司</span>
        </el-col>
        <el-col :span="3" class="header_right">
            <!-- <img src="../../assets/img/avatar.jpg" alt=""> -->
            <img :src="user.photo?user.photo:defaultImg" alt="">
            <!-- <el-dropdown trigger="click"> -->
                  <el-dropdown trigger="click" @command="commandAction">
                <span class="el-dropdown-link">
                    昵称
                    {{user.name}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="account">个人信息</el-dropdown-item>
                    <el-dropdown-item command="gitUrl">git地址</el-dropdown-item>
                    <el-dropdown-item command="out">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </el-row>
</template>

<script>
// export default {}
export default {
  data () {
    return {
      user: {},
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      })
        .then(res => {
          this.user = res.data.data
        })
    },
    commandAction (command) {
      if (command === 'account') {
        this.$router.push('/home/account')
      } else if (command === 'gitUrl') {
        window.location.href = 'https://github.com/YuanS1119/toutiao-81'
      } else if (command === 'out') {
        window.localStorage.clear()
        this.$router.push('/login')
      }
    }
  },
  created () {
    this.getUserInfo()
  }

}
</script>

<style lang="less" scoped>
    .header_row{
        padding: 15px 0;
        .header_left{
            padding-left: 10px;
            font-size: 15px;
            display: flex;
            align-items :center;
        }
        .header_right{
            display: flex;
            align-items: center;
            img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 10px;
            }
        }
    }
</style>
