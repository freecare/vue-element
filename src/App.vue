<template>
  <div id="app">
    <div class="text-center">
      <img src="./assets/img/logo.png">
      <h1>{{ msg }}</h1>
    </div>

    <ul class="nav justify-content-center mb-3">
      <li class="nav-item"
          v-for="link in links">
        <router-link class="nav-link"
                     :to="`/${link}`">{{ link }}</router-link>
      </li>
    </ul>

    <transition mode="out-in" name="fade">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app',

    data() {
      return {
        msg: 'Vue Front-end Tempate',
        links: ['Home', 'Build', 'Icon', 'Css', 'ElementUI', '404']
      }
    }
  }
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }

</style>
