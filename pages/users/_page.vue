<template>
  <div class="container mt-2">
    <div class="row">
      <div class="col-md-12">
        <h1 class="float-left">User manager</h1>
        <nuxt-link :to="{name: 'users-new'}">
          <button class="btn btn-success float-right mt-2">Add new</button>
        </nuxt-link>
      </div>

      <div class="col-md-12">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th>UserID</th>
            <th>Name</th>
            <th>Email</th>
            <th class="text-center">Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(user, user_index) in users">
            <td><nuxt-link :to="{'name': 'users-edit-id', params: {'id': user.id}}">{{user.id}}</nuxt-link></td>
            <td><nuxt-link :to="{'name': 'users-edit-id', params: {'id': user.id}}">{{user.name}}</nuxt-link></td>
            <td>{{user.email}}</td>
            <td class="text-center" style="vertical-align: middle">
              <template v-if="!user.is_super_admin">
                <nuxt-link :to="{'name': 'users-edit-id', params: {'id': user.id}}" class="api-delete-button">
                  <font-awesome-icon icon="edit" class="d-inline-block"/>
                </nuxt-link>
                <span class="d-none d-sm-inline-block">&nbsp;|&nbsp;</span>
                <a href="#" class="api-delete-button" @click="deleteUser(user_index, user.id)">
                  <font-awesome-icon icon="trash" class="d-inline-block"/>
                </a>
              </template>
              <template v-else>-- --</template>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-12 text-center">
        <paginate
          v-model="current_page"
          :page-count="last_page"
          :click-handler="goToPage"
          :prev-text="'Previous'"
          :next-text="'Next'"
          :container-class="'my-pagination'">
        </paginate>
      </div>
    </div>
  </div>
</template>
<script>
  import Paginate from 'vuejs-paginate'

  class User {
    constructor() {
      this.id = 0
      this.email = ""
      this.name = ""
    }
  }

  export default {
    middleware: ['isSuperAdmin'],
    components: {Paginate},
    data() {
      return {
        users: [],
        last_page: 1,
        current_page: 1,
      }
    },
    mounted() {
      this.loadUsers(this.$route.params.page)
    },
    methods: {
      goToPage(page) {
        this.$router.push({name: 'users-page', params: {page: page.toString()}})
      },
      loadUsers(page) {
        this.$axios.get('/users?page=' + page).then(response => {
          if (response.data.status === 'success') {
            this.last_page = response.data.data.last_page
            this.current_page = response.data.data.current_page
            this.users = response.data.data.data
          }
        }).catch(error => {
          alert("Cannot load user list. Press F5 to try again: " + error)
        })
      },
      deleteUser(index, id) {
        if (confirm("Do you really want to delete?")) {
          this.$axios.get('/user/delete/' + id).then(response => {
            if (response.data.status === 'success') {
              this.users.splice(index, 1)
              if (this.users.length === 0 && this.current_page > 1) {
                this.goToPage(this.current_page - 1)
              }
            } else {
              alert(response.data.message)
            }
          }).catch(error => {
            alert("Cannot delete: " + error)
          })
        }
      }
    }
  }
</script>
