
#### 使用说明


| 事件名   |      说明      |  参数 |
|----------|:-------------:|------:|
| input-end | 密码输入完成后的回调函数 | - |
| close | 密码弹窗关闭后的回调函数 | - |
| forget | 点击忘记密码的回调函数 | - |
| $success | 成功的回调函数 | - |
| $fail | 失败的回调函数 | - |

| 参数   |      说明      |  类型 | 默认值 | 
|----------|:-------------:|------:|------:|
| show | 组件的显示隐藏 | Boolean | false |
| digit | 支付密码框位数 | Number | 6 |
| title | 弹窗标题 | String | 请输入支付密码 |
| loadingText | 正在支付的文字提示 | String | 正在支付 |
| finishedText | 支付成功的文字提示 | String | 支付成功 |
| duration | 支付成功的提示显示时间 | Number | 500 |
| forgetPassword | 是否展示输入框 | Boolean | false |
| forward | 敬请期待 | Boolean | false |