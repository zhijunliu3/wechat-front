<template>
  <div class="choose-city">
    <van-nav-bar
    title="城市选择"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    />
    <!-- <van-search v-model="value" placeholder="请输入搜索关键词" /> -->
    <!-- <div class="hot-city">
      <span class="title">热门城市</span>
      <van-row class="city-tags">
        <van-col span="6" v-for="(hotCity, index) in hotCitys" :key="index" @click="chooseCity(hotCity)">
          <van-tag color="#cccccd" text-color="#333" plain type="primary">{{hotCity}}</van-tag>
        </van-col>
      </van-row>
    </div> -->
    <div class="index-city" :style="{height: height + 'px'}">
      <van-index-bar>
        <template v-for="(collection, index) in collections">
          <van-index-anchor :index="collection.index" :key="collection.index+index" />
          <van-cell
            v-for="(city, cityIndex) in collection.data"
            :title="city.siteName"
            :key="city.siteName+cityIndex"
            @click="chooseCity(city.siteName)"
          >
          <template #default>
            <van-button @click.stop="clickLocaltion(city)" class="localtion-button" round plain type="info" size="mini" icon="location-o"></van-button>
          </template>
          </van-cell>
        </template>
      </van-index-bar>
    </div>
  </div>

</template>

<script>
import { listSite } from '@/api/home'
import { mapGetters } from 'vuex'
import { init, openLocation, isIOS } from '@/utils/wx'
export default {
  name: 'ChooseCity',
  data() {
    return {
      value: '',
      height: '100',
      hotCitys: ['南沙', '市桥', '新塘', '增城', '天河', '花都'],
      collections: [
        { index: 'A', citys: ['城市A1', '城市A2', '城市A3'] },
        { index: 'B', citys: ['城市B1', '城市B2', '城市B3'] },
        { index: 'C', citys: ['城市C1', '城市C2', '城市C3'] },
        { index: 'D', citys: ['城市D1', '城市D2', '城市D3'] }
      ],
      flag: ''
    }
  },
  computed: {
    ...mapGetters([
      'startSite',
      'endSite'
    ])
  },
  created() {
    this.flag = this.$route.query.flag
    console.log(this.flag)
    this.height = window.screen.height - 265 + 102 + 54
    this.listSite()
  },
  mounted() {
    if (!isIOS()) {
      init()
    }
  },
  methods: {
    listSite() {
      let request = {}
      if (this.flag === 'end') {
        request = {
          siteName: this.startSite,
          startSiteName: true
        }
      }
      listSite(request).then(res => {
        this.collections = this.converArrayAndSort(this.groupByProp(res.data, 'siteInitial'))
      })
    },
    groupByProp(arr, prop) {
      const result = {}
      arr.forEach(element => {
        if (!result[element[prop]]) {
          result[element[prop]] = [element]
        } else {
          result[element[prop]].push(element)
        }
      })
      return result
    },
    converArrayAndSort(map) {
      const result = []
      Object.keys(map).forEach(key => {
        result.push({
          index: key,
          data: map[key]
        })
      })
      result.sort((o1, o2) => o1.index.localeCompare(o2.index))
      return result
    },
    onClickLeft() {
      this.$router.push('/home')
    },
    chooseCity(city) {
      this.$store.dispatch(`user/${this.flag}Site`, city)
      this.$router.push({ path: '/home' })
    },
    clickLocaltion(city) {
      console.log(city)
      openLocation(city.latitude, city.longitude, city.siteName, '')
    }

  }

}
</script>

<style lang="scss">
  .choose-city{
    .van-tag{
      padding: 8px 20px;
    }
    .van-button--mini{
      padding: 5px 8px;
      height: 30px;
    }
  }
</style>

<style lang="scss" scoped>
  .choose-city{
    .hot-city{
      padding: 5px 0 5px;
      margin-top: 5px;
      background-color: #fff;
      .title{
        color: #aaaaab;
        margin-left: 15px;
        margin-bottom: 5px;
      }
      .city-tags{
        text-align: center;
        .van-col{
          margin: 3px 0;
        }
      }
    }
    .index-city{
      overflow: auto;
      .localtion-button{
        margin-right: 10px;
      }
    }
  }
</style>
