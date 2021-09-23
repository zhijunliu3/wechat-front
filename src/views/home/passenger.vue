<template>
  <div class="home">
      <div class="title">拼拼猪代驾返程</div>
      <div class="content">
        <van-row class="address">
          <van-col span="11" class="left" @click="chooseCity('start')">
            <p>出发站</p>
            <span>{{startSite}}</span>
          </van-col>
          <van-col span="2" class="middle" @click="exchangeCity"><i class="iconfont icon-exchange"></i></van-col>
          <van-col span="11" class="right" @click="chooseCity('end')">
            <p>到达站</p>
            <span>{{endSite}}</span>
          </van-col>
        </van-row>
        <div class="date" @click="clickDate">
          <p>出行日期</p>
          <span class="date-format">{{date | formatDate('MM月dd日')}}</span>
          <span class="explain">{{compareDate(date)}}</span>
        </div>
        <van-button type="info" class="search" @click="search">查询</van-button>
        <van-button type="info" class="search" @click="scanQRCode">扫描下单</van-button>
        <van-calendar v-model="show" :show-confirm="false" @confirm="onConfirm" color="#1989fa" />
      </div>
    </div>
</template>
<script>
import { parseTime } from '@/utils'
import { mapGetters } from 'vuex'
import { init, scanQRCode, isIOS } from '@/utils/wx'
export default {
  name: 'Passenger',
  data() {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters([
      'startSite',
      'endSite',
      'date'
    ])
  },
  mounted() {
    if (!isIOS()) {
      init()
    }
  },
  methods: {
    scanQRCode() {
      scanQRCode(res => {
        if (res.errMsg === 'scanQRCode:ok') {
          const { startSiteName, endSiteName, timeTableId } = JSON.parse(res.resultStr)
          this.$router.push({ path: '/preorder', query: {
            startSiteName: unescape(startSiteName),
            endSiteName: unescape(endSiteName),
            timeTableId
          }})
        }
      })
    },
    clickDate() {
      this.show = true
    },
    onConfirm(date) {
      this.show = false
      this.$store.dispatch(`user/date`, date)
      // this.date = date
    },
    compareDate(date) {
      const choose = parseTime(date, '{y}-{m}-{d}')
      const today = parseTime(new Date(), '{y}-{m}-{d}')
      if (choose === today) {
        return '今天'
      } else {
        return '周' + parseTime(date, '{a}')
      }
    },
    chooseCity(flag) {
      this.$router.push({ path: '/chooseCity', query: { flag }})
    },
    exchangeCity() {
      const flag = this.startSite
      this.$store.dispatch(`user/startSite`, this.endSite)
      this.$store.dispatch(`user/endSite`, flag)
    },
    search() {
      this.$router.push({
        path: '/schedule'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.home{
    position: relative;
    height: 200px;
    background: url(../../assets/img/home.jpg) center no-repeat;
    background-size: cover;
    margin-bottom: 0;
    .title{
      width: 90%;
      position: absolute;
      top: 60px;
      left: 20px;
      color: #fff;
      font-size: 24px;
    }
    .content{
      top: 150px;
      left: 15px;
      position: absolute;
      background-color: #fff;
      width: calc(100% - 52px);
      border-radius: 5px;
      padding: 25px 10px;
      p{
        margin: 0 0 5px 0;
        color: #aaaaab;
      }
      .address{
        padding: 0 0 15px 0;
        border-bottom: 1px solid #dddddf;

        span{
          font-size: 24px;
        }
        .left{
          text-align: left;

        }
        .right{
          text-align: right;
        }
        .middle{
          text-align: center;
          height: 52px;
          line-height: 52px;
          i{
            font-size: 30px;
          }
        }
      }
      .date{
        padding: 12px 0;
        .date-format{
          font-size: 24px;
          margin-right: 10px;
        }
        .explain{
          font-size: 16px;
        }
      }
      .search{
        width: 100%;
        margin-top: 10px;
      }

    }
  }
</style>
