const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const mode = 'production'
// const devtool = 'source-map'
const devtool = 'none'
const entry = { app: path.resolve(__dirname, './src/index.js') }
const output = {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist'),
}
const plugins = [
    new CleanWebpackPlugin({}),
]
const resolve = {
    extensions: ['.tsx', '.jsx', '.ts', '.js'],
    alias: { },
}
const _module = {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules|src\/copy|src\/config/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react'],
                }
            }
        }
    ]
}

const node = {
    fs: 'empty',
    child_process: 'empty',
}

const config = {
    mode,
    devtool,
    entry,
    output,
    plugins,
    resolve,
    module: _module,
    node,
}

module.exports = config
