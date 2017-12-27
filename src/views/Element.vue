<template>
  <div class="container">
    <div class="card mb-3">
      <div class="card-body">
        <h4 class="mt-3">
          <b>Element-UI 2</b>
        </h4>
        <hr>

        <p>详见 Element-UI 官网：
          <a href="http://element-cn.eleme.io/#/zh-CN">Element-UI 2
            <i class="fa fa-external-link"></i>
          </a>
        </p>

        <h5 class="font-weight-bold">修改默认样式</h5>
        <p>修改变量值，并在
          <code>Element-UI</code> 引入之前引入，变量后不能加
          <code>!default</code> 标识</p>
        <pre class="border rounded bg-light">

          /* 改变主题色变量 */
          $--color-primary: teal;
          
          /* 改变 icon 字体路径变量，必需 */
          $--font-path: '~element-ui/lib/theme-chalk/fonts';
          
          @import "~element-ui/packages/theme-chalk/src/index";
        </pre>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {

    },

    props: {

    },

    data() {
      return {

      }
    },

    computed: {

    },

    watch: {

    },

    created() {

    },

    mounted() {

    },

    methods: {

    }
  }
</script>

<style scoped>


</style>
