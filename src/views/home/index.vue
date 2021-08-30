<!-- home -->
<template>
  <div class="index-container">
    <template v-if="userType === '1'">
      <passenger></passenger>
    </template>
    <template v-else>
      <driver></driver>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Driver from './driver'
import Passenger from './passenger'
export default {
  name: 'Home',
  components: {
    Driver,
    Passenger
  },
  computed: {
    ...mapGetters([
      'userType'
    ])
  },
  created() {
    console.log(this.userType)
  }
}
</script>
<style lang="scss" scoped>
.index-container {
  box-sizing: border-box;
}
</style>
