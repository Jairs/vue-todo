const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = {
    target: 'web',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
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
            test: /\.less$/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true //编译更快
                    }
                },
                'less-loader'
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
}

module.exports = config;