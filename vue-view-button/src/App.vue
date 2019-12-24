<template>
  <div id="app">
    <h3 class="index-title">默认密码为：111111</h3>
    <button
        class="submit-btn"
        @click="onShowPay"
    >支付
    </button>
    <vpay
        ref="pays"
        v-model="show"
        :forward="forward"
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
        forward: false
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
        this.forward = true
        setTimeout(() => {
          this.forward = false
          // this.show = false
        }, 2000)
      },
      close() {

      },
      inputEnd(val) {
        setTimeout(() => {
          if (Number(val) === 111111) {
            // 调用插件的$success方法告知插件支付成功
            // 并且在then方法里面可以写支付成功的回调，例如可以跳转支付结果页面
            this.$refs.pays.$success().then(res => {
              console.log(res)
            });
          } else {
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
