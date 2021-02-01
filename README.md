## es6 

- @babel/core
- babel-loader
- @babel/preset-env
- terser-webpack-plugin

## css

- style-loader
- css-loader
- less
- less-loader
- mini-css-extract-plugin
- optimize-css-asserts-webpack-plugin

## asserts

- url-loader
- file-loader
- image-webpack-loader

## insert to Html

- html-webpack-plugin


## hot reload

- webpack-dev-server

## clean packages

- clean-webpack-plugin

## env

- cross-env

## to typescript

- typescript ts-loader

## to vue

- vue@next
- vue-loader@next
- @vue/complier-sfc

vue2.x should be install vue-template-complier

- vue-router@4
- vuex@next

## vant

- vant@next
- babel-plugin-import ts-import-plugin


## Rem layout

- lib-flexible
- postcss-pxtorem


## to package tip

- friendly-errors-webapck-plugin
- node-notifier

## package file size

- webpack-bundle-analyzer

## steps use time

- speed-measure-webapck5-plugin

## cache

- cache-loader

## Eslint Perttier stylelint EditorConfig

## git message

- commitizen cz-conventional-changelog
- husky @commitlint/config-conventional @commitlint/cli

# CICD

```
let client = require('scp2');
const ora = require('ora');
const chalk = require('chalk');
const spinner = ora(chalk.green('正在发布到服务器...'))

spinner.start()
client.scp('./dist', { // 本地打包的路径
    'host': 'xxx.xxx.x.xxx', // 服务器的IP地址
    'post': '22', // 服务器的IP地址
    'username': 'xxxx', // 用户名
    'password': '*****', // 密码
    'path': '/opt/stu_app_website' // 项目需要部署到服务器的位置
}, err => {
    spinner.stop();
    if(!err) {
        console.log(chalk.green('项目发布完毕'))
    } else {
        console.log('err', err)
    }
})

```