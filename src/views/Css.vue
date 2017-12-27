<template>
  <div class="container">
    <div class="card mb-3">
      <div class="card-body">
        <h4 class="mt-3">
          <b>CSS 样式</b>
        </h4>
        <hr>

        <p>详见 bootstrap 4 官网：
          <a href="https://v4.bootcss.com/">bootstrap 4
            <i class="fa fa-external-link"></i>
          </a>
        </p>

        <h5 class="font-weight-bold">修改默认样式</h5>
        <p>修改变量值，并在
          <code>bootstrap</code> 引入之前引入，变量后不能加
          <code>!default</code> 标识</p>
        <pre class="border rounded bg-light">

          // Your variable overrides
          $primary: green;
          $body-bg: #000;
          $body-color: #111;
          
          // Bootstrap and its default variables
          @import "node_modules/bootstrap/scss/bootstrap";
        </pre>
        <p>该项目只引入了
          <code>bootstarp</code> 的样式，没有引入 js，用原生或element-ui代替。若要引入
          <code>bootstrap</code> 的 js，须再引入
          <code>jquery</code> 和
          <code>popper.js</code>
        </p>

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
