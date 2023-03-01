# tiny-files
commit前自动压缩图片
## 安装
```
qnpm i @q/tiny-files -D
```
## 使用
需要先安装`lint-staged`，然后在int-staged.config.js添加一条：
``` js
// lint-staged.config.js
module.exports = {
  '*.{png,jpg,jpeg}': 'tiny-files --key yourKey',
}
```
或在package.json中配置
```json
// package.json
{
  "lint-staged": {
    "*.{png,jpg,jpeg}": "tiny-files --key yourKey"
  }
}
```
## 申请key
可在[tinypng官网](https://tinypng.com/developers)申请key，每月可免费压缩500个图片
