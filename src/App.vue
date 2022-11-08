<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
export default {
  name: "App",
  components: {
    FooterGuide
  },
  mounted() {
    // this.$store.dispatch('getAddress')
    this.getAddress()
  },
  methods: {
    ...mapActions(['getAddress'])
  },
};
</script>

<style lang="stylus">
</style>
