<template>
  <div class="home">
    <el-container>
      <el-aside style='width:200px;height:100vh;background-color:#323745'></el-aside>
       <!--右面容器 -->
      <el-container>
        <!-- 右边header -->
        <el-header></el-header>
        <!-- 右面main内容 -->
        <el-main style="padding:0;">
          <router-view></router-view>
        </el-main>
     </el-container>
    </el-container>
  </div>
</template>

<script>
import layoutAside from '../../components/home/layout-aside'
import layoutHeader from '../../components/home/layout-header'
export default {
  components: {
    'el-aside': layoutAside,
    'el-header': layoutHeader
  }
}
</script>
<style lang="less" scoped>
</style>
