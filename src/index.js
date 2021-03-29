const fs = require('fs')
const path = require('path')
const { Command } = require('commander')
const { isEmptyDir } = require('./utils/io')
const genPackage = require('./gen-package')
const genGitignore = require('./gen-gitignore')
const { copy } = require('./utils/io')

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

        // 写入 package.json
        genPackage.write(options)(path.join(dir, 'package.json'))
        // 写入 .gitignore
        genGitignore.write([])(path.join(dir, '.gitignore'))
        // 写入 webpack.config
        copy(path.resolve(__dirname, './copy'), dir)
    })

program.parse(process.argv);