const resolve = {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: { },
}

const node = { }

const rulesForBuild = [
    {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
    },
    {
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader',
            'css-min-loader',
        ],
        exclude: /node_modules/,
    },
    {
        test: /\.less$/i,
        use: [
            'style-loader',
            'css-loader',
            'css-min-loader',
            {
                loader: 'less-loader',
                options: {
                    lessOptions: {
                        javascriptEnabled: true,
                        // strictMath: true,
                    }
                },
            }
        ],
    },
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-react'],
                plugins: [
                    '@babel/plugin-transform-runtime',
                    ['import', {
                        libraryName: 'antd',
                        libraryDirectory: 'es',
                        style: true // `style: true` 会加载 less 文件
                    }, 'antd-import'],
                ],
            }
        }
    },
]

const rulesForDev = [
    {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
    },
    {
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader',
        ],
        exclude: /node_modules/,
    },
    {
        test: /\.less$/i,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'less-loader',
                options: {
                    lessOptions: {
                        javascriptEnabled: true,
                        // strictMath: true,
                    }
                },
            }
        ],
    },
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-react'],
                plugins: [
                    '@babel/plugin-transform-runtime',
                    ['import', {
                        libraryName: 'antd',
                        libraryDirectory: 'es',
                        style: true // `style: true` 会加载 less 文件
                    }, 'antd-import'],
                ],
            }
        }
    },
]

module.exports = {
    resolve,
    node,
    rulesForBuild,
    rulesForDev,
}