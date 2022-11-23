<template>
  <div class="cartcontrol">
  <transition name="move">
    <div class="iconfont icon-jianshao" v-if="food.count" @click.stop="updateFoodCount(false)"></div>
  </transition>
    <div class="cart-count" v-if="food.count">{{food.count}}</div>
    <div class="iconfont icon-jiahao" @click.stop="updateFoodCount(true)"></div>
  </div>
</template>

<script>
export default {
  name: "CartControl-Comp",
  props: {
    food: Object
  },
  methods: {
    updateFoodCount(isAdd){
        this.$store.dispatch('updateFoodCount', {isAdd, food: this.food})
        console.log(this.food.count)
    }
  }
};
</script>

<style lang="stylus">
    @import "../../common/stylus/mixins.styl"
    .cartcontrol
        font-size: 0
        .cart-decrease
            display: inline-block
            padding: 6px
            line-height: 24px
            font-size: 24px
            color: rgb(0, 160, 220)
        .icon-jianshao
            display: inline-block
            padding 6px
            line-height 20px
            font-size 20px
            color $green
            &.move-enter-active, &.move-leave-active
                transition all .1s
            &.move-enter, &.move-leave-to
                opacity 0
                transform translateX(15px) rotate(180deg)
        .cart-count
            display: inline-block
            vertical-align: top
            width: 12px
            padding-top: 6px
            line-height: 24px
            text-align: center
            font-size: 10px
            color: rgb(147, 153, 159)
        .icon-jiahao
            display: inline-block
            padding: 6px
            line-height: 20px
            font-size: 20px
            color $green
</style>
