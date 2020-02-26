const path = require('path')

module.exports = {
    chainWebpack: config=>{
        //__dirname: current folder
        const dir = path.resolve(__dirname,'src/assets/icons')
        config.module
            .rule('svg-sprite')//添加规则，并命名为'svg-sprite'
            .test(/\.svg$/)//规则应用对象：以.svg结尾的文件
            .include.add(dir).end()//只包含icons目录（只在icons目录应用此规则）
            .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract:false}).end()//设置使用的loader,不解析出文件
            .use('svgo-loader').loader('svgo-loader')
            .tap(options => ({...options, plugins: [{removeAttrs: {attrs: 'fill'}}]}))
        //配置插件
        config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'),[{plainSprite:true}])
        config.module.rule('svg').exclude.add(dir)//其它svg-loader排除dir目录
    }
}