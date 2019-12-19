<template>
    <div class="pay"
         v-if="show"
    >
      <!--    标题框-->
      <div class="content"
           v-if="forgetPassword"
      >
        <header class="pay-title">
          <div
              class="icon-back"
              @click="cancel"
          ></div>
          <h3>{{ title }}</h3>
        </header>
        <!--      密码框-->
        <div class="pass-box">
          <ul class="pass-area">
            <li
                class="pass-item"
                :class="{ on: password.length > index }"
                v-for="(item, index) in digit"
                :key="index"
            ></li>
          </ul>
        </div>
        <!--      忘记密码-->
        <div class="forget-pass">
          <div
              class="forget-pass-btn"
              @click="forget"
          >忘记密码
          </div>
        </div>
        <!--      键盘区-->
        <ul class="keyboard">
          <li
              v-for="(item, index) in keyboard"
              :key="index"
              @click="onKeyBoard(index, item)"
              :class="item.del ? item.del:''||item.number==='' ? 'void': ''"
          >
            <p class="num">
              <strong>{{ item.number }}</strong>
            </p>
            <p class="character">{{ item.str }}</p>

          </li>
        </ul>
        <!--加载中状态-->
        <div class="loading-wrap" v-if="payStatus !== 0">
          <div class="loading">
            <!--          加载图标-->
            <img
                src="./images/loading.png"
                class="loading-ico"
                alt=""
                v-if="payStatus === 1"
            />
            <img
                src="./images/success.png"
                class="success-ico"
                alt=""
                v-if="payStatus === 2"
            />
            <!--          加载文字-->
            <p v-if="payStatus === 1">{{ loadingText }}</p>
            <p v-if="payStatus === 2">{{ finishedText }}</p>
          </div>
        </div>
        <!--      支付失败-->
        <div class="pay-fail" v-if="isShowFail">
          <div class="pay-fail-lay">
            <h3 class="title">{{ failTip }}</h3>
            <div class="btns">
              <div
                  @click="reInput"
                  class="cursor"
              >重新输入
              </div>
              <div
                  @click="forget"
                  class="cursor"
              >忘记密码
              </div>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
  export default {
    name: "pay",
    data() {
      return {
        keyboard: [
          {
            number: 1,
            str: ""
          },
          {
            number: 2,
            str: "ABC"
          },
          {
            number: 3,
            str: "DEF"
          },
          {
            number: 4,
            str: "GHI"
          },
          {
            number: 5,
            str: "JKL"
          },
          {
            number: 6,
            str: "MNO"
          },
          {
            number: 7,
            str: "PQRS"
          },
          {
            number: 8,
            str: "TUV"
          },
          {
            number: 9,
            str: "WXYZ"
          },
          {
            number: "",
            str: ""
          },
          {
            number: 0,
            str: ""
          },
          {
            number: "",
            str: "",
            del: "delete"
          }
        ],
        password: "",
        payStatus: 0, //0无状态，1正在支付，2成功
        failTip: "支付密码错误",
        isShowFail: false
      };
    },
    model: {
      prop: "show",
      event: "change"
    },
    props: {
      // 组件的显示隐藏
      show: {
        type: Boolean,
        required: true,
        default: false
      },
      // 支付密码框位数
      digit: {
        type: Number,
        default: 6
      },
      // 弹窗标题
      title: {
        type: String,
        default: "请输入支付密码"
      },
      // 正在支付的文字提示
      loadingText: {
        type: String,
        default: "正在支付"
      },
      // 支付成功的文字提示
      finishedText: {
        type: String,
        default: "支付成功"
      },
      // 支付成功的提示显示时间
      duration: {
        type: Number,
        default: 500
      },
      forgetPassword: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      onKeyBoard(index, key) {
        this.password = (this.password + key.number).slice(0, 6);
        //删除密码
        if (key.del) {
          if (this.password.length === 0) return;
          this.password = this.password.slice(0, this.password.length - 1);
        }
      },
      //取消支付
      cancel() {
        // 支付中不允许取消
        if (this.payStatus === 1) return;
        this.password = "";
        // 恢复支付状态
        this.payStatus = 0;
        //关闭组件，并触发父子组件数据同步
        this.$emit("change", false);
        //  触发父组件close自定义事件
        this.$emit("close");
      },
      forget() {
        this.$emit("forget");
      },
      reInput() {
        this.password = "";
        this.isShowFail = false;
      },
      $success() {
        return new Promise((resolve, reject) => {
          this.payStatus = 2;
          // 待指定间隔后，隐藏整个支付弹窗，并resolve
          setTimeout(() => {
            this.cancel();
            resolve();
          }, this.duration);
          console.log(reject());
        });
      },
      $fail() {
        // tip && typeof tip === "string" && (this.failTip = tip);
        this.payStatus = 0;
        this.isShowFail = true;
      }
    },
    watch: {
      //输入后回调
      password(n, o) {
        o;
        if (n.length === this.digit) {
          this.payStatus = 1;
          this.$emit("input-end", this.password);
        }
      }
    }
  };
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
    font-size: 14px;
  }

  ul,
  li {
    list-style: none;
  }

  .wait {
    height: 300px;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .cursor {
    cursor: pointer;
  }

  .pay {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    max-width: 750px;
    z-index: 998;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column-reverse;
  }

  .content {
    background: #fafafa;
    position: relative;
  }

  .content .pay-title {
    position: relative;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e5e5e5;
  }

  .content .pay-title h3 {
    font-size: 18px;
    font-weight: normal;
    text-align: center;
  }

  .content .icon-back {
    position: absolute;
    left: 0;
    top: 0;
    width: 40px;
    height: 40px;
    background: url(./images/back.png) no-repeat center;
  }

  /* 密码框 */
  .pass-box {
    padding: 0 20px;
  }

  .pass-area {
    display: flex;
    height: 40px;
    margin-top: 20px;
    border: 1px solid #e7e7e7;
    border-radius: 4px;
    background: #fff;
  }

  .pass-area .pass-item {
    position: relative;
    flex: 1;
    border-right: 1px solid #e7e7e7;
  }

  .pass-area .pass-item:last-child {
    border-right: 0;
  }

  .pass-area .pass-item.on::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 8px;
    height: 8px;
    background: #000;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  /* 密码框 */
  .forget-pass {
    padding: 10px 20px 0;
    text-align: right;
  }

  .forget-pass-btn {
    cursor: pointer;
    color: #0083e3;
  }

  /* 键盘区 */
  .keyboard {
    display: flex;
    flex-wrap: wrap;
    margin-top: 65px;
    background: #fff;
  }

  .keyboard li {
    width: 33.3333%;
    height: 45px;
    padding-top: 4px;
    text-align: center;
    border-bottom: 1px solid #b2b2b2;
    border-right: 1px solid #b2b2b2;
    box-sizing: border-box;
    user-select: none;
  }

  .keyboard li .num {
    line-height: 1.2;
    font-size: 18px;
  }

  .keyboard li .character {
    line-height: 1.2;
    font-size: 12px;
  }

  .keyboard li:nth-child(3n) {
    border-right: 0;
  }

  .keyboard li:active, .void {
    background-color: #d1d5db;
  }

  .delete {
    width: 100%;
    height: 100%;
    border-bottom: 0;
    padding-top: 0;
    background: url(./images/delete.png) no-repeat center #d1d5db;

  }

  .delete:active {
    border-bottom: 0;
    background-color: #fff;
  }

  /* 加载中 */
  .loading-wrap {
    position: absolute;
    left: 0;
    top: 40px;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
  }

  .loading-wrap .loading {
    text-align: center;
  }

  .loading-wrap .loading .loading-ico {
    animation: rotate 0.6s linear infinite;
  }

  .loading-wrap .loading p {
    margin-top: 6px;
  }

  @-webkit-keyframes rotate {
    0% {
      transform: rotate(0);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /* 支付失败弹窗 */
  .pay-fail {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    max-width: 750px;
    background: rgba(0, 0, 0, 0.6);
    z-index: 999;
  }

  .pay-fail-lay {
    width: 60%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
  }

  .pay-fail-lay .title {
    line-height: 30px;
    text-align: center;
    font-size: 16px;
    padding: 10px;
  }

  .pay-fail-lay .btns {
    display: flex;
    border-top: 1px solid #f1f1f1;
  }

  .pay-fail-lay .btns div {
    flex: 1;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }

  .pay-fail-lay .btns div:active {
    background: #f3f3f3;
  }

  .pay-fail-lay .btns div:last-child {
    border-left: 1px solid #f1f1f1;
  }
</style>
