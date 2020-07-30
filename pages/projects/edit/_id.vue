<template>
  <div class="container mt-2">
    <div class="row">
      <div class="col-md-3">
        <div class="sidebar-options mt-2">
          <ul>
            <li :class="{active: tab === 'info'}" @click="()=>{tab = 'info';title='Project options'}"><a>Project options</a></li>
            <li :class="{active: tab === 'access'}" @click="()=>{tab = 'access';title='Manage access'}"><a>Manage
              access</a></li>
          </ul>
        </div>
      </div>
      <div class="col-md-9">
        <h1 class="float-left">{{title}}</h1>
        <button type="button" class="mt-2 btn btn-outline-dark col-md-1 col-6 float-right"
                @click="() => {$router.back()}">Back
        </button>
        <div class="clearfix"></div>
        <template v-if="tab === 'info'">
          <div class="form-row">
            <div class="form-group col-md-12">
              <label for="name"><strong>Project name</strong></label>
              <div class="input-group mb-2 mr-sm-2"
                   :class="{nameError: (!name.available && name.notice !== ''), nameSuccess: name.available}">
                <input type="text" class="form-control" id="name" placeholder="a-zA-Z0-9" v-model="project.name"
                       @blur="validateName" disabled>
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span v-if="name.available" style="width: 15px; color: green">✓</span>
                    <span v-else style="width: 15px;" @click="() => {this.name = ''}">×</span>
                  </div>
                </div>
              </div>
              <small class="form-text text-muted" v-if="name.notice !== ''">{{name.notice}}</small>
            </div>
          </div>
          <div class="form-group">
            <label for="description"><strong>Project description</strong></label>
            <textarea class="form-control" id="description" placeholder="Detail description" rows="5"
                      v-model="project.description"></textarea>
          </div>
          <div class="form-group">
            <div class="pb-2"><strong>Visibility Level</strong></div>
            <div class="form-group visibility-level-setting">
              <div class="form-check">
                <input class="form-check-input" type="radio" value="0" id="project_visibility_level_0" v-model="project.visibility">
                <label class="form-check-label" for="project_visibility_level_0">
                  <font-awesome-icon icon="lock" class="d-inline-block" />
                  <div class="option-title d-inline-block pl-1">Private</div>
                  <div class="option-description text-muted">
                    Project access must be granted explicitly to each user.
                  </div>
                </label>
              </div>
              <div class="form-check pt-1">
                <input class="form-check-input" type="radio" value="10" id="project_visibility_level_10" v-model="project.visibility">
                <label class="form-check-label" for="project_visibility_level_10">
                  <font-awesome-icon icon="user-shield" class="d-inline-block" />
                  <div class="option-title d-inline-block pl-1">Internal</div>
                  <div class="option-description text-muted">
                    The project can be accessed by any logged in user.
                  </div>
                </label>
              </div>
            </div>
          </div>
          <button type="button" class="btn btn-success col-sm-2" @click="save">Save</button>
        </template>
        <template v-else-if="tab === 'access'">
          <table class="table table-bordered">
            <thead>
            <tr>
              <th style="width: 40%">Email</th>
              <th style="width: 35%">Role</th>
              <th class="text-center" style="width: 25%">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr style="background: #f3f3f3">
              <td>
                <input class="form-control" type="email" v-model="new_access.email" placeholder="Email address"/>
              </td>
              <td>
                <select class="form-control" v-model="new_access.role">
                  <option value="GUEST">Guest</option>
                  <option value="DEVELOPER">Developer</option>
                </select>
              </td>
              <td class="text-center">
                <button class="btn btn-success" @click="saveAccess">{{access_action}}</button>
                <button class="btn btn-outline-secondary" @click="cancelAccessForm">Reset</button>
              </td>
            </tr>
            <tr v-for="(access, access_index) in accesses" v-if="access.user">
              <td>{{access.user.email}}</td>
              <td>{{access.role}}</td>
              <td class="text-center">
                <span style="cursor: pointer" @click="editAccess(access)">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
                       x="0px"
                       y="0px" width="15px" height="15px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000"
                       xml:space="preserve">
                    <path
                      d="M968.161,31.839c36.456,36.456,36.396,95.547,0,132.003l-43.991,43.991L792.138,75.83l43.991-43.991  C872.583-4.586,931.704-4.617,968.161,31.839z M308.238,559.79l-43.96,175.963l175.963-43.991l439.938-439.938L748.147,119.821  L308.238,559.79z M746.627,473.387v402.175H124.438V253.373h402.204l124.407-124.438H0V1000h871.064V348.918L746.627,473.387z"/>
                  </svg>
                </span>
                <span class="d-none d-sm-inline-block">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <span class="api-delete-button" @click="deleteAccess(access_index, access.user.id)">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill"
                       fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd"
                                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                  </svg>
                </span>
              </td>
            </tr>
            </tbody>
          </table>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        access_action: 'Add',
        tab: 'info',
        title: 'Project option',
        name: {available: true, notice: ''},
        project: {'id': 0, 'name': "", 'description': "", 'visibility': 0},
        original: {},
        new_access: {email: '', role: 'GUEST'},
        accesses: []
      }
    },
    mounted() {
      this.$axios.get('project/' + this.$route.params.id).then(response => {
        if (response.data.status === "success") {
          this.original = response.data.data
          this.project = response.data.data
        } else {
          this.$notify({
            group: 'notification',
            title: 'Error',
            type: 'error',
            duration: 5000,
            position: 'top right',
            text: response.data.message
          });
          this.$router.push({name: 'projects-page', params: {page: 1}})
        }
      }).catch(error => {
        alert("Get error: " + error)
      })

      this.$axios.get('project/who_has_access/' + this.$route.params.id).then(response => {
        if (response.data.status === "success") {
          this.accesses = response.data.data
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
        alert("Get error: " + error)
      })
    },
    methods: {
      cancelAccessForm() {
        this.new_access = {email: '', role: 'GUEST'}
        this.access_action = 'Add'
      },
      editAccess(access) {
        this.new_access.email = access.user.email
        this.new_access.role = access.role
        this.access_action = 'Save'
      },
      deleteAccess(access_index, user_id) {
        this.$axios.get('project/delete_access/' + this.$route.params.id + '/' + user_id).then(response => {
          if (response.data.status === "success") {
            this.accesses = response.data.data
            this.$notify({
              group: 'notification',
              title: 'Done',
              type: 'success',
              duration: 5000,
              position: 'top right',
              text: "Deleted"
            });

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
          alert("Get error: " + error)
        })
      },
      validateName() {
        let str = this.project.name;
        if (str === '') {
          this.name.notice = ''
          this.name.available = false
          return;
        }

        if (this.project.name === this.original.name) {
          this.name.notice = ''
          this.name.available = true
          return;
        }

        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        let from = "àáảãạăäâấầẩẫậắằẳẵặẻẽẹềếểễệèéëêỉĩịìíïîỏõọồốổỗộơờớởỡợòóöôủũụùúüûñç·/,:;";
        let to = "aaaaaaaaaaaaaaaaaaeeeeeeeeeeeeiiiiiiiooooooooooooooooooouuuuuuunc-----";
        for (let i = 0, l = from.length; i < l; i++) {
          str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
        str = str.replace(/[^a-z0-9 -_.]/g, '') // remove invalid chars
          .replace(/\s+/g, '-') // collapse whitespace and replace by -
          .replace(/-+/g, '-'); // collapse dashes

        this.project.name = str;

        this.$axios.get('project_by_name/' + str).then(response => {
          if (response.data.status === "error") {
            this.name.notice = ''
            this.name.available = true
          } else {
            this.name.notice = 'This name is used, please choose a new once'
            this.name.available = false
          }
          this.$forceUpdate()
        }).catch(error => {
          alert("Error when check name name: " + error)
        })
      },
      save() {
        let sendData = {"project": this.project}
        if (sendData.project.name === '' || sendData.project.description === '' || sendData.project.visibility === '') {
          this.$notify({
            group: 'notification',
            title: 'Error',
            type: 'error',
            duration: 5000,
            position: 'top right',
            text: "Name, description and visibility are required"
          });
          return;
        }
        this.$axios.post('project/save', sendData).then(response => {
          if (response.data.status === "success") {
            this.$notify({
              group: 'notification',
              title: 'Successfully',
              type: 'success',
              duration: 5000,
              position: 'top right',
              text: 'Project saved'
            });

            //this.$router.push({'name': 'projects-page', params: {page: '1'}})
          } else {
            this.$notify({
              group: 'notification',
              title: 'Error',
              duration: 5000,
              type: 'error',
              position: 'top right',
              text: response.data.message
            });
          }
        }).catch(error => {
          alert("Save error: " + error)
        })
      },
      saveAccess() {
        let sendData = this.new_access
        sendData.project_id = this.project.id
        if (sendData.email === '' || sendData.role === '') {
          this.$notify({
            group: 'notification',
            title: 'Error',
            type: 'error',
            duration: 5000,
            position: 'top right',
            text: "Email and role are required"
          });
          return;
        }
        this.$axios.post('project/give_access', sendData).then(response => {
          if (response.data.status === "success") {
            this.$notify({
              group: 'notification',
              title: 'Successfully',
              type: 'success',
              duration: 5000,
              position: 'top right',
              text: 'Access granted successfully'
            });
            this.accesses = this.accesses.filter(a => a.user.email !== response.data.data.user.email)
            this.accesses.unshift(response.data.data)
            this.cancelAccessForm()
          } else {
            this.$notify({
              group: 'notification',
              title: 'Error',
              duration: 5000,
              type: 'error',
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

  .api-delete-button {
    cursor: pointer;
  }
</style>
