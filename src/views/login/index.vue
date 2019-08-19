<template>
<div class="login">
<el-card class="login_card">
    <!-- logo图片 -->
<div class="login_logo">
    <img src="../../assets/img/logo_index.png" alt="">
</div>
<!-- loginform表单 -->
<el-form :model="fromData" class="loginForm">
    <el-form-item>
        <el-input></el-input>
    </el-form-item>
    <el-form-item>
        <el-input style="width:65%;"></el-input>
        <el-button style="float:right">获取验证码</el-button>
    </el-form-item>
    <el-form-item>
        <el-checkbox v-model="checked">我已阅读并同意<a>用户协议</a>和<a>隐私条款</a></el-checkbox>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" style="width:100%">登录</el-button>
    </el-form-item>
</el-form>
</el-card>
</div>
</template>

<script>
export default {

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
