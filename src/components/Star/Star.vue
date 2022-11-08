<template>
  <div class="star" :class="'star-' + size">
    <span class="star-item" v-for="(sc, index) in scoreClasses" :key="index" :class="sc"></span>
  </div>
</template>

<script>
const CLASS_ON = 'on'
const CLASS_HALF = 'half'
const CLASS_OFF = 'off'
export default {
  name: "Star-Comp",
  props: {
    score: Number,
    size: Number
  },
  computed: {
    scoreClasses(){
        const {score} = this
        const sc = []
        //score的整数部分
        const scoreInteger = Math.floor(score)
        for(let i = 0; i < scoreInteger ; i++){
            sc.push(CLASS_ON)
        }
        //score的半星部分
        if((score - scoreInteger) * 10 > 5){
            sc.push(CLASS_HALF)
        }
        // score的灰色部分
        while(sc.length < 5){
            sc.push(CLASS_OFF)
        }
        return sc
    }
  }
};
</script>

<style lang="stylus">
    @import "../../common/stylus/mixins.styl"
    .star 
        float left
        font-size 0
        .star-item
            display inline-block
            background-repeat no-repeat
        &.star-48
            .star-item
                width 20px
                height 20px
                margin-right 22px
                background-size 20px 20px
                &:last-child
                    margin-right: 0
                &.on
                    bg-image('./images/stars/star48_on')
                &.half
                    bg-image('./images/stars/star48_half')
                &.off
                    bg-image('./images/stars/star48_off')
        &.star-36
            .star-item
                width 15px
                height 15px
                margin-right 6px
                background-size 15px 15px
                &:last-child
                    margin-right 0
                &.on
                    bg-image('./images/stars/star36_on')
                &.half
                    bg-image('./images/stars/star36_half')
                &.off
                    bg-image('./images/stars/star36_off')
        &.star-24
            .star-item
                width 10px
                height 10px
                margin-right 3px
                background-size 10px 10px
                &:last-child
                    margin-right 0
                &.on
                    bg-image('./images/stars/star24_on')
                &.half
                    bg-image('./images/stars/star24_half')
                &.off
                    bg-image('./images/stars/star24_off')
</style>
