const { writeFile } = require('./utils/io')
const { merge } = require('./utils//object')
const requireConfig = require('./utils/require-config')

const fs = require('fs')
const loader = requireConfig('loader')
const plugin = requireConfig('plugin')
const react = requireConfig('react')
const webpack = requireConfig('webpack')

const json = o => JSON.stringify(o, null, '    ')

const gen = ({ name = '', version = '1.0.0', description = '', main = 'dist/index.js', keywords = '', chunk = false } ) => {
    const packageJson = {
        name,
        version,
        description,
        main,
        scripts: {
            dev: 'webpack serve --config=cfg/dev.js',
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
    return packageJson
}

const write = (options) => (filename) => {
    writeFile(filename, json(gen(options)))
}

const update = (options) => (filename) => {
    if(!fs.existsSync(filename)) {
        writeFile(filename, json(gen(options)))
    } else {
        const content = fs.readFileSync(filename, 'utf-8')
        const oriPackage = JSON.parse(content)
        const newPackage = gen(options)
        writeFile(filename, json(merge(oriPackage, newPackage)))
    }
}

module.exports = { write, gen, update }
