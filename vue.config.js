// vue.config.js
module.exports = {
    productionSourceMap: false,
    devServer: {
        proxy: {
        '/c': {
            target: 'http://127.0.0.1:5757',
            ws: true,
            changeOrigin: true
        }
        }
    }
}
