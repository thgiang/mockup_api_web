<template>
  <div>
    <div class="header">
      <div class="container-fluid">
        <nuxt-link to="/">
         <Logo/>
          <!--<img src="https://giaohangtietkiem.vn/wp-content/themes/giaohangtk/images/logo.png" style="height: 50px; background: #069255; padding: 0 40px 0 7px; margin-left: -5px;">-->
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
