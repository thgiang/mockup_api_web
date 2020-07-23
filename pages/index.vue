<template>
  <div class="container mt-2">
    <h1>Your projects</h1>
    <div class="row">
      <div class="col-md-12">
        <table class="table">
          <thead>
          <tr>
            <th>Name</th>
            <th>Versions</th>
            <th>Description</th>
            <th class="text-center">Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(project, index) in projects">
            <td>
              <nuxt-link v-if="typeof project.versions !== 'undefined' && project.versions.length > 0"
                         :to="{name: 'api-project-version', params: {'project': project.name, 'version': project.versions[project.versions.length - 1].name}}">
                {{project.name}}
              </nuxt-link>
              <span v-else>{{project.name}}</span>
            </td>
            <td>
              <nuxt-link v-for="version in project.versions" :to="{name: 'api-project-version', params: {'project': project.name, 'version': version.name}}">{{version.name}} &nbsp; </nuxt-link>
              <span style="color: #069255; cursor: pointer"
                      @click="newVersion()">
                <svg width="0.8em" height="0.8em" viewBox="0 0 16 16" class="bi bi-plus-circle-fill" fill="currentColor"
                     style="margin-top: -2px"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4a.5.5 0 0 0-1 0v3.5H4a.5.5 0 0 0 0 1h3.5V12a.5.5 0 0 0 1 0V8.5H12a.5.5 0 0 0 0-1H8.5V4z"/>
                </svg>
                New
              </span>
            </td>
            <td>{{project.description}}</td>
            <td class="text-center" style="vertical-align: middle">
                  <span class="api-delete-button" @click="deleteProject(index)">
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
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        projects: []
      }
    },
    mounted() {
      this.$axios.get('/projects').then(response => {
        this.projects = response.data.data
      }).catch(error => {
        alert("Cannot load project list. Press F5 to try again: " + error)
      })
    },
    methods: {
      newVersion() {
        alert("Giả sử như là đã tạo version mới thành công :D tớ chưa kịp code");
      },
      deleteProject(index) {

      }
    }
  }
</script>

<style>
</style>
