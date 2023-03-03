#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const tinify = require('tinify')
const { spawnSync } = require('child_process')

// 获取参数
const args = process.argv.slice(2)
const argsKeyIndex = args.findIndex((arg) => ['-k', '--key'].includes(arg))
const argsKeyValue = argsKeyIndex !== -1 ? args[argsKeyIndex + 1] : undefined

// 读取package.json
const packagePath = path.join(process.cwd(), 'package.json')
const packageContent = fs.readFileSync(packagePath).toString()

let package = {}
eval(`package = ${packageContent}`)

if (!argsKeyValue && (!package.tinyFiles || !package.tinyFiles.key))
  throw Error('tiny-files缺少key')

tinify.key = argsKeyValue || package.tinyFiles.key

// 读取忽略的文件列表
let ignore = []
if (package.tinyFiles && package.tinyFiles.ignore)
  ignore = package.tinyFiles.ignore

// 过滤图片
const files = args.filter((file) => /\.(png|jpg|jpeg)$/.test(file))
if (files.length === 0) {
  process.exit(0)
}

const tasks = []
files.forEach((path) => {
  if (ignore.some((key) => path.includes(key))) return
  tasks.push(tinify.fromFile(path).toFile(path))
})

Promise.all(tasks).then(() => {
  const { status } = spawnSync('git', ['add', ...files])
  process.exit(status)
})
