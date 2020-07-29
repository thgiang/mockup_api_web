<template>
  <div class="container mt-2">
    <div class="row">
      <div class="col-12">
        <h1 class="float-left">Your projects</h1>
        <nuxt-link :to="{name: 'project-new'}">
          <button class="btn btn-success float-right mt-2">Add new</button>
        </nuxt-link>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <p v-if="projects.length === 0">
          No project belongs to you. You can try to  <nuxt-link :to="{name: 'project-new'}">create a new one</nuxt-link>
        </p>
        <table class="table table-bordered mt-2" v-else>
          <thead>
          <tr>
            <th style="width: 25%">Name</th>
            <th style="width: 35%">Versions</th>
            <th style="width: 30%">Description</th>
            <th style="width: 15%" class="text-center">Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(project, project_index) in projects">
            <td>
              <template v-if="project.role !== 'GUEST'">
                <nuxt-link :key="project_index"
                           v-if="typeof project.versions !== 'undefined' && project.versions.length > 0"
                           :to="{name: 'api-project-version', params: {'project': project.name, 'version': project.versions[project.versions.length - 1].name}}">
                  {{project.name}}
                </nuxt-link>
                <span v-else>{{project.name}}</span>
              </template>
              <template v-else>
                <nuxt-link :key="project_index"
                           v-if="typeof project.versions !== 'undefined' && project.versions.length > 0"
                           :to="{name: 'docs-project-version-id', params: {'project': project.name, 'version': project.versions[project.versions.length - 1].name, 'id': '0'}}">
                  {{project.name}}
                </nuxt-link>
                <span v-else>{{project.name}}</span>
              </template>
              <div class="ml-1 project-visibility d-inline-block">
                <template v-if="project.visibility === 0">
                  <font-awesome-icon icon="lock" class="d-inline-block" />
                </template>
                <template v-else-if="project.visibility === 10">
                  <font-awesome-icon icon="user-shield" class="d-inline-block" />
                </template>
              </div>
              <div class="ml-1 project-role d-inline-block">{{project.role}}</div>
            </td>
            <td>
              <div style="float: left; width: calc(100% - 18px)">
                <span v-for="(version, version_index) in project.versions" :key="version_index">
                  <div class="version_group" v-if="project.role === 'DEVELOPER' || project.role === 'LEADER' || project.role === 'OWNER' ||  project.role === 'SUPER'">
                    <nuxt-link
                      :to="{name: 'api-project-version', params: {'project': project.name, 'version': version.name}}">
                      {{version.name}}
                    </nuxt-link>
                    <button @click="deleteVersion(project, version_index, version.id)"  v-if="project.role !== 'DEVELOPER'"
                            class="btn-add-version delete-version-btn">-</button>
                  </div>
                  <template v-else>
                     <nuxt-link
                       :to="{name: 'docs-project-version-id', params: {'project': project.name, 'version': version.name, 'id': '0'}}">
                        {{version.name}}
                     </nuxt-link>
                  </template>
                  <span v-if="version_index < project.versions.length - 1"> &nbsp; </span>
                  </span>
                &nbsp;
              </div>
              <template v-if="project.role === 'LEADER' || project.role === 'OWNER' ||  project.role === 'SUPER'">
                <template v-if="new_version_project_id === project.id">
                  <button @click="closeNewVersionForm" class="btn-add-version add-version-btn-close">×
                  </button>
                </template>
                <template v-else>
                  <button @click="newVersion(project.id)" class="btn-add-version add-version-btn-add">+</button>
                </template>
              </template>
              <div v-if="new_version_project_id === project.id">
                <div class="mt-2 pt-2" style="clear: both">
                  <div class="form-row">
                    <div class="col-sm-5 mb-1">
                      <select class="form-control form-control-sm" v-model="cloneVersionId">
                        <option value="0">Create empty version</option>
                        <option v-for="cloneVersion in project.versions" :value="cloneVersion.id">Copy from
                          {{cloneVersion.name}}
                        </option>
                      </select>
                    </div>
                    <div class="col-sm-5 mb-1">
                      <input type="text" class="form-control form-control-sm" placeholder="New version name"
                             v-model="new_version_name" @keyup="() => {new_version_name = stringToUrl(new_version_name)}" v-on:keyup.enter="saveVersion(project)">
                    </div>
                    <div class="col-sm-2 mb-1">
                      <button type="button" class="btn btn-success btn-sm col-12" @click="saveVersion(project)">
                        OK
                      </button>
                    </div>
                    <small class="form-text text-danger col-12 mb-1" v-if="new_version_error !== ''">{{new_version_error}}</small>
                  </div>
                </div>
              </div>
            </td>
            <td>{{project.description}}</td>
            <td class="text-center" style="vertical-align: middle">
              <template v-if="project.role === 'LEADER' || project.role === 'OWNER' ||  project.role === 'SUPER'">
                <nuxt-link :to="{'name': 'project-edit-id', params: {'id': project.id}}" class="api-delete-button">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
                       x="0px"
                       y="0px" width="15px" height="15px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000"
                       xml:space="preserve">
                  <path
                    d="M968.161,31.839c36.456,36.456,36.396,95.547,0,132.003l-43.991,43.991L792.138,75.83l43.991-43.991  C872.583-4.586,931.704-4.617,968.161,31.839z M308.238,559.79l-43.96,175.963l175.963-43.991l439.938-439.938L748.147,119.821  L308.238,559.79z M746.627,473.387v402.175H124.438V253.373h402.204l124.407-124.438H0V1000h871.064V348.918L746.627,473.387z"/>
                </svg>
                </nuxt-link>
                <span class="d-none d-sm-inline-block">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <span class="api-delete-button" @click="deleteProject(project_index, project.id)">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill"
                       fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd"
                                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                  </svg>
                </span>
              </template>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        projects: [],
        new_version_project_id: 0,
        cloneVersionId: 0,
        new_version_name: '',
        new_version_error: ''
      }
    },
    mounted() {
      this.loadProjects()
    },
    methods: {
      stringToUrl(str) {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        let from = "àáảãạăäâấầẩẫậắằẳẵặẻẽẹềếểễệèéëêỉĩịìíïîỏõọồốổỗộơờớởỡợòóöôủũụùúüûñç·/,:;";
        let to   = "aaaaaaaaaaaaaaaaaaeeeeeeeeeeeeiiiiiiiooooooooooooooooooouuuuuuunc-----";
        for (let i = 0, l = from.length; i < l; i++) {
          str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
        str = str.replace(/[^a-z0-9 -._]/g, '') // remove invalid chars
          .replace(/\s+/g, '-') // collapse whitespace and replace by -
          .replace(/-+/g, '-'); // collapse dashes

        return str
      },
      closeNewVersionForm() {
        this.new_version_project_id = 0
      },
      deleteVersion: function (project, version_index, version_id) {
        if (confirm("Do you really want to delete?")) {
          this.$axios.get('/version/delete/' + version_id).then(response => {
            project.versions.splice(version_index, 1)
          }).catch(error => {
            alert("Cannot delete: " + error)
          })
        }
      },
      saveVersion: function (project) {
        let sendData = {
          "project_id": this.new_version_project_id,
          "clone_version_id": this.cloneVersionId,
          "name": this.new_version_name
        }
        if (sendData.name === '') {
          this.new_version_error = 'Version name is required'
          return
        }

        this.$axios.post('version/save', sendData).then(response => {
          if (response.data.status === "success") {
            this.$notify({
              group: 'notification',
              title: 'Done',
              type: 'success',
              duration: 5000,
              position: 'top right',
              text: 'Version created'
            });
            this.new_version_project_id = 0
            project.versions.push(response.data.data)

            /*
            let project = this.projects.find(e => e.id === this.new_version_project_id)
            this.$router.push({
              name: 'api-project-version',
              params: {project: project.name, version: response.data.data.name}
            })*/

          } else {
            this.new_version_error = response.data.message
          }
        }).catch(error => {
          this.new_version_error = "Error when save new version :("
        })
      },
      loadProjects() {
        this.$axios.get('/projects').then(response => {
          this.projects = response.data.data.data
        }).catch(error => {
          alert("Cannot load project list. Press F5 to try again: " + error)
        })
      },
      newVersion(project_id) {
        this.new_version_error = ''
        this.new_version_name = ''
        this.cloneVersionId = 0
        this.new_version_project_id = project_id
      },
      deleteProject(index, id) {
        if (confirm("Do you really want to delete?")) {
          this.$axios.get('/project/delete/' + id).then(response => {
            this.projects.splice(index, 1)
            if (this.projects.length === 0) {
              this.loadProjects()
            }
          }).catch(error => {
            alert("Cannot delete: " + error)
          })
        }
      }
    }
  }
</script>

<style>
  .project-visibility {
    color: #707070;
    font-size: 13px;
  }
  .project-role {
    border: 1px solid #dfdfdf;
    border-radius: 3px;
    padding: 1px 5px;
    font-size: 13px;
  }
  .btn-add-version:focus {
    outline: none;
  }

  .btn-add-version {
    float: left;
    width: 14px;
    display: block;
    background: #069255;
    height: 14px;
    text-align: center;
    color: #FFF;
    border-radius: 50%;
    cursor: pointer;
    line-height: 14px;
    border: 0;
    outline: none;
    font-size: 12px;
    padding: 0;
  }

  .delete-version-btn {
    background: rgba(224, 38, 38, 0.8);
    float: unset;
    display: inline-block;
    width: 10px;
    height: 10px;
    line-height: 10px;
    padding: 0;
  }

  .delete-version-btn:hover {
    background: red;
  }

  .add-version-btn-add {
    background: #069255;
  }

  .add-version-btn-close {
    background: #c82333;
  }

  .version_group {
    display: inline-block;
  }
</style>
