<template>
  <div>
    <div class="header">
      <div class="container-fluid">
        <nuxt-link to="/">
          <img src="~assets/images/logo.png" class="logo"/>
          <!--<img src="https://giaohangtietkiem.vn/wp-content/themes/giaohangtk/images/logo.png" style="height: 50px; background: #069255; padding: 0 40px 0 7px; margin-left: -5px;">-->
        </nuxt-link>
        <div class="header-search">
          <input type="text" id="slug" placeholder="Search or jump to (coming soon)">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="19px" height="20px" viewBox="0 0 19 20" style="enable-background:new 0 0 19 20;" xml:space="preserve">
             <path fill="none" stroke="rgba(255,255,255,0.8)" opacity="0.4"
                   d="M3.5,0.5h12c1.7,0,3,1.3,3,3v13c0,1.7-1.3,3-3,3h-12c-1.7,0-3-1.3-3-3v-13C0.5,1.8,1.8,0.5,3.5,0.5z"/>
             <path fill="rgba(255,255,255,0.8)" d="M11.8,6L8,15.1H7.1L10.8,6L11.8,6z"/>
          </svg>
        </div>
      </div>
      <div class="float-right pull-right" v-if="this.$auth.user">
        <div class="user-info">
          Hello, {{this.$auth.user.name}}
          <a @click="logout()">(Thoát)</a>
        </div>

      </div>
    </div>
    <Nuxt/>
  </div>
</template>
<script>
  export default {
    methods: {
      logout() {
        if(this.$auth.loggedIn) {
          this.$auth.logout().then(r => {
            window.location.reload()
          })
        }
      }
    }
  }
</script>
<style>
  body {
    padding-top: 50px;
  }

  .header {
    background-color: #069255;
    height: 50px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9999;
  }

  .header .logo {
    height: 40px;
    margin-top: 5px;
    fill: #FFF;
    display: inline-block;
    float: left;
  }
  .header-search {
    background: hsla(0,0%,100%,.125);
    display: inline-block;
    float: left;
    margin: 11px 0 0 5px;
    padding: 2px 8px 4px 8px;
    border-radius: 3px;
  }
  .header-search input {
    background: transparent;
    border: none;
    margin: 0;
    padding: 0;
    color: #FFF;
    line-height: 20px;
    height: 20px;
    font-size: 14px;
    width: 188px;
  }
  .header-search input:focus {
    outline: none;
  }
  .header-search input:-webkit-autofill,
  .header-search input:-webkit-autofill:hover,
  .header-search input:-webkit-autofill:focus,
  .header-search input:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 40px #FFF inset !important;
    -webkit-text-fill-color: #FFF !important;
  }
  .header-search ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: rgba(255, 255, 255, 0.8);
    opacity: 0.8; /* Firefox */
  }

  .header-search :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: rgba(255, 255, 255, 0.8);
  }

  .header-search ::-ms-input-placeholder { /* Microsoft Edge */
    color: rgba(255, 255, 255, 0.8);
  }

  .user-info {
    line-height: 45px;
    height: 50px;
    padding: 0 10px 0 0;
    color: #FFF;
  }
  .user-info a {
    color: #EEE;
    cursor: pointer;
  }
</style>
