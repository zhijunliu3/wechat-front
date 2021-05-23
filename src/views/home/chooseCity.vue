<template>
  <div class="choose-city">
    <van-nav-bar
    title="城市选择"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    />
    <van-search v-model="value" placeholder="请输入搜索关键词" />
    <div class="hot-city">
      <span class="title">热门城市</span>
      <van-row class="city-tags">
        <van-col span="6"><van-tag color="#cccccd" text-color="#333" plain type="primary">南沙</van-tag></van-col>
        <van-col span="6"><van-tag color="#cccccd" text-color="#333" plain type="primary">市桥</van-tag></van-col>
        <van-col span="6"><van-tag color="#cccccd" text-color="#333" plain type="primary">新塘</van-tag></van-col>
        <van-col span="6"><van-tag color="#cccccd" text-color="#333" plain type="primary">增城</van-tag></van-col>
        <van-col span="6"><van-tag color="#cccccd" text-color="#333" plain type="primary">天河</van-tag></van-col>
        <van-col span="6"><van-tag color="#cccccd" text-color="#333" plain type="primary">花都</van-tag></van-col>
      </van-row>
    </div>
    <div class="index-city" :style="{height: height + 'px'}">
      <van-index-bar>
        <van-index-anchor index="A" />
        <van-cell title="文本A" />
        <van-cell title="文本A" />
        <van-cell title="文本A" />

        <van-index-anchor index="B" />
        <van-cell title="文本B" />
        <van-cell title="文本B" />
        <van-cell title="文本B" />

        <van-index-anchor index="C" />
        <van-cell title="文本C" />
        <van-cell title="文本C" />
        <van-cell title="文本C" />

        <van-index-anchor index="D" />
        <van-cell title="文本D" />
        <van-cell title="文本D" />
        <van-cell title="文本D" />
      </van-index-bar>
    </div>
  </div>

</template>

<script>
export default {
  name: 'ChooseCity',
  data() {
    return {
      value: '',
      height: '100'
    }
  },
  created() {
    this.height = window.screen.height - 315
  },
  methods: {
    onClickLeft() {
      this.$router.push('/home')
    }

  }

}
</script>

<style lang="scss">
  .choose-city{
    .van-tag{
      padding: 8px 20px;
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
    }
  }
</style>
