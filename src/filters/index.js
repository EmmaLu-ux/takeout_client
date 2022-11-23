import format from 'date-fns'
import Vue from 'vue'

Vue.filter('date-format', function (value, formatStr = 'YYYY-MM-DD HH:mm:ss') {
    return format(value, formatStr)
})