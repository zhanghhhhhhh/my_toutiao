import request from '@/utils/request'

/**
 *获取搜索建议
 * @param {*} q是搜索关键字
 * @returns
 */
export const getSuggesttList = q => {
  return request({
    url: 'suggestion',
    params: {
      q
    }
  })
}

/**
 *获取搜索结果列表
 * @param page 当前是第几页 per_page是一页多少个  q是搜索关键字
 * @returns
 */
// eslint-disable-next-line camelcase
export const getSearchResult = ({ page = 1, per_page, q }) => {
  return request({
    url: 'search',
    params: {
      page, per_page, q
    }
  })
}
