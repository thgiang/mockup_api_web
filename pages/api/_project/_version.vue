<template>
  <div class="main">
    <div id="sidebar">
      <div class="api-version-selector">
        <strong class="sidebar-label">Select project & version</strong>
        <div class="form-row p-2">
          <div class="col">
            <select class="form-control custom-project-select" v-model="select_project">
              <option v-for="pj in projects" :value="pj">{{pj.name}}</option>
            </select>
          </div>
          <div class="col">
            <select class="form-control custom-project-select" v-model="select_version">
              <option v-for="vs in this.versions" :value="vs">{{vs.name}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="sidebar-label">
        <strong>API list</strong>
        <button class="btn btn-success btn-sm float-right" style="line-height: 0.8rem; padding: 3px 10px"
                @click="newApi()">
          <svg width="0.8em" height="0.8em" viewBox="0 0 16 16" class="bi bi-plus-circle-fill" fill="currentColor"
               style="margin-top: -2px"
               xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4a.5.5 0 0 0-1 0v3.5H4a.5.5 0 0 0 0 1h3.5V12a.5.5 0 0 0 1 0V8.5H12a.5.5 0 0 0 0-1H8.5V4z"/>
          </svg>
          ADD NEW
        </button>
      </div>
      <div class="m-2 text-black-50" v-if="apis.length === 0">
        API list is empty
      </div>
      <ul class="api-list" v-else>
        <li v-for="a in apis" @click="editApi(a)" :class="{active: api.id === a.id}">
          <span class="method-request method-get">{{a.request_type}}</span> {{a.slug}}
        </li>
      </ul>
      <!--
      <button class="btn btn-success col-12 api-list-export-button">
        <svg x="0px" y="0px"
             viewBox="0 0 512 512" style="enable-background:new 0 0 20 20; height: 18px;fill: #FFF; margin-top: -5px;"
             xml:space="preserve">
              <g>
                <g>
                  <path d="M382.56,233.376C379.968,227.648,374.272,224,368,224h-64V16c0-8.832-7.168-16-16-16h-64c-8.832,0-16,7.168-16,16v208h-64
                  c-6.272,0-11.968,3.68-14.56,9.376c-2.624,5.728-1.6,12.416,2.528,17.152l112,128c3.04,3.488,7.424,5.472,12.032,5.472
                  c4.608,0,8.992-2.016,12.032-5.472l112-128C384.192,245.824,385.152,239.104,382.56,233.376z"/>
                </g>
              </g>
          <g>
                <g>
                  <path d="M432,352v96H80v-96H16v128c0,17.696,14.336,32,32,32h416c17.696,0,32-14.304,32-32V352H432z"/>
                </g>
              </g>
        </svg>

        &nbsp;EXPORT
      </button>
      -->
      <button v-if="this.apis.length > 0" class="btn btn-success col-12 api-list-export-button"
              @click="$router.push({name: 'docs-project-version-id', params: {'project': project.name, 'version': version.name, 'id': apis[0].id}})">
        <font-awesome-icon icon="book" />
        &nbsp;DOCUMNET
      </button>
    </div>
    <div class="container pt-3">
      <div class="row justify-content-center">
        <div class="col-md-12">
          <div class="pb-1 mb-2 my-breadcrumb">
            <span>{{project.name}}</span>
            <svg width="0.6em" height="0.6em" viewBox="0 0 16 16" class="bi bi-caret-right-fill" fill="currentColor"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
            </svg>
            <span>{{version.name}}</span>
            <svg width="0.6em" height="0.6em" viewBox="0 0 16 16" class="bi bi-caret-right-fill" fill="currentColor"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
            </svg>
            <span v-if="api.id > 0">edit</span>
            <span v-else>new</span>

            <div class="float-right">
              <button class="btn btn-danger btn-sm" style="padding: 1px 5px" v-if="api.id > 0"
                      @click="deleteApi(api.id)">Delete API
              </button>
            </div>
          </div>
          <form class="form-inline">
            <div class="col-sm-1 p-0 pr-1">
              <label class="sr-only" for="request_type">Request type</label>
              <select name="request_type" id="request_type" class="form-control col-12 mb-2 mr-sm-2"
                      style="width: 100%; padding: 0 10px;"
                      v-model="api.request_type" @change="updateApiType()">
                <option value="GET">GET</option>
                <option value="POST">POST</option>
              </select>
            </div>
            <div class="col-sm-11 p-0">
              <label class="sr-only" for="slug">Username</label>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">/{{project.name}}/{{version.name}}/</div>
                </div>
                <input type="text" class="form-control" id="slug" placeholder="user/$user_id/edit" v-model="api.slug" @keyup="parseSlug">
              </div>
            </div>
            <!--
            <div class="col-sm-1 p-0">
              <button type="button" class="btn btn-success mb-2 col-12" @click="save()" style="margin-top: -1px">Save</button>
            </div>
            -->
            <textarea class="form-control col-12" placeholder="Detail description of this API"
                      v-model="api.description">{{api.description}}</textarea>
          </form>
          <div class="bg-danger text-white p-2 mt-2" v-if="notice.message !== ''">
            {{notice.message}}
          </div>
          <div class="pt-3">
            <ul class="api-tabs">
              <li @click="()=>{tab = 'params'}" :class="{active: tab === 'params'}">Params</li>
              <li @click="()=>{tab = 'headers'}" :class="{active: tab === 'headers'}">Headers</li>
              <li @click="()=>{tab = 'response'}" :class="{active: tab === 'response'}">Response success</li>
              <li @click="()=>{tab = 'response_error'}" :class="{active: tab === 'response_error'}">Response error</li>
            </ul>
          </div>
          <div class="" v-if="tab === 'response'">
            <textarea rows="12" class="form-control mb-3" placeholder="Example: {'success': true, data[]}"
                      v-model="api.response"></textarea>
          </div>
          <div class="" v-if="tab === 'response_error'">
            <textarea rows="12" class="form-control mb-3"
                      placeholder="Example: {'success': false, 'message': 'User not found'}"
                      v-model="api.response_error"></textarea>
          </div>
          <div class="" v-if="tab === 'params' || tab === 'headers'">
            <table class="table table-bordered">
              <thead>
              <tr>
                <th style="width: 10%;">Method</th>
                <th style="width: 20%;">Name</th>
                <th style="width: 40%">Description</th>
                <th style="width: 20%">Data Type</th>
                <th style="width: 5%">Required</th>
                <th style="width: 5%" class="text-center">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(param, index) in params"
                  v-if="(param.request_type !== 'HEADER' && tab !== 'headers') || (param.request_type === 'HEADER' && tab === 'headers')">
                <td>
                  <template v-if="tab !== 'headers'">
                    <div v-if="param.request_type === 'URL'" class="disabled" style="padding: 8px 0 0 8px">URL</div>
                    <select class="form-control" v-model="param.request_type" v-else>
                      <option value="GET">GET</option>
                      <option value="POST" v-if="api.request_type === 'POST'">POST</option>
                    </select>
                  </template>
                  <div v-else class="disabled" style="padding: 8px 0 0 8px">HEADER</div>
                </td>
                <td>
                  <input disabled v-if="param.request_type === 'URL'" class="form-control" :value="param.name" />
                  <input v-else class="form-control" placeholder="Parameter name a-zA-Z0-9_-" v-model="param.name" @blur="() => {param.name = stringToUrl(param.name)}" />
                </td>
                <td>
                  <input class="form-control" value="" placeholder="Description for this field"
                         v-model="param.description"/>
                </td>
                <td>
                  <CustomVueMultiselect
                    v-model="param.validator"
                    :options="validators"
                    track-by="id"
                    label="name"
                    selectedLabel="Selected"
                    selectLabel="Select"
                    deselectLabel="Remove"
                    placeholder="Data type validator"
                    :internal-search="false"
                    @input="updateValidator(param)"
                  />
                </td>
                <td v-if="param.request_type !== 'URL'" class="text-center" style="vertical-align: middle; cursor: pointer"
                    @click="() => {param.required = !param.required}">
                  <div class="my-form-check-input" v-if="param.request_type !== 'URL'">
                    <template v-if="param.required">✓</template>
                  </div>
                </td>
                <td v-else class="text-center" style="vertical-align: middle;">
                  ✓
                </td>
                <td class="text-center" style="vertical-align: middle">
                  <span class="api-delete-button" v-if="param.removable && param.request_type !== 'URL'" @click="()=>{params.splice(index, 1)}">
                      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill"
                           fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd"
                                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                      </svg>
                  </span>
                </td>
              </tr>
              <tr>
                <td colspan="6" class="text-center">
                  <button class="btn btn-outline-success btn-add-new-param p-2 col-12"
                          style="line-height: 0.8rem; padding: 3px 10px" @click="newParam(tab)">
                    <svg width="0.8em" height="0.8em" viewBox="0 0 16 16" class="bi bi-plus-circle-fill"
                         fill="currentColor"
                         style="margin-top: -2px"
                         xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4a.5.5 0 0 0-1 0v3.5H4a.5.5 0 0 0 0 1h3.5V12a.5.5 0 0 0 1 0V8.5H12a.5.5 0 0 0 0-1H8.5V4z"/>
                    </svg>
                    <template v-if="tab === 'params'">Add param</template>
                    <template v-if="tab === 'headers'">Add header</template>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="text-center mt-2 pt-2">
            <button type="button" class="btn btn-outline-secondary mb-2 ml-1 col-2" @click="reset()" style="margin-top: -1px">Reset</button>
            <button type="button" class="btn btn-success mb-2 ml-1 col-2" @click="save()" style="margin-top: -1px">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  //import VueJsonPretty from 'vue-json-pretty'

  class Project {
    constructor() {
      this.id = 0
      this.name = ""
      this.description = ""
    }
  }

  class Version {
    constructor() {
      this.id = 0
      this.name = ""
      this.description = ""
      this.export_url = ""
    }
  }

  class Api {
    constructor() {
      this.id = 0
      this.slug = ""
      this.description = ""
      this.version_id = 0
      this.request_type = "GET"
      this.response = ""
      this.response_error = ""
    }
  }

  class Param {
    constructor() {
      this.id = 0
      this.name = ""
      this.description = ""
      this.request_type = "GET"
      this.removable = true
      this.api_id = 0
      this.required = false
      this.validator = {}
    }
  }

  import CustomVueMultiselect from '~/components/custom-vue-multiselect/Multiselect.vue'

  export default {
    components: {CustomVueMultiselect},
    data() {
      return {
        projects: [new Project()],
        project: new Project(),
        versions: [new Version()],
        version: new Version(),
        apis: [],
        api: new Api(),
        params: [new Param()],
        validators: [],
        select_project: {},
        select_version: {},
        tab: "params",
        notice: {'status': 'error', 'message': ''}
      }
    },
    mounted() {
      this.$axios.get('/projects?per_page=500').then(response => {
        this.projects = response.data.data.data.filter(pr => pr.versions.length > 0)
        if (this.projects.length === 0) {
          this.$router.push('/projects')
        }

        let project = {}
        let version = {}
        if (this.projects.length > 0) {
          project = this.projects.find(element => element.name === this.$route.params.project)
          if (project !== undefined) {
            version = project.versions.find(element => element.name === this.$route.params.version)
          }
        }
        if (project === undefined || version === undefined) {
          this.$router.push('/404')
        } else {
          this.project = project
          this.versions = project.versions
          this.version = version
          this.select_project = project
          this.select_version = version
          this.api.version_id = version.id

          //Load validators
          this.$axios.get('/project_validators/' + this.project.id).then(response => {
            this.validators = response.data.data
          }).catch(error => {
            this.$notify({
              group: 'notification',
              title: 'Error',
              type: 'error',
              duration: 5000,
              position: 'top right',
              text: "Cannot load validators list. Press F5 to try again: " + error
            });
          })
        }
      }).catch(error => {
        this.$notify({
          group: 'notification',
          title: 'Error',
          type: 'error',
          duration: 5000,
          position: 'top right',
          text: "Cannot load project list. Press F5 to try again: " + error
        });
      })

      let url = '/list_api/' + this.$route.params.project + '/' + this.$route.params.version
      this.$axios.get(url).then(response => {
        if (response.data.status == 'success') {
          this.apis = response.data.data.apis
          if (this.apis.length > 0) {
            this.editApi(this.apis[0])
          }
        }
      }).catch(error => {
        this.$notify({
          group: 'notification',
          title: 'Error',
          type: 'error',
          duration: 5000,
          position: 'top right',
          text: "Cannot load api list. Press F5 to try again: " + error
        });
      })
    },
    watch: {
      select_project: function (newVal, oldVal) {
        if (newVal.id > 0) {
          if (newVal.versions.length > 0) {
            this.versions = newVal.versions
            let version = this.versions.find(element => element.name === this.$route.params.version)
            if (version) {
              this.select_version = version
            } else {
              this.select_version = newVal.versions[0]
            }
          }
        }
      },
      select_version: function (newVal, oldVal) {
        if(newVal && typeof newVal.name !== 'undefined') {
          this.$router.push({name: 'api-project-version', params: {project: this.select_project.name, version: newVal.name}})
        }
      }
    },
    methods: {
      parseSlug() {
        this.api.slug = this.api.slug.replace(' ', '');
        let slugParts = this.api.slug.split('/')
        let urlParams = []
        for(let i = 0; i < slugParts.length; i++) {
          if(slugParts[i].startsWith('$')) {
            let paramName = slugParts[i].replace('$', '')
            urlParams.push(paramName)
            let existingParam = this.params.find(p => (p.request_type === 'URL' && p.name == paramName))
            if(!existingParam) {
              let newParam = new Param()
              newParam.api_id = this.api.id
              newParam.request_type = 'URL'
              newParam.description = 'Variable on URL'
              newParam.required = true
              newParam.removable = false
              newParam.name = paramName
              this.params.unshift(newParam)
            }
          }
        }

        this.params = this.params.filter(p => (p.request_type !== 'URL' || (p.request_type === 'URL' && urlParams.includes(p.name))))
      },
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
      reset() {
        this.params = this.params.filter(p => p.request_type === 'URL')
      },
      goToVersion() {
        this.$router.push({
          name: 'api-project-version',
          params: {'project': this.select_project.name, version: this.select_version.name}
        })
      },
      setNotice: function (notice) {
        this.notice = notice
        let that = this
        setTimeout(function () {
          that.notice = {'status': 'error', 'message': ''}
        }, 3000);
      },
      updateApiType() {
        if (this.api.request_type === 'GET') {
          for (let i = 0; i < this.params.length; i++) {
            if (this.params[i].request_type === 'POST') {
              this.params[i].request_type = 'GET'
            }
          }
          this.$forceUpdate()
        }
      },
      newParam(tab) {
        let newParam = new Param()
        if (tab === 'headers') {
          newParam.request_type = 'HEADER'
        } else {
          newParam.request_type = this.api.request_type
        }

        this.params.push(newParam)
      },
      updateValidator(param) {

      },
      newApi() {
        let newApi = new Api()
        newApi.version_id = this.version.id
        this.api = newApi
        this.params = [new Param()]
      },
      editApi(api) {
        this.api = api;
        this.$axios.get('api/' + api.id).then(response => {
          if (response.data.status === "success") {

            // Map response params from server to state params
            let params = []
            for (let i = 0; i < response.data.data.params.length; i++) {
              let temp = response.data.data.params[i];
              let param = new Param()
              for (let j = 0; j < Object.keys(param).length; j++) {
                if (typeof temp[Object.keys(param)[j]] !== 'undefined') {
                  param[Object.keys(param)[j]] = temp[Object.keys(param)[j]];
                }
              }
              params.push(param);
            }
            // Update state
            this.params = params
          } else {
            this.setNotice(response.data);
          }
        }).catch(error => {
          this.$notify({
            group: 'notification',
            title: 'Error',
            type: 'error',
            duration: 5000,
            position: 'top right',
            text: "Cannot load api. Press F5 to try again: " + error
          });
        })
      },
      deleteApi(api_id) {
        if (confirm("Do you really want to delete?")) {
          this.$axios.get('/api/delete/' + api_id).then(response => {
            if(response.data.status == 'success') {
              this.apis = this.apis.filter(obj => obj.id !== api_id);
              let newApi = new Api()
              newApi.version_id = this.api.version_id
              this.api = newApi
              this.params = [new Param()]
              this.$notify({
                group: 'notification',
                title: 'Done',
                type: 'success',
                duration: 5000,
                position: 'top right',
                text: "API deleted"
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
            this.$notify({
              group: 'notification',
              title: 'Error',
              type: 'error',
              duration: 5000,
              position: 'top right',
              text: "Cannot delete. Error: " + error
            });
          })
        }
      },
      save() {
        let sendData = {"api": this.api, "params": this.params}
        if (sendData.api.description === '') {
          this.setNotice({'status': 'error', 'message': 'API description is required'})
          return
        }
        for (let i = 0; i < sendData.params.length; i++) {
          if (sendData.params[i].name === '' || sendData.params[i].name === '') {
            this.setNotice({'status': 'error', 'message': 'Name and description of all params, headers are required'})
            return
          }
        }

        this.$axios.post('api/save', sendData).then(response => {
          if (response.data.status === "success") {
            // Reset form
            let newApi = new Api();
            newApi.version_id = this.version.id
            this.api = newApi
            this.params = [new Param()]

            // Add API to API lists on sidebar
            let appendApiToList = new Api()
            let responseApi = response.data.data.api;
            for (let x = 0; x < Object.keys(appendApiToList).length; x++) {
              if (typeof responseApi[Object.keys(appendApiToList)[x]] !== 'undefined') {
                appendApiToList[Object.keys(appendApiToList)[x]] = responseApi[Object.keys(appendApiToList)[x]]
              }
            }

            if(sendData.api.id > 0) {
              this.apis = this.apis.filter(a => a.id !== sendData.api.id)
            }
            this.apis.unshift(appendApiToList)

            this.$notify({
              group: 'notification',
              title: 'Done',
              type: 'success',
              duration: 5000,
              position: 'top right',
              text: 'API saved successfully'
            });
            this.editApi(appendApiToList)
          } else {
            this.setNotice(response.data);
          }
        }).catch(error => {
          this.$notify({
            group: 'notification',
            title: 'Error',
            type: 'error',
            duration: 5000,
            position: 'top right',
            text: "Error while save API: " + error
          });
        })
      }
    }
  }
</script>
<style scoped>
  .btn-add-new-param {
    border: none
  }

  .btn-add-new-param:hover, .btn-add-new-param:focus, .btn-add-new-param:active {
    border-color: #f3f3f3 !important;
    background: #FFF !important;
    color: green !important;
    outline: none !important;
    box-shadow: none !important;
  }

  .custom-project-select, select {
    padding: 2px;
  }

  .custom-project-select:focus {
    box-shadow: none;
  }

  .main {
    padding-left: 250px;
  }

  .my-breadcrumb {
    font-size: 14px;
    color: #555;
    border-bottom: 1px solid #dee2e6;
  }

  #sidebar {
    height: calc(100vh);
    background: #ffffff;
    width: 280px;
    position: fixed;
    z-index: 888;
    top: 50px;
    left: 0;
    border-right: 1px solid #ced4da;
    overflow-y: auto;
  }

  .sidebar-label {
    background: #f3f3f3;
    text-transform: uppercase;
    font-size: 13px;
    width: 100%;
    display: block;
    color: #6b6b6b;
    padding: 10px;
    border-bottom: 1px solid #ced4da;
  }

  .api-version-selector {
  }

  .api-list {
    list-style: none;
    padding: 0 0 55px 0;
  }

  .api-list-export-button {
    position: fixed;
    bottom: 0;
    width: 279px;
    padding-right: 15px;
    z-index: 9999;
    border-radius: 0;
    padding-top: 8px;
  }

  .api-new-button:hover {
    color: #069255;
    transition: 0.5s;
  }

  .api-list li {
    padding: 10px 12px 10px 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-bottom: 1px solid rgba(222, 226, 230, 0.6);
    cursor: pointer;
  }

  .api-list li:hover {
    background: #efefef;
  }

  .api-list .active {
    background: #efefef;
    border-right: 3px solid #069255;
  }

  .method-request {
    width: 35px;
    text-align: center;
    display: inline-block;
    padding: 2px 5px;
    border-radius: 2px;
    font-size: 12px;
  }

  .active .method-request {
    background: #069255;
    color: #FFF;
  }

  .method-get {
    background: #b1b1b1;
    /*background: #069255;*/
    color: #FFF;
  }

  .method-post {
    background: #DDD;
    /*background: #FFBC00;*/
    color: #222;
  }


  .api-tabs {
    padding: 0;
  }

  .api-tabs li {
    display: inline;
    padding: 3px 3px 3px 0;
    cursor: pointer;
    margin-right: 10px;
  }

  .api-tabs li.active {
    border-bottom: 2px solid #069255;
    margin-bottom: -2px;
    font-weight: bold;
  }

  .api-tabs li:hover {
    font-weight: bold;
  }

  .api-delete-button {
    cursor: pointer;
    color: #929292;
    margin-top: -3px;
  }

  .api-delete-button:hover {
    color: #333;
  }

  .my-form-check-input {
    border: 1px solid #ced4da;
    width: 17px;
    height: 16px;
    display: block;
    line-height: 14px;
    margin: 0 auto;
    font-size: 12px;
    cursor: pointer;
    color: #069255;
    font-weight: bold;
  }
</style>
