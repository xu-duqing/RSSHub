const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
  const url = 'http://www.ccgp-anhui.gov.cn/cmsNewsController/getCgggNewsList.do?title=&buyer_name=&agent_name=&proj_code=&bid_type=011&type=101&dist_code=340000&pubDateStart=&pubDateEnd=&pProviceCode=340000&areacode_city=&areacode_dist=&channelCode=cggg&three=&pageNum=1'
  const {data} = await got.get(url)

  const $ = cheerio.load(data)
  const list = $('table').eq(0).find('tr')

  ctx.state.data = {
    title: '安徽政府采购',
    link: 'http://www.ccgp-anhui.gov.cn',
    item: list && list.map((index, item) => {
      item = $(item)
      return {
        title: item.find('a').attr('title'),
        description: item.find('a').attr('title'),
        link: 'http://www.ccgp-anhui.gov.cn/' + item.find('a').attr('href'),
        pubData: new Date(item.find('td').eq(1).text().slice(1,-1))
      }
    }).get()
  }
}