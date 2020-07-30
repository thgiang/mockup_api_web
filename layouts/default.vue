<template>
  <div>
    <div class="header">
      <div class="container-fluid">
        <div class="float-left">
          <div class="logo-group">
            <nuxt-link to="/">
              <img src="~assets/images/logo.png" class="logo"/>
              <span class="d-none d-sm-inline-block"
                    style="padding-left: 5px; color: #FFF; line-height: 50px; font-size: 20px;">GHTK MOCK API</span>
            </nuxt-link>
          </div>
          <ul class="header-menu" v-if="this.$auth.user">
            <li><nuxt-link :to="{name: 'projects-page', params: {page: '1'}}">Projects</nuxt-link></li>
            <template v-if="this.$auth.user.is_super_admin">
              <li><nuxt-link :to="{name: 'users-page', params: {page: '1'}}">Users</nuxt-link></li>
            </template>
          </ul>

          <!--
          <div class="header-search">
            <input type="text" id="slug" placeholder="Search or jump to (coming soon)">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="19px" height="20px" viewBox="0 0 19 20" style="enable-background:new 0 0 19 20;" xml:space="preserve">
               <path fill="none" stroke="rgba(255,255,255,0.8)" opacity="0.4"
                     d="M3.5,0.5h12c1.7,0,3,1.3,3,3v13c0,1.7-1.3,3-3,3h-12c-1.7,0-3-1.3-3-3v-13C0.5,1.8,1.8,0.5,3.5,0.5z"/>
               <path fill="rgba(255,255,255,0.8)" d="M11.8,6L8,15.1H7.1L10.8,6L11.8,6z"/>
            </svg>
          </div>
          -->
        </div>
        <div class="float-right pull-right" v-if="this.$auth.user">
          <div>

            <b-dropdown id="dropdown-user-profile" variant="outline-success" class="mt-1 dropdown-user-profile">
              <template v-slot:button-content>
                <div class="user-info float-left">
                  <img src="~assets/images/avatar.jpg" class="avatar">
                  Hi, {{$auth.user.name}}
                </div>
              </template>
              <b-dropdown-item><nuxt-link :to="{name: 'users-edit-id', params: {id: this.$auth.user.id}}">Your Profile</nuxt-link></b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item @click="logout()">Logout</b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </div>
    </div>
    <Nuxt/>
    <notifications class="custom-notification-top" group="notification" position="top right"/>
  </div>
</template>
<script>
  export default {
    methods: {
      logout() {
        if (this.$auth.loggedIn) {
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

  .custom-notification-top {
    margin-top: 60px;
  }

  .vue-notification.success {
    background: #069255!important;
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

  .logo-group {
    float: left;
    display: inline-block;
  }
  .header-search {
    background: hsla(0, 0%, 100%, .125);
    display: inline-block;
    float: left;
    margin: 11px 0 0 5px;
    padding: 2px 8px 4px 8px;
    border-radius: 3px;
  }

  .header-menu {
    padding: 0;
    list-style: none;
    display: inline-block;
    line-height: 50px;
    padding-left: 30px;
  }
  .header-menu li {
    display: inline-block;
    padding: 0 10px;
  }
  .header-menu li a {
    color: #FFF;
  }
  .header-menu li a:hover {
    color: #EEE;
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
  .header-search input:-webkit-autofill:active {
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
    color: #FFF;
  }
  .user-info {
    color: #FFF;
  }

  .user-info a {
    color: #EEE;
    cursor: pointer;
  }
  .dropdown-user-profile button {
    line-height: 30px;
  }
  .dropdown-user-profile .dropdown-toggle::after {
    color: #FFF;
  }
  .dropdown-user-profile button:hover, .dropdown-user-profile button:focus, .dropdown-user-profile button:active {
    border-color: transparent!important;;
    outline: 0!important;
    box-shadow: none!important;;
  }
  .dropdown-user-profile .dropdown-menu {
    right: 0!important;
    border-radius: 0;
  }
  .dropdown-user-profile a {
    color: #000;
  }
  .dropdown-user-profile a:focus {
    color: #FFF;
  }
  .avatar {
    height: 30px;
    border-radius: 50%;
    border: 1px solid #006e3e;
    float: left;
    margin-right: 5px;
  }
  .btn-outline-success:not(:disabled):not(.disabled):active, .btn-outline-success:not(:disabled):not(.disabled).active, .show > .btn-outline-success.dropdown-toggle {
    background: #069255;
    border-color: transparent;
    outline: 0;
    box-shadow: none;
  }
  .dropdown-item.active, .dropdown-item:active {
    background: #069255;
  }
</style>
