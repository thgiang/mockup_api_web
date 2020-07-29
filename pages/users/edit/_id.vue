<template>
  <div class="container mt-2">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="float-left">Edit user</h1>
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
                <input type="text" class="form-control" id="name" placeholder="Real name" v-model="user.name" v-on:keyup.enter="save">
              </div>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <div class="input-group mb-2 mr-sm-2">
                <input type="email" class="form-control" id="email" placeholder="yourname@email.com" disabled v-model="user.email">
              </div>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="text" class="form-control" id="password" placeholder="" v-model="user.password" v-on:keyup.enter="save">
              <small class="text-muted">Leave this blank if you dont want to change password</small>
            </div>
          </div>
          <span class="text-danger">{{notice}}</span>
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
    data() {
      return {
        notice: '',
        user: new User(),
      }
    },
    mounted() {
      if(!this.$auth.user.is_super_admin && this.$auth.user.id !== this.$route.params.id) {
        this.$router.push({name: 'index'});
      }
      this.$axios.get('user/'+this.$route.params.id).then(response => {
        if (response.data.status === "success") {
         this.user = response.data.data
        } else {
          this.$notify({
            group: 'notification',
            title: 'Error',
            type: 'error',
            duration: 5000,
            position: 'top right',
            text: response.data.message
          });
          this.$router.push('/')
        }
      }).catch(error => {
        alert("Get error: " + error)
      })
    },
    methods: {
      save() {
        if(this.user.name === '' || this.user.email === '') {
          this.$notify({
            group: 'notification',
            title: 'Error',
            type: 'error',
            duration: 5000,
            position: 'top right',
            text: "Email, name are required"
          });
          return;
        }
        let sendData = {"id": this.user.id, "email": this.user.email, "name": this.user.name, "password": this.user.password}
        this.$axios.post('user/save', sendData).then(response => {
          if (response.data.status === "success") {
            this.$notify({
              group: 'notification',
              title: 'Done',
              type: 'success',
              duration: 5000,
              position: 'top right',
              text: 'User saved'
            });
            if(sendData.password !== '' && this.$auth.user.id === this.user.id) {
              this.$auth.logout().then(() => {
                this.$router.push({name: 'login'})
              })
            }
            //this.$router.push({'name': 'users-page', params: {'page': '1'}})
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
          this.$notify({
            group: 'notification',
            title: 'Error',
            type: 'error',
            duration: 5000,
            position: 'top right',
            text: "Save error: " + error
          });
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
