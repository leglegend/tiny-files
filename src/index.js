#!/usr/bin/env node

const tinify = require('tinify')
const { spawnSync } = require('child_process')

// 获取参数
const args = process.argv.slice(2)
const argsKeyIndex = args.findIndex((arg) => ['-k', '--key'].includes(arg))
const argsKeyValue = argsKeyIndex !== -1 ? args[argsKeyIndex + 1] : undefined

if (!argsKeyValue) throw Error('tiny-files缺少key')

tinify.key = argsKeyValue

// 过滤图片
const files = args.filter((file) => /\.(png|jpg|jpeg)$/.test(file))
if (files.length === 0) {
  process.exit(0)
}

const tasks = []
files.forEach((path) => {
  tasks.push(tinify.fromFile(path).toFile(path))
})

Promise.all(tasks).then(() => {
  const { status } = spawnSync('git', ['add', ...files])
  process.exit(status)
})
