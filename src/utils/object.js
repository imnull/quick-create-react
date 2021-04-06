const isObject = v => Object.prototype.toString.call(v) === '[object Object]'
const isArray = v => Array.isArray(v)

const merge = (a, b, trap = []) => {
    if(isObject(a) && isObject(b)) {
        if(trap.indexOf(b) > -1 || trap.indexOf(a) > -1) {
            return {}
        }
        trap.push(a, b)
        return Array.from(new Set([ ...Object.keys(a), ...Object.keys(b) ])).map(k => {
            return { [k]: merge(a[k], b[k], trap) }
        }).reduce((r, v) => ({ ...r, ...v }), {})
    } else if(isArray(a) && isArray(b)) {
        if(trap.indexOf(b) > -1 || trap.indexOf(a) > -1) {
            return []
        }
        trap.push(a, b)
        const c = [], len = Math.max(a.length, b.length)
        for(let i = 0; i < len; i++) {
            c.push(merge(a[i], b[i], trap))
        }
        return c
    } else {
        return typeof b === 'undefined' ? a : b
    }
}

module.exports = {
    merge,
}