const path = require('path')

const { resolve, node, rulesForDev } = require('./base')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin, HotModuleReplacementPlugin } = require('webpack')

const config = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        app: path.resolve(__dirname, '../src/index.js'),
    },
    output: {
        filename: 'app.[hash:4].js',
        path: path.resolve(__dirname, '../build'),
    },
    plugins: [
        new DefinePlugin({ DEV: true }),
        new HotModuleReplacementPlugin({}),
        new HtmlWebpackPlugin({ template: './src/index.html', inject: 'body', }),
    ],
    devServer: {
        port: 9100,
        hot: true,
    },
    module: {
        rules: rulesForDev
    },
    resolve,
    node,
}

module.exports = config