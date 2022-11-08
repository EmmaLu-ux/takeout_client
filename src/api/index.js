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


// 获取一次性验证码


// 用户名密码登陆


// 发送短信验证码


// 手机号验证码登陆

