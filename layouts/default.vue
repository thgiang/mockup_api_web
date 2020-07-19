<template>
  <div>
    <div class="header">
      <div class="container-fluid">
        <nuxt-link to="/">
          <Logo/>
        </nuxt-link>
      </div>
    </div>
    <Nuxt/>
  </div>
</template>
<script>
</script>
<style>
  body {
    padding-top: 50px;
  }
  .header {
    background-color: #24292e;
    height: 50px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9999;
  }
  .header .logo {
    width: 40px;
    padding-top: 5px;
    fill: #FFF;
  }
</style>
