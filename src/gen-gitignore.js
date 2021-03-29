const { writeFile } = require('./utils/io')

const gen = (lines) => {
    return [
        'node_modules',
        'demo',
        'dist',
        'package-lock.json',
        '.DS_Store',
        ...lines
    ].join('\n')
}

const write = (lines) => (filename) => {
    writeFile(filename, gen(lines))
}

module.exports = { gen, write }