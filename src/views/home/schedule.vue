<template>
  <div class="schedule">
    <van-nav-bar
      :title="this.startSite + ' - ' + this.endSite"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 切换日期按钮 -->
    <van-row class="date-choose">
      <van-col span="7">
        <van-button color="#1989fa" type="primary" size="small" @click="beforeDay" :disabled="beforeIsDisabled()">前一天</van-button>
      </van-col>
      <van-col span="10" @click="clickDate">
        <van-button color="#1989fa" plain type="primary" size="small">
          <span>{{date | formatDate('MM月dd日')}}</span>
          <span>{{ getDateWeekday(date) }}</span>
          <i class="iconfont icon-date"></i>
        </van-button>
      </van-col>
      <van-col span="7" >
        <van-button color="#1989fa" @click="afterDay" type="primary" size="small">
          后一天
        </van-button>
      </van-col>
    </van-row>
    <!-- 车次列表 -->
    <div class="container" :style="{height: height + 'px'}">
      <van-empty v-if="items.length === 0" description="暂无车次信息" />
      <div class="item" v-for="(item, index) in items" :key="index">
        <div @click="clickItem(item)">
          <van-row class="line-info">
            <van-col span="6" class="address">
              <p class="time">{{getSiteTime(item.startTime)}}</p>
              <span>{{item.startSiteName}}</span>
            </van-col>
            <van-col span="9" class="car-info">
              <p class="top">{{item.model}}</p>
              <p class="right-arrow">
                <i class="iconfont icon-arrow right-arrow"></i>
              </p>
              <p class="bottom">{{item.licensePlate}}</p>
            </van-col>
            <van-col span="6" class="address">
                <p class="time relative-position">{{getSiteTime(item.endTime)}}
                  <van-badge v-if="getDaysBetween(item.endTime)" class="badge" :content="'+' + getDaysBetween(item.endTime)"  color="#1989fa" />
                </p>
              <!-- <van-badge :content="'+' + getDaysBetween(item.endTime)" color="#1989fa">
                <p class="time">{{getSiteTime(item.endTime)}}</p>
              </van-badge>
              <br> -->
              <span>{{item.endSiteName}}</span>
            </van-col>
            <van-col span="3" class="price">
              <span>￥{{item.price}}</span>
            </van-col>
          </van-row>
          <van-row class="seat-info">
            <van-col span="8" class="number">剩余座位：{{item.seatCount}}个</van-col>
            <van-col span="8" class="number">剩余行李位：{{item.baggageCount}}个</van-col>
            <van-col span="8" class="order-button">
              <van-button color="#1989fa" round type="primary" size="mini" @click="order(item)">预定</van-button>
            </van-col>
          </van-row>
        </div>
        <!-- <div v-show="item.isShowSiteInfo">
          <van-row class="site-info site-info-title">
            <van-col span="4">站序</van-col>
            <van-col span="8">站名</van-col>
            <van-col span="4">时间</van-col>
            <van-col span="4">距离</van-col>
            <van-col span="4">价格</van-col>
          </van-row>
          <van-row class="site-info">
            <van-col span="4">1</van-col>
            <van-col span="8">洛溪桥底</van-col>
            <van-col span="4">30min</van-col>
            <van-col span="4">4km</van-col>
            <van-col span="4">￥8</van-col>
          </van-row>
          <van-row class="site-info">
            <van-col span="4">2</van-col>
            <van-col span="8">广诚旺商行</van-col>
            <van-col span="4">15min</van-col>
            <van-col span="4">2km</van-col>
            <van-col span="4">￥8</van-col>
          </van-row>
        </div> -->
      </div>
    </div>
    <van-calendar v-model="show" :show-confirm="false" @confirm="onConfirm" color="#1989fa" />
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import { mapGetters } from 'vuex'
import { listCar } from '@/api/home'
export default {
  name: 'Schedule',
  data() {
    return {
      title: '长沙 - 深圳',
      height: '100',
      // date: new Date(),
      show: false,
      items: []
    }
  },
  computed: {
    ...mapGetters([
      'startSite',
      'endSite',
      'date'
    ])
  },
  created() {
    // this.date = new Date(Number(this.$route.query.date))
    this.title = this.$route.query.startStation + ' - ' + this.$route.query.endStation
    this.height = window.screen.height - 153
    this.listCar()
  },
  methods: {
    listCar() {
      const startDate = parseTime(this.date, '{y}-{m}-{d}')
      listCar({
        startSiteName: this.startSite,
        endSiteName: this.endSite,
        startDate: startDate
      }).then(res => {
        this.items = res.data
      })
    },
    onClickLeft() {
      this.$router.push('/home')
    },
    getDateWeekday(date) {
      return '周' + parseTime(date, '{a}')
    },
    beforeDay() {
      // this.date = new Date(this.date.getTime() - 24 * 60 * 60 * 1000)
      this.$store.dispatch(`user/date`, new Date(this.date.getTime() - 24 * 60 * 60 * 1000))
      this.listCar()
    },
    afterDay() {
      // this.date = new Date(this.date.getTime() + 24 * 60 * 60 * 1000)
      this.$store.dispatch(`user/date`, new Date(this.date.getTime() + 24 * 60 * 60 * 1000))
      this.listCar()
    },
    clickDate() {
      this.show = true
    },
    onConfirm(date) {
      this.show = false
      this.$store.dispatch(`user/date`, date)
      // this.date = date
      this.listCar()
    },
    clickItem(item) {
      item.isShowSiteInfo = !item.isShowSiteInfo
    },
    beforeIsDisabled() {
      return parseTime(new Date(), '{y}{m}{d}') === parseTime(this.date, '{y}{m}{d}')
    },
    getDaysBetween(date) {
      var startDate = new Date(parseTime(this.date, '{y}/{m}/{d}'))
      var endDate = new Date(parseTime(date, '{y}/{m}/{d}'))
      var days = (endDate - startDate) / (24 * 60 * 60 * 1000)
      return days
    },
    getSiteTime(date) {
      return parseTime(date, '{h}:{i}')
    },
    order(item) {
      this.$router.push({ path: '/preorder', query: item })
    }
  }
}
</script>
<style lang="scss">
.schedule{
  .van-button--mini{
    height: 28px;
    padding: 0 15px;
    font-size: 12px;
  }
}
</style>
<style lang="scss" scoped>
.schedule{
  .date-choose{
    height: 46px;
    display: flex;
    align-items: center;
    font-size: 16px;
    text-align: center;
    background-color: #fff;
    span{
      font-size: 14px;
      margin-right: 4px;
    }
  }
  .container{
    overflow: auto;
    .item{
      background-color: #fff;
      padding: 10px;
      margin-top: 5px;
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
            .badge{
              position: absolute;
              top: -5px;
              right: 2px;
            }
          }
          .relative-position{
            position: relative;
          }
        }
        .car-info{
          position: relative;
          text-align: center;
          display: flex;
          justify-self: center;
          .top{
            top: 6px;
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
        .number{
          line-height: 28px;
        }
        .order-button{
          text-align: right;
          padding-right: 20px;
        }
      }
      // .site-info{
      //   text-align: center;
      //   line-height: 20px;
      // }
      // .site-info-title{
      //   background-color: #ECF5FF;
      // }
    }
  }
}

</style>
