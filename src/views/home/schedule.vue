<template>
  <div class="schedule">
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-row class="date-choose">
      <van-col span="8">前一天</van-col>
      <van-col span="8">
        <span>5月23日</span>
        <span>周日</span>
      </van-col>
      <van-col span="8">后一天</van-col>
    </van-row>
    <div class="container" :style="{height: height + 'px'}">
      <div class="item" v-for="n in 10" :key="n">
        <van-row class="line-info">
          <van-col span="6" class="address">
            <p class="time">20:00</p>
            <span>市桥</span>
          </van-col>
          <van-col span="9" class="car-info">
            <p class="top">白色金龙面包车</p>
            <p class="right-arrow">
              <i class="iconfont icon-arrow right-arrow"></i>
            </p>
            <p class="bottom">粤ADC7870</p>
          </van-col>
          <van-col span="6" class="address">
            <p class="time">22:00</p>
            <span>南沙</span>
          </van-col>
          <van-col span="3" class="price">
            <span>￥20元</span>
          </van-col>
        </van-row>
        <van-row class="seat-info">
          <van-col span="6">驾驶位：0个</van-col>
          <van-col span="6">副驾驶：1个</van-col>
          <van-col span="6">二排座位：2个</van-col>
          <van-col span="6">三排座位：3个</van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Schedule',
  data() {
    return {
      title: '长沙 - 深圳',
      height: '100'
    }
  },
  created() {
    this.height = window.screen.height - 215
  },
  methods: {
    onClickLeft() {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="scss" scoped>
.schedule{
  .date-choose{
    margin-bottom: 10px;
    height: 46px;
    line-height: 46px;
    font-size: 16px;
    text-align: center;
    background-color: #fff;
  }
  .container{
    overflow: auto;
    .item{
      background-color: #fff;
      padding: 10px;
      margin-bottom: 5px;
      .line-info{
        border-bottom: 1px solid #dddddf;
        padding-bottom: 5px;
        p{
          margin: 0;
        }
        .address{
          text-align: center;
          .time{
            font-size: 20px;
            font-weight: 600;
            line-height: 30px;
            height: 30px;
          }
        }
        .car-info{
          position: relative;
          text-align: center;
          display: flex;
          justify-self: center;
          .top{
            top: 4px;
            width: 100%;
            position: absolute;
            font-size: 10px;
          }
          .bottom{
            width: 100%;
            top: 32px;
            position: absolute;
            font-size: 10px;
          }
          .right-arrow{
            width: 50%;
            left: 50%;
            transform: translateX(-60%);
            position: absolute;
            i{
              font-size: 50px;
            }
          }
        }
        .price{
          height: 46px;
          line-height: 46px;
          font-size: 14px;
        }
      }
      .seat-info{
        text-align: center;
        margin-top: 5px;
      }
    }
  }
}

</style>
