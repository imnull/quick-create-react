const path = require('path')
const { Command } = require('commander')
const { isEmptyDir } = require('./utils/io')
const genPackage = require('./gen-package')
const genGitignore = require('./gen-gitignore')
const genTSConfig = require('./gen-tsconfig')
const { copy } = require('./utils/io')

const { execSync } = require('child_process')

const exec = () => {
    const program = new Command()
    program
        .command('init <target>')
        .description('init a react project into a newly directory.')
        .option('-n --name <name>', 'project name')
        .option('-d --description <description>', 'project description')
        .option('-v --version <version>', 'project version')
        .option('-m --main <main>', 'project main')
        .option('-k --keywords <keywords>', 'project keywords')
        .option('-c --chunk', 'project build with chunk')
        .action((target, options) => {
            const dir = path.resolve(process.env.PWD, target)
            if(!isEmptyDir(dir)) {
                console.log(`ERROR: the target is not a empty dir: '${dir}'`)
                return
            }

            if(!options.name) {
                options.name = target
            }

            // 写入 package.json
            genPackage.write(options)(path.join(dir, 'package.json'))
            // 写入 .gitignore
            genGitignore.write([])(path.join(dir, '.gitignore'))
            // 写入 tsconfig.json
            genTSConfig.write()(path.join(dir, 'tsconfig.json'))
            // 写入 webpack.config
            copy(path.resolve(__dirname, './copy'), dir)
        })
    
    program
        .command('update <target>')
        .description('init a react project into a newly directory.')
        .option('-n --name <name>', 'project name')
        .option('-d --description <description>', 'project description')
        .option('-v --version <version>', 'project version')
        .option('-m --main <main>', 'project main')
        .option('-k --keywords <keywords>', 'project keywords')
        .option('-c --chunk', 'project build with chunk')
        .option('-f --force', 'delete `node_modules`')
        .action((target, options) => {
            const dir = path.resolve(process.env.PWD, target)
            if(isEmptyDir(dir)) {
                console.log(`ERROR: the target is empty: '${dir}'`)
                return
            }

            if(!options.name) {
                options.name = target
            }

            if(options.force) {
                execSync(`rm -rf ${path.resolve(dir, './node_modules')}`)
                execSync(`rm ${path.resolve(dir, './package-lock.json')}`)
            }

            // 更新 package.json
            genPackage.update(options)(path.join(dir, 'package.json'))
        })
    program.parse(process.argv)
}

module.exports = exec