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
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                     placeholder="Enter email">
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
            <button type="submit" class="btn btn-success col-12 mb-2">Login</button>
            <nuxt-link to="/">Create a new account</nuxt-link>
            <nuxt-link to="/" class="float-right">Forgot password?</nuxt-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {}
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
