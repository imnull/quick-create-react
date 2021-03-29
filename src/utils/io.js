const fs = require('fs')
const path = require('path')
const isEmptyDir = dir => {
    if(!fs.existsSync(dir)) {
        return true
    }
    const names = fs.readdirSync(dir).filter(n => n !== '.' && n !== '..')
    return names.length < 1
}

const writeFile = (filename, content) => {
    const dirname = path.dirname(filename)
    if(!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true })
    }
    fs.writeFileSync(filename, content, { encoding: 'utf-8' })
}

const copy = (sourceDir, targetDir) => {
    if(!fs.existsSync(sourceDir)) {
        return
    }
    const sourceStat = fs.statSync(sourceDir)
    if(sourceStat.isFile()) {
        const dir = path.dirname(targetDir)
        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }
        fs.copyFileSync(sourceDir, targetDir)
    } else if(sourceStat.isDirectory()) {
        const files = fs.readdirSync(sourceDir, { encoding: 'utf-8' }).filter(n => !/^\./.test(n))
        files.forEach(n => copy(path.join(sourceDir, n), path.join(targetDir, n)))
    }
}

module.exports = { isEmptyDir, writeFile, copy }