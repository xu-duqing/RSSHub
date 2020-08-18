const got = require('@/utils/got');


module.exports = async (ctx) => {
  const url = 'http://czju.suzhou.gov.cn/zfcg/content/cpContents.action?type=A&title=&choose=&projectType=&zbCode=&appcode=&page=1&rows=30'
  const {data} = await got.get(url)
  const list = data.rows.map(i => {
    return {
      title: i.TITLE,
      description: i.TITLE,
      link: `http://czju.suzhou.gov.cn/zfcg/html/project/${i.ID}.shtml`,
      pubData: new Date(i.RELEASETIME)
    }
  })

  ctx.state.data = {
    title: '苏州政府采购',
    link: 'http://czju.suzhou.gov.cn/',
    item: list
  }
}