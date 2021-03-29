const path = require('path')
const fs = require('fs')
const requireJson = (moduleName) => {
    let filename = `${path.resolve(__dirname, `../config/${moduleName}`)}`
    if(!/\.json$/.test(filename)) {
        filename = `${filename}.json`
    }
    if(!fs.existsSync(filename)) {
        return {}
    }
    const content = fs.readFileSync(filename, 'utf-8')
    try {
        return JSON.parse(content)
    } catch(ex) {
        return {}
    }
}

module.exports = requireJson