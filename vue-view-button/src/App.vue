<template>
  <div id="app">
    <h3 class="index-title">模拟密码为：111111</h3>
    <div
        class="submit-btn"
        @click="onShowPay"
    >点击显示支付弹窗
    </div>
    <vpay
        ref="pays"
        v-model="show"
        @close="close"
        @forget="forget"
        @input-end="inputEnd"
    />
  </div>
</template>

<script>
  import vpay from "./../src/lib/vpay/lib/pay";

  export default {
    name: "App",
    data() {
      return {
        show: false,
      };
    },
    components: {
      vpay
    },
    mounted() {
      // document.addEventListener('click', e => {
      //   if (!this.$refs.pays.contains(e.target)) {
      //     this.show = false
      //   }
      // })
    },
    methods: {
      onShowPay() {
        this.show = true;
      },
      forget() {
        console.log("触发forget");
        alert('敬请期待')
        this.show = false
      },
      close() {
        console.log("关闭");
      },
      inputEnd(val) {
        setTimeout(() => {
          if (Number(val) === 111111) {
            // 调用插件的$success方法告知插件支付成功
            // 并且在then方法里面可以写支付成功的回调，例如可以跳转支付结果页面
            this.$refs.pays.$success().then(res => {
              console.log(res, "支付成功");
              this.$router.push("/success");
            });
          } else {
            //  失败
            this.$refs.pays.$fail();
          }
        }, 1000);
      }
    }
  };
</script>

<style>
  .submit-btn {
    cursor: pointer;
}
</style>
