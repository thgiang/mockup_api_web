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
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
                       x="0px"
                       y="0px" width="15px" height="15px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000"
                       xml:space="preserve">
                  <path
                    d="M968.161,31.839c36.456,36.456,36.396,95.547,0,132.003l-43.991,43.991L792.138,75.83l43.991-43.991  C872.583-4.586,931.704-4.617,968.161,31.839z M308.238,559.79l-43.96,175.963l175.963-43.991l439.938-439.938L748.147,119.821  L308.238,559.79z M746.627,473.387v402.175H124.438V253.373h402.204l124.407-124.438H0V1000h871.064V348.918L746.627,473.387z"/>
                </svg>
                </nuxt-link>
                <span class="d-none d-sm-inline-block">|</span>
                <span class="api-delete-button" @click="deleteUser(user_index, user.id)">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill"
                       fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd"
                                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                  </svg>
                </span>
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
          :prev-text="'Previos'"
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
