const got = require('@/utils/got');

module.exports = async (ctx) => {

  const keywords = Array.isArray(ctx.query.keywords) ? ctx.query.keywords : [ctx.query.keywords]

  console.log(keywords);

  const url = 'https://www.yuncaitong.cn/api/publish/solr/demand?&page=0&rows=25'
  const {data} = await got.get(url)
  const list = data.map(i => {
    const dt = new Date(i.createTime)
    return {
      title: `${i.projectName} - [${i.orgName}]`,
      description: i.subject,
      link: `http://www.yuncaitong.cn/publish/${dt.toISOString().split('T')[0].replace(/-/gi,'/')}/${i.id}.shtml`,
      pubData: new Date(i.createTime)
    }
  })

  ctx.state.data = {
    title: '云采购',
    link: 'http://www.yuncaitong.cn/',
    item: list
  }
}