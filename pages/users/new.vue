<template>
  <div class="container mt-2">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="float-left">Create new user</h1>
        <button type="button" class="mt-2 btn btn-outline-dark col-6 col-md-1 float-right" @click="() => {$router.back()}">Back</button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <form>
          <div class="form">
            <div class="form-group">
              <label for="name">Real name</label>
              <div class="input-group mb-2 mr-sm-2">
                <input type="text" class="form-control" id="name" v-on:keyup.enter="save" placeholder="Real name" v-model="user.name">
              </div>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <div class="input-group mb-2 mr-sm-2">
                <input type="email" class="form-control" id="email" v-on:keyup.enter="save" placeholder="yourname@email.com" v-model="user.email">
              </div>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="text" class="form-control" v-on:keyup.enter="save" id="password" placeholder="" v-model="user.password">
            </div>
          </div>
          <button type="button" class="btn btn-success col-sm-2" @click="save">Save</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  class User {
    constructor() {
      this.id = 0
      this.email = ""
      this.name = ""
      this.password =  ""
    }
  }

  export default {
    middleware: ['isSuperAdmin'],
    data() {
      return {
        user: new User(),
      }
    },
    methods: {
      save() {
        if(this.user.name === '' || this.user.email === '' || this.user.password === '') {
          this.$notify({
            group: 'notification',
            title: 'Error',
            type: 'error',
            duration: 5000,
            position: 'top right',
            text: 'Email, name and password are required'
          });
          return;
        }
        let sendData = {"email": this.user.email, "name": this.user.name, "password": this.user.password}
        this.$axios.post('user/save', sendData).then(response => {
          if (response.data.status === "success") {
            this.$notify({
              group: 'notification',
              title: 'Done',
              type: 'success',
              duration: 5000,
              position: 'top right',
              text: 'User created'
            });
            this.$router.push({'name': 'users-page', params: {'page': '1'}})
          } else {
            this.$notify({
              group: 'notification',
              title: 'Error',
              type: 'error',
              duration: 5000,
              position: 'top right',
              text: response.data.message
            });
          }
        }).catch(error => {
          alert("Save error: " + error)
        })
      }
    }
  }
</script>
<style>
  .nameError input {
    border-color: #ff6d6d !important;
  }

  .nameError .input-group-text {
    border-color: #ff6d6d !important;
    background: #ff6d6d !important;
    color: #FFF;
  }

</style>
