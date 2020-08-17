const got = require('@/utils/got');


module.exports = async (ctx) => {
  const url = 'http://www.zupc.zju.edu.cn/cms/e?t_=0.2368836467421258&window_=json&start=1&limit=25&sort=begin_time%20desc&type=ZCXQ&type=YQXQ&type=BYXQ&type=CSXQ&shopType=ZXCS&shopType=JZXTP&shopType=GKZB&shopType=WSXJ&shopType=WSJJ&shopType=JZXCS&shopType=DYLY&shopType=WTJC&categoryId=3183&page=cms.psms.publish.query'
  const {data} = await got.get(url)
  const list = data.resultset.map(i => {
    return {
      title: i.subject,
      description: i.contentHtml,
      link: 'http://www.zupc.zju.edu.cn/provider/#/publish/' + i.syncId,
      pubData: new Date(i.creTime)
    }
  })

  ctx.state.data = {
    title: '浙江大学采购',
    link: 'http://www.zupc.zju.edu.cn',
    item: list
  }
}