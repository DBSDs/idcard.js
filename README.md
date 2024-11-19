---
<div align="center">

Javascript 识别中国身份证ORC,返回识别信息。可用于自动填入表单

[![npm download](https://img.shields.io/npm/dw/idcard.js)](https://www.npmjs.com/package/idcard.js)
[![npm license](https://img.shields.io/npm/l/idcard.js)](https://www.npmjs.com/package/idcard.js)
[![npm type definitions](https://img.shields.io/npm/types/badge-maker)](https://www.npmjs.com/package/idcard.js)

</div>
---

## ✡️ 特性

- 基于本地图像识别 ORC 框架 tesseract.js，免费开源
- 使用 TypeScript 编写，提供完善的类型定义
- 使用原生 javascript Api，支持跨框架使用

## 📦 安装

```bash
// npm
npm install idcard.js --save

//yarn
yarn add idcard.js

// pnpm
pnpm add idcard.js
```

## 🔨 用法

```js
import { recognize } from "idcard.js";

recognize("img/f.png").then((res) => {
  console.log(res, "sss");
});
```

返回结果

```js
{
  address: "山东省滨州市滨城区黄河二路660号2号楼2单元402室";
  birthday: "1969年12月3日";
  cardId: undefined;
  name: "张冬梅";
  nation: undefined;
  sex: "女";
}
```

参数项

| 名称  | 类型      | 默认值    | 说明         |
| ----- | --------- | --------- | ------------ |
| image | imageLike | undefined | 地址/blob 等 |

```ts
type ImageLike =
  | string
  | HTMLImageElement
  | HTMLCanvasElement
  | HTMLVideoElement
  | CanvasRenderingContext2D
  | File
  | Blob
  | ImageData
  | Buffer
  | OffscreenCanvas;
```

返回值

| 名称     | 类型   | 默认值    | 说明                           |
| -------- | ------ | --------- | ------------------------------ |
| address  | string | undefined | 地址                           |
| birthday | string | undefined | 生日 格式：YYYY 年 MM 月 DD 日 |
| cardId   | string | undefined | 身份证号                       |
| name     | string | undefined | 姓名                           |
| nation   | string | undefined | 民族                           |
| sex      | string | undefined | 性别                           |

未识别项或者识别错误项，将会放回 `undefined`

## 👀 线上 Demo

- [在线预览](https://dbsds.github.io/idcard.js/)
