<template>
  <div class="container">
    <div class="card mb-3">
      <div class="card-body">
        <h4 class="mt-3">
          <b>基于 vue-cli 的前端快速构建框架</b>
        </h4>
        <hr>

        <p>基于 vue-cli 构建，集合了 vuex, axios, vue-router, element-ui, font-awesome, bootstrap4(只引入样式) 插件。</p>

        <h5>
          <b>插件列表</b>
        </h5>
        <ul>
          <li>
            <a href="https://cn.vuejs.org/v2/guide/"
               target="_blank">vue</a>
          </li>
          <li>
            <a href="https://vuex.vuejs.org/zh-cn/"
               target="_blank">vuex</a>
          </li>
          <li>
            <a href="https://github.com/axios/axios"
               target="_blank">axios</a>
          </li>
          <li>
            <a href="https://router.vuejs.org/zh-cn/"
               target="_blank">vue-router</a>
          </li>
          <li>
            <a href="http://element-cn.eleme.io/#/zh-CN"
               target="_blank">element-ui 2</a>
          </li>
          <li>
            <a href="http://fontawesome.io/icons/"
               target="_blank">font-awesome</a>
          </li>
          <li>
            <a href="https://v4.bootcss.com/"
               target="_blank">bootstrap 4</a>
          </li>
        </ul>

        <h5>
          <b>主要特性</b>
        </h5>

        <ul>
          <li>js 由 vue-router 分块异步加载
            <code>r => require.ensure([], () => r(require('Component')), 'chunkname')</code>，有效控制首屏加载速度
          </li>
          <li>公用 css 抽取，用 postcss 处理兼容问题，组件样式用 scoped 属性，不污染其他组件样式</li>
          <li>开发模式热加载，默认地址：localhost:8080，端口号在文件
            <code>/build/config/index.js</code> 中修改</li>
          <li>本地代理 ajax 请求，防止AJAX跨域问题，可保持与生产环境的 API 路径一致</li>
          <li>es6 编写代码，浏览器兼容性：IE9+（包括IE9）</li>
        </ul>

        <h5>
          <b>目录结构</b>
        </h5>
        <ul>
          <li><code>build</code> webpack 公用配置目录</li>
          <li><code>config</code> webpack 开发和生产环境的配置，包括 api 代理配置</li>
          <li><code>src</code> 项目所有前端页面的源文件</li>
          <li><code>src/api</code> 接口配置及列表</li>
          <li><code>src/assets</code> 包括 css, 图片，其他js插件等</li>
          <li><code>src/components</code> vue单元组件，不包括页面组件</li>
          <li><code>src/router</code> vue-router 路由配置及列表</li>
          <li><code>src/store</code> vuex 全局状态管理的配置</li>
          <li><code>src/utils</code> 自定义的全局方法，如时间、字符串及业务需要的通用方法</li>
          <li><code>src/views</code> 页面组件，一般一个路由一个组件（根据业务复杂度也可以与components合并）</li>
        </ul>

        <h5>
          <b>构建步骤</b>
        </h5>

        <p class="text-muted">需要 node.js 4+, npm 3+</p>

        <div class="card bg-light">
          <div class="card-body">
            <span class="text-muted"># 安装 npm 依赖包</span>
            <p>npm install</p>

            <span class="text-muted"># 本地开发模式，热加载，本地服务器地址： localhost:8080</span>
            <p>npm start</p>

            <span class="text-muted"># 生产环境的 build 命令</span>
            <p>npm run build</p>
          </div>
        </div>

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
        msg: 'Hello World from HelloWorld Component'
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
