const got = require('@/utils/got');


module.exports = async (ctx) => {
  const url = 'http://zfcgmanager.czt.zj.gov.cn/cms/api/cors/remote/results\?pageSize\=100\&pageNo\=1\&sourceAnnouncementType\=3003\&url\=notice'
  const {data} = await got.get(url)
  const list = data.articles.map(i => {
    return {
      title: i.projectName,
      description: i.keywords,
      link: i.url,
      pubData: i.pubDate
    }
  })

  ctx.state.data = {
    title: '浙江政府采购',
    link: 'http://zfcg.czt.zj.gov.cn',
    item: list
  }
}