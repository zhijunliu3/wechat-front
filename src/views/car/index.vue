<template>
  <div class="mycar">
    <van-nav-bar
    title="我的汽车"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    />
      <div class="item" v-for="(item, index) in list" :key="index">
        <p>车牌号：{{item.licensePlate}}<span class="float-right">车型：{{item.model}}</span></p>
        <p>座位布局：{{item.seatLayout}}<span class="float-right">座位总数：{{item.seatCount}}</span></p>
        <p>生效时间：{{item.validDay}}<span class="float-right">过期时间：{{item.expiredDay}}</span></p>
      </div>
      <!-- <div class="info">
        <p>车牌：<span class="value">{{detail.licensePlate}}</span></p>
        <p>型号：<span class="value">{{detail.model}}</span></p>
      </div>
      <div class="info">
        <p>座位布局：<span class="value">{{detail.seatLayout}}</span></p>
        <p>座位总数：<span class="value">{{detail.seatCount}}</span></p>
      </div>
      <div class="info">
        <p>生效时间：<span class="value">{{detail.validDay}}</span></p>
        <p>过期时间：<span class="value">{{detail.expiredDay}}</span></p>
      </div> -->
  </div>
</template>

<script>
import { getMyCar } from '@/api/car'
export default {
  name: 'MyCar',
  data() {
    return {
      list: {}
    }
  },
  created() {
    this.getMyCar()
  },
  methods: {
    onClickLeft() {
      this.$router.push('/about')
    },
    getMyCar() {
      getMyCar().then(res => {
        this.list = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mycar{
  padding: 10px;
    p{
      margin: 0;
    }
    .info{
      background-color: #fff;
      padding: 15px;
      margin-top: 10px;
      border-radius: 5px;
      font-size: 14px;
      color: #aaaaab;
      line-height: 24px;
      .value{
        float: right;
        color: #333;
      }
      .button{
        text-align: center;
      }
    }
    .item{
      margin-top: 5px;
      background-color: #fff;
      padding: 5px 10px;
      p{
        margin: 0;
        line-height: 20px;
        &:first-child{
          text-align: left;
        }
      }
      .float-right{
        float: right;
      }
    }
}
</style>
