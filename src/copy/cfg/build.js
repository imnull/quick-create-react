const path = require('path')

const { resolve, node, rulesForBuild } = require('./base')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        app: path.resolve(__dirname, '../src/index.js')
    },
    output: {
        filename: '[name].[contenthash:4].js',
        path: path.resolve(__dirname, '../build'),
    },
    plugins: [
        new CleanWebpackPlugin({}),
        new HtmlWebpackPlugin({ template: './src/index.html', inject: 'body', }),
    ],
    module: {
        rules: rulesForBuild
    },
    resolve,
    node,
}
