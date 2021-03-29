const { writeFile } = require('./utils/io')
const requireConfig = require('./utils/require-config')

const loader = requireConfig('loader')
const plugin = requireConfig('plugin')
const react = requireConfig('react')
const webpack = requireConfig('webpack')

const gen = ({ name = '', version = '1.0.0', description = '', main = 'dist/index.js', keywords = '', chunk = false } ) => {
    const packageJson = {
        name,
        version,
        description,
        main,
        scripts: {
            dev: 'webpack-dev-server --config=cfg/dev.js',
            build: chunk ? 'webpack --config=cfg/build-chunk.js' : 'webpack --config=cfg/build.js',
        },
        repository: {
            type: 'git',
        },
        keywords: keywords.split(/\s*,\s*/).map(s => s.trim()).filter(s => !!s),
        dependencies: {
            ...react,
        },
        devDependencies: {
            ...loader,
            ...plugin,
            ...webpack,
        }
    }
    return JSON.stringify(packageJson, null, '    ')
}

const write = (options) => (filename) => {
    writeFile(filename, gen(options))
}

module.exports = { write, gen }
