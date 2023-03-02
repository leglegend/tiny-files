# tiny-files
一款自动压缩图片的插件
## 介绍
`tiny-files`能够在图片资源提交到代码库之前自动将资源进行压缩，配合lint-stage，将压缩融入到工作流程中
## 安装
```
npm i tiny-files -D
```
## 使用
需要先安装`lint-staged`，然后在int-staged.config.js添加一条：
``` js
// lint-staged.config.js
module.exports = {
  '*.{png,jpg,jpeg}': 'tiny-files --key yourKey',
}
```
或在package.json中配置：
```json
{
  "lint-staged": {
    "*.{png,jpg,jpeg}": "tiny-files --key yourKey"
  }
}
```
或直接通过命令行进行压缩：
```
npx tiny-files --key yourKey imagePath1 imagePath2
```
## 申请key
可在[tinypng官网](https://tinypng.com/developers)申请key，每月可免费压缩500个图片
