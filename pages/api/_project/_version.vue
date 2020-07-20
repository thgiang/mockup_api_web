<template>
  <div class="main">
    <div id="sidebar">
      <div class="api-version-selector">
        <strong class="sidebar-label">Select project & version</strong>
        <div class="form-row p-2">
          <div class="col">
            <select class="form-control custom-project-select" v-model="project">
              <option v-for="pj in projects" :value="pj">{{pj.name}}</option>
            </select>
          </div>
          <div class="col">
            <select class="form-control custom-project-select" v-model="version">
              <option v-for="vs in project.versions" :value="vs">{{vs.name}}</option>
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
      <ul class="api-list">
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
      <button class="btn btn-success col-12 api-list-export-button">
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             x="0px" y="0px"
             viewBox="0 0 368.008 368.008"
             style="enable-background:new 0 0 20 20; height: 18px; fill: #FFF; margin-top: -5px;" xml:space="preserve">

	<g>
		<path d="M368,88.004c0-1.032-0.224-2.04-0.6-2.976c-0.152-0.376-0.416-0.664-0.624-1.016c-0.272-0.456-0.472-0.952-0.832-1.352
			l-72.008-80c-1.512-1.688-3.672-2.656-5.944-2.656h-15.648c-0.232,0-0.472,0-0.704,0H151.992c-13.232,0-24,10.768-24,24v40H24
			c-13.232,0-24,10.768-24,24v256c0,13.232,10.768,24,24,24h192c13.232,0,24-10.768,24-24v-40h104c13.232,0,24-10.768,24-24v-175.96
			c0-0.016,0.008-0.024,0.008-0.04L368,88.004z M224,344.004c0,4.408-3.592,8-8,8H24c-4.408,0-8-3.592-8-8v-256c0-4.408,3.592-8,8-8
			h104v88c0,4.416,3.584,8,8,8h88V344.004z M224,160.004h-80v-80h4.688L224,155.324V160.004z M352,280.004c0,4.416-3.592,8-8,8H240
			v-119.64c0-0.12,0.008-0.24,0.008-0.36l-0.008-16c0,0,0-0.008,0-0.024c-0.008-2.12-0.832-4.04-2.184-5.464
			c0-0.016-0.024-0.016-0.016-0.016c0,0-0.008-0.008-0.008-0.016c-0.008,0-0.016-0.008-0.016-0.016
			c-0.032-0.032-0.072-0.072-0.112-0.112l-80-80c-1.504-1.504-3.544-2.352-5.664-2.352h-8.008v-40c0-4.408,3.592-8,8-8h112v88
			c0,4.416,3.584,8,8,8H352V280.004z M352,96.004h-72.008v-80h4.44L352,91.076V96.004z"/>
	</g>

</svg>

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
          </div>
          <form class="form-inline">
            <div class="col-sm-1 p-0 pr-1">
              <label class="sr-only" for="request_type">Request type</label>
              <select name="request_type" id="request_type" class="form-control col-12 mb-2 mr-sm-2" style="width: 100%"
                      v-model="api.request_type">
                <option value="GET">GET</option>
                <option value="POST">POST</option>
              </select>
            </div>
            <div class="col-sm-10 p-0 pr-1">
              <label class="sr-only" for="slug">Username</label>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">/{{project.name}}/{{version.name}}/</div>
                </div>
                <input type="text" class="form-control" id="slug" placeholder="user/$user_id/edit" v-model="api.slug">
              </div>
            </div>
            <div class="col-sm-1 p-0">
              <button type="button" class="btn btn-success mb-2 col-12" @click="save()" style="margin-top: -1px">Save
              </button>
            </div>
            <textarea class="form-control col-12" placeholder="Detail description of this API"
                      v-model="api.description">{{api.description}}</textarea>
          </form>
          <div class="bg-danger text-white p-2 mt-2" v-if="saveApiError.message !== ''">
            {{saveApiError.message}}
          </div>
          <div class="pt-3">
            <ul class="api-tabs">
              <li @click="()=>{tab = 'params'}" :class="{active: tab === 'params'}">Params</li>
              <li @click="()=>{tab = 'response'}" :class="{active: tab === 'response'}">Response</li>
            </ul>
          </div>
          <div class="" v-if="tab === 'response'">
            <textarea rows="12" class="form-control" placeholder="Response content" v-model="api.response"></textarea>
          </div>
          <div class="" v-if="tab === 'params'">
            <table class="table table-bordered">
              <thead>
              <tr>
                <th style="width: 10%;">Type</th>
                <th style="width: 20%;">Name</th>
                <th style="width: 30%">Description</th>
                <th style="width: 30%">Validate</th>
                <th style="width: 10%" class="text-center">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(param, index) in params">
                <td>
                  <select class="form-control" v-model="param.type">
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="HEADER">HEADER</option>
                    <option value="URL">URL</option>
                  </select>
                </td>
                <td>
                  <input class="form-control" placeholder="Parameter name a-zA-Z0-9_-" v-model="param.name"/>
                </td>
                <td>
                  <input class="form-control" value="" placeholder="Description for this field"
                         v-model="param.description"/>
                </td>
                <td>
                  <textarea class="form-control" rows="1"
                            placeholder="Type validator name. Ex: numeric|password ">{{param.validators.join(', ')}}</textarea>
                </td>
                <td class="text-center" style="vertical-align: middle">
                  <span class="api-delete-button">
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
    }
  }

  class Param {
    constructor() {
      this.name = ""
      this.description = ""
      this.type = "GET"
      this.removable = true
      this.api_id = 0
      this.required = true
      this.validators = ['required']
    }
  }

  export default {
    //components: {VueJsonPretty},
    data() {
      return {
        projects: [],
        project: new Project(),
        versions: [],
        version: new Version(),
        apis: [],
        api: new Api(),
        params: [new Param(), new Param(), new Param()],

        tab: "params",
        saveApiError: {'status': 'error', 'message': ''}
      }
    },
    mounted() {
      this.$axios.get('/projects').then(response => {
        this.projects = response.data.data
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
          this.version = version
          this.api.version_id = version.id
        }
      }).catch(error => {
        alert("Cannot load project list. Press F5 to try again: " + error)
      })
    },
    watch: {
      version: function (newVal, oldVal) {
        this.$axios.get('/version_apis/' + newVal.id).then(response => {
          this.apis = response.data.data
        }).catch(error => {
          alert("Cannot load api list. Press F5 to try again: " + error)
        })
      }
    },
    methods: {
      newApi() {
        let newApi = new Api()
        newApi.version_id = this.version.id
        this.api = newApi
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
            this.saveApiError = response.data;
          }
        }).catch(error => {
          alert("Lỗi lấy API: " + error)
        })
      },
      save() {
        let self = this
        let sendData = {"api": this.api, "params": this.params}
        this.$axios.post('api/save', sendData).then(response => {
          if (response.data.status === "success") {
            window.location.reload();

            // TODO: Thêm thông tin API vừa lưu vào danh sách API ở sidebar
            //this.api = new Api();
            //this.apis.shift(response.data.data);
            this.saveApiError = {'status': 'success', 'message': ''};
          } else {
            this.saveApiError = response.data;
          }
        }).catch(error => {
          alert("Lỗi lưu API: " + error)
        })
      }
    }
  }
</script>
<style scoped>
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
  }

  .api-delete-button:hover {
    color: #333;
  }
</style>
