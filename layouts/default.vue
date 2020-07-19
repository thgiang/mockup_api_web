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
    <div class="footer text-center p-2">
      <div class="container-fluid">
        ©2020 - GiangTH - All right reserved
      </div>
    </div>
  </div>
</template>
<script>
</script>
<style scoped>
  .header {
    background-color: #24292e;
    height: 50px;
  }

  .header .logo {
    width: 50px;
    fill: #FFF;
  }
</style>
