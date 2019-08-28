<template>
  <div ref='myChart' class="chart">
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted () {
    var myChart = echarts.init(this.$refs.myChart)
    myChart.setOption({
      series: {
        type: 'sunburst',
        data: [{
          name: 'A',
          value: 10,
          children: [{
            value: 3,
            name: 'Aa'
          }, {
            value: 5,
            name: 'Ab'
          }]
        }, {
          name: 'B',
          children: [{
            name: 'Ba',
            value: 4
          }, {
            name: 'Bb',
            value: 2
          }]
        }, {
          name: 'C',
          value: 3
        }]
      }
    })
  }
}
</script>
<style lang='less' scoped>
.chart{
width: 200px;
height: 200px;
background-color: bisque;
}
</style>
