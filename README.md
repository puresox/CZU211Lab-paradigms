# paradigms

使用 electron 编写的博睿康设备兼容的 SSVEP 范式

1. 装 Neusen-W
2. 装驱动

## SSVEP

本实验共五轮，每轮实验包括 10 秒时长的屏幕黑白闪烁和 5 秒的休息时间。五轮实验的屏幕黑白闪烁频率分别为 7.5Hz,10Hz,12Hz,15Hz,20Hz。实验过程中被试被要求避免眨眼，每轮试验中间的休息时间被试可以进行眨眼休息。![](https://bit-images.bj.bcebos.com/bit-new/file/20210407/rss7.png)

| 打标 | 说明  |
| ---- | ----- |
| 1    | 7.5Hz |
| 2    | 10Hz  |
| 3    | 12Hz  |
| 4    | 15Hz  |
| 5    | 20Hz  |

## SSVEP1

本实验共 40 轮，屏幕分成四份，每一轮开始时会在左上、右上、左下、右下出现十字，随后盯着十字所在区域的方形看 5s，休息 5s，左上、右上、左下、右下的方形频率分别为 7.5Hz,8.57Hz,10Hz,12Hz。

## MI

本实验共五轮，每轮八次试验，每次试验包括 2 秒的准备时间和 2 秒的正式试验，试验开始后，屏幕中心会出现一个十字（2s），接下来会出现一个箭头（左箭头或右箭头），用户根据箭头指示方向进行运动想象（2s）。实验过程中被试被要求避免眨眼，每轮试验中间有 10s 的实验间隔，被试可以进行眨眼休息。共 40 次试验，左右箭头出现次数均为 20 次，出现次序随机。[![1.png](https://bit-images.bj.bcebos.com/bit-new/file/20210407/ny21.png)](https://bit-images.bj.bcebos.com/bit-new/file/20210407/ny21.png)

| 打标 | 说明 |
| ---- | ---- |
| 1    | 左   |
| 2    | 右   |

## 通讯 api

格式：JSON

1. 连接

request

```json
{
  "type": "connect",
  "data": "SSVEP"
}
```

| 字段 | 值        | 说明           |
| ---- | --------- | -------------- |
| type | connect   | 连接           |
| data | SSVEP、MI | 当前运行的范式 |

respond

```json
{
  "success": "1"
}
```

2. 开始

request

```json
{
  "type": "start"
}
```

| 字段 | 值    | 说明 |
| ---- | ----- | ---- |
| type | start | 开始 |

respond

```json
{
  "success": "1",
  "data": "brief"
}
```

3. 发送当前频率

request

```json
{
  "type": "frequency",
  "data": "12.5"
}
```

| 字段 | 值          | 说明   |
| ---- | ----------- | ------ |
| type | frequency   | 频率   |
| data | 类似于 12.5 | 频率值 |

respond

```json
{
  "success": "1"
}
```

4. 获取结果

request

```json
{
  "type": "getResult"
}
```

| 字段 | 值        | 说明     |
| ---- | --------- | -------- |
| type | getResult | 获取结果 |

respond

```json
{
  "success": "1",
  "data": ""
}
```

| 字段    | 值          | 说明                       |
| ------- | ----------- | -------------------------- |
| success | 0、1        | 0 表示没结果，1 表示有结果 |
| data    | 类似于 12.5 | 频率值                     |

5. 结束

request

```json
{
  "type": "end"
}
```

| 字段 | 值  | 说明 |
| ---- | --- | ---- |
| type | end | 结束 |

respond

```json
{
  "success": "1"
}
```
