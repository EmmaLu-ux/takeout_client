/* 包含多个接口请求函数的模块 */
import ajax from './ajax'

const BASE = '/api'

// 根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(BASE + `/position/${geohash}`)

// 获取食品分类列表
export const reqFoodCategorys = () => ajax(BASE + '/index_category')

// 根据经纬度获取商铺列表
export const reqShops = (longitude, latitude) => ajax(BASE + '/shops', {longitude, latitude})

// 根据经纬度和关键字搜索商铺列表
export const reqSearchShop = (geohash, keyword) => ajax(BASE + '/search_shops', {geohash, keyword})

// 用户名密码登陆
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(BASE + '/login_pwd', {name, pwd, captcha}, 'POST')

// 发送短信验证码
export const reqSendCode = (phone) => ajax(BASE + '/sendcode', {phone})

// 手机号验证码登陆
export const reqSmsLogin = (phone, code) => ajax(BASE + '/login_sms', {phone, code}, 'POST')

//根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE + '/userinfo')

//用户登出
export const reqLogout = () => ajax(BASE + '/logout')

//获取商品信息
export const reqShopGoods = () => ajax('/goods')

//获取评价信息
export const reqShopRatings = () => ajax('/ratings')

//获取商家信息
export const reqShopInfo = () => ajax('/info')
