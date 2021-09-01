<!-- home -->
<template>
  <div class="about-container">
    <div class="head">
      <div class="face-bg"></div>
    </div>
    <ul class="row">
      <!-- <li><i class="iconfont icon-user cell-icon primary"></i>我的资料</li>
      <li><i class="iconfont icon-register cell-icon primary"></i>注册司机</li> -->
      <li v-if="userType === '2'" @click="jumpPage('/mycar')"><i class="iconfont icon-car cell-icon primary"></i>我的汽车</li>
      <li v-if="userType === '2'" @click="jumpPage('/trip')"><i class="iconfont icon-trip cell-icon primary"></i>我的行程</li>
      <li v-if="userType === '1'" @click="jumpPage('/order')"><i class="iconfont icon-order cell-icon primary"></i>我的订单</li>
    </ul>
    <ul class="row">
      <li class="danger" @click="unBind"><i class="iconfont icon-unbind cell-icon"></i>解除绑定</li>
    </ul>
    <ul class="row">
      <li class="danger" @click="logout"><i class="iconfont icon-logout cell-icon"></i>退出登陆</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { unBind } from '@/api/user'
import { removeToken } from '@/utils/auth'
import { Dialog } from 'vant'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'userType'
    ])
  },
  mounted() {
  },
  methods: {
    jumpPage(path, query) {
      this.$router.push({ path, query })
    },
    logout() {
      this.$store.dispatch(`user/logout`)
      this.$router.push('/common')
    },
    unBind() {
      Dialog.confirm({
        message: '解除绑定后，需要再次绑定才可以登陆。'
      }).then(() => {
        unBind().then(res => {
          removeToken()
          this.$router.push('/common')
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        // on cancel
      })
    }
  }
}
</script>
<style lang="scss">
.about-container {
  /* 你的命名空间 */
  box-sizing: border-box;
  .head {
    height: 200px;
    background: url(../../assets/img/cover.jpg) center no-repeat;
    background-size: cover;
    margin-bottom: 0;
    display: flex;
    align-items:center;
    justify-content:center;
    .face-bg{
      height: 120px;
      width: 120px;
      background-color: #fff;
      border-radius: 50%;
      background: url(../../assets/img/face.jpg) no-repeat center;
      background-size: cover;
    }
  }
  .row {
    margin-bottom: 10px;
  }

  ul{
    display: block;
    list-style: none;
    font-size: 16px;
    li{
      background-color: #fff;
      padding: 12px 15px;
      position: relative;
      .cell-icon{
        font-size: 16px;
        margin-right: 5px;
      }
    }
    li:last-child:after {
      height: 0;
    }
    li:after {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 15px;
      height: 1px;
      content: '';
      -webkit-transform: scaleY(.5);
      transform: scaleY(.5);
      background-color: #c8c7cc;
    }
    li:after {
      right: 10px;
      background-color: rgba(0,0,0,.15);
    }
  }
}
</style>
