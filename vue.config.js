module.exports = {
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',//改为域名
    port: 23333,//改为端口80
    https: false,
    hotOnly: false,
    proxy: null, // string | Object
    before: app => {
    }
  }
}
