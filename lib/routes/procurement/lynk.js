const got = require('@/utils/got');

module.exports = async (ctx) => {
  const url = 'https://h5.lynkco.cn/app/product/search?pageNo=1&pageSize=200'
  const {data} = await got.get(url)
  const list = data.data.items.map(i => {
    return {
      title: i.name + ' - ' + i.pay_co,
      description: `<img src=${i.img_url} />`,
      link: 'https://h5.lynkco.com/h5/pages/shop-mall/goods/page-info.html?goodId=' + i.product_id,
      pubData: new Date(i.shelf_time)
    }
  })

  ctx.state.data = {
    title: '领客商城',
    link: 'https://h5.lynkco.cn/h5/pages/shop-mall/index/index.html',
    item: list
  }
}