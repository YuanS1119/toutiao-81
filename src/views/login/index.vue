<template>
<div class="login">
    <el-card class="login_card">
        <!-- logo图片 -->
        <div class="login_logo">
            <img src="../../assets/img/logo_index.png" alt="">
        </div>
        <!-- loginform表单 -->
        <el-form :model="formData" class="loginForm" :rules="rules" ref="form">
            <el-form-item prop="mobile">
                <el-input placeHolder="请输入手机号" v-model="formData.mobile"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input style="width:65%;" placeholder="验证码" v-model="formData.code"></el-input>
                <el-button style="float:right">获取验证码</el-button>
            </el-form-item>
            <el-form-item prop="check">
                <el-checkbox v-model="formData.check">我已阅读并同意<a>用户协议</a>和<a>隐私条款</a></el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:100%" @click="isAgree">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</div>
</template>

<script>
export default {
  data () {
    var func = function (rules, value, callback) {
      if (value) {
        callback()
      } else {
        callback(new Error('请同意此条款'))
      }
    }
    return {
      formData: {
        mobile: '',
        code: '',
        check: false
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }, // 输入为null，undefined，‘’，
          // { len: 11, message: '请输入正确的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式错误' }

        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '验证码必须是6位数字' }

        ],
        check: [
          { validator: func }
        ]
      }
    }
  },
  methods: {
    isAgree () {
      this.$refs.form.validate(isOK => {
        if (isOK) {
          // console.log(this)
          this.$axios({
            method: 'post', // post提交方法
            url: '/authorizations', // post接口
            data: this.formData // post参数
          }).then(res => {
            console.log(res)
            window.localStorage.setItem('userInfo', JSON.stringify(res.data))
            this.$router.push('/home')
          })
        }
      })
    }
  }

}
</script>

<style lang="less" scoped>
.login{
    width: 100%;
    height: 100vh;
    background-image: url('../../assets/img/login_bg.jpg');
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login_card{
        width: 30%;
        .login_logo{
            text-align: center;
        }
        .login_logo img{
            width: 162px;
            height: 36px;
        }
    }
    .loginForm{
        padding: 25px 0 0 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}
</style>
s
