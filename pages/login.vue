<template>
  <div class="login-section">
    <div class="container">
      <div class="row">
        <div class="col-sm-7">
          <h1>Draft API tool</h1>
          <p>MockAPI is a free tool that helps you create draft API. We have flexible Validator and smart Generator that help you create API very quickly. Response data look like real ;)<br><br>
            When do we need to use MockAPI?<br>
            When you want to create a demo API set before coding it in practice. The mobile team can call this draft API during the Back-end team writing actual
            API.</p>
        </div>
        <div class="col-sm-5">
          <form class="login-form p-4 bg-white text-dark">
            <div class="form-group">
              <label for="username">Your username</label>
              <input type="text" class="form-control" id="username" aria-describedby="usernameHelp"
                     placeholder="GHTK username" v-model="username">
              <small id="usernameHelp" class="form-text text-muted">Please use GHTK.VN account.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
            </div>
            <button type="button" class="btn btn-success col-12 mb-2" @click="login()">Login</button>
            <span class="bg-danger">{{notice}}</span>
            <!--
            <nuxt-link to="/">Create a new account</nuxt-link>
            <nuxt-link to="/" class="float-right">Forgot password?</nuxt-link>
            -->
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    auth: false,
    middleware: ['isLoggedIn'],
    data() {
      return {
        notice: '',
        username: '',
        password: ''
      }
    },
    methods: {
      login() {
        let that = this
        this.$auth.loginWith('laravelJWT', {
          data: {
            email: this.username+"@ghtk.vn",
            password: this.password
          }
        }).then(function() {
          if(that.$auth.loggedIn) {
            window.location.reload()
          } else {
            that.notice = 'Login không thành công';
          }
        })
      }
    }
  }
</script>
<style scoped>
  .login-section {
    color: hsla(0, 0%, 100%, 0.6);
    background: #2b3137 url('~assets/images/simple-codelines.svg') center 10%;
    background-size: cover;
    padding: 120px 0;
  }

  h1 {
    font-size: 50px;
    color: #FFF;
  }

  .login-form {
    border-radius: 5px;
  }
</style>
