const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin'); //把非javascript的静态文件单独打包

const isDev = process.env.NODE_ENV === 'development';

const config = {
    target: 'web',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.[hash:8].js', //开发环境中可以这么写
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.jsx$/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.(gif|svg|png|jpg|jpeg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: '[name].[ext]'
                }
            }]
        }]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin()
    ]
}

if (isDev) {
    config.module.rules.push({
        test: /\.less$/,
        use: [
            'style-loader', //将css写入javascript中
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true //编译更快
                }
            },
            'less-loader'
        ]
    })
    config.devTool = '#cheap-module-eval-source-map', //映射代码，方便调试
        config.devServer = {
            port: 8080,
            host: '0.0.0.0',
            overlay: { //直接在网页上显示编译的错误，方便调试
                errors: true
            },
            //historyFallback:{},
            open: true, //自动打开浏览器
            hot: true //热加载
        }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(), //热加载
        new webpack.NoEmitOnErrorsPlugin()
    )
} else {
    config.output.filename = '[name].[chunkhash:8].js'; //正式环境中要用chunkhash编码
    config.module.rules.push({
        test: /\.less$/,
        use: ExtractPlugin.extract({
            fallback: 'style-loader',
            use: [
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true //编译更快
                    }
                },
                'less-loader'
            ]
        })
    });
    config.plugins.push(
        new ExtractPlugin('styles.[chunkhash:8].css')
    )
}

module.exports = config;