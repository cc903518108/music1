<template>
    <div class="tab">
      <router-link class="top" tag="div" to="/home"><span>推荐</span></router-link>
      <router-link class="top" tag="div" to="/singer"><span>歌手</span></router-link>
      <router-link class="top" tag="div" to="/rank"><span>排行</span></router-link>
      <router-link class="top" tag="div" to="/seach"><span>搜索</span></router-link>
    </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
@import '../../assets/style/variable.styl'
.tab
  display flex
  height .88rem
  line-height .88rem
  font-size $font-size-x
  .top
    flex 1
    text-align center
    span
      color $c-text-l
      padding-bottom .1rem
    &.router-link-active
      span
        color $c-theme
        border-bottom .04rem solid $c-theme
</style>
