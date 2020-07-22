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
      </div>
      <ul class="api-list">
        <li v-for="a in apis" @click="loadApi(a)" :class="{active: api.id === a.id}">
          <span class="method-request method-get">{{a.request_type}}</span> {{a.slug}}
        </li>
      </ul>
      <a class="btn btn-success col-12 api-list-export-button" :href="version.export_url" target="_blank">
        <img src="~assets/images/postman.svg" style="height: 30px;">
      </a>
    </div>
    <div class="container pt-3">
      <div class="row justify-content-center">
        <div class="col-md-12">
          <div class="pb-1 mb-2">
            <h1>{{api.description}}</h1>
          </div>

          <!-- SECTION REQUEST -->
          <section class="section section-request">
            <blockquote>
              <p>REQUEST</p>
            </blockquote>
            <pre><div class="copy">Copy</div><code>{{api.request_type}} /api/{{project.name}}/{{version.name}}/{{api.slug}}</code></pre>
          </section>

          <!-- SECTION PARAMS -->
          <section class="section pt-3 section-param ">
            <blockquote>
              <p>PARAMS</p>
            </blockquote>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Parameter</th>
                  <th>Required</th>
                  <th>Validator</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="param in params">
                  <td>{{param.request_type}}</td>
                  <td>{{param.name}}</td>
                  <td><template v-if="param.required">Yes</template><template v-else>No</template></td>
                  <td>
                        <strong>{{param.validator.name}}</strong>: {{param.validator.description}}
                  </td>
                  <td>{{param.description}}</td>
                </tr>
              </tbody>
            </table>
          </section>

          <!-- SECTION SUCCESS -->
          <section class="section pt-3 section-success">
            <blockquote>
              <p>SUCCESS</p>
            </blockquote>
            <pre><div class="copy">Copy</div><code>{{api.response}}</code></pre>
          </section>

          <!-- SECTION FAIL -->
          <section class="section pt-3 section-success">
            <blockquote>
              <p>FAIL</p>
            </blockquote>
            <pre><div class="copy">Copy</div><code>{
  "status":"error",
  "message":"Error content",
  "errors":{
    "param_name_1":"Validate error text 1",
    "param_name_2":"Validate error text 2"
  }
}</code></pre>
          </section>

          <!-- SECTION EXAMPLE -->
          <section class="section pt-3 section-success">
            <blockquote>
              <p>EXAMPLE</p>
            </blockquote>
            <pre><div class="copy">Copy</div><code>{{api.example}}</code></pre>
          </section>
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
      this.example = ""
    }
  }

  class Param {
    constructor() {
      this.name = ""
      this.description = ""
      this.request_type = "GET"
      this.removable = true
      this.api_id = 0
      this.required = true
      this.validator = {}
    }
  }

  import CustomVueMultiselect from '~/components/custom-vue-multiselect/Multiselect.vue'

  export default {
    components: {CustomVueMultiselect},
    data() {
      return {
        projects: [],
        project: new Project(),
        versions: [],
        version: new Version(),
        apis: [],
        api: new Api(),
        params: [new Param(), new Param(), new Param()],
        validators: [],

        tab: "params",
        notice: {'status': 'error', 'message': ''}
      }
    },
    mounted() {
      this.$axios.get('/projects').then(response => {
        this.projects = response.data.data
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
          this.version = version
          this.api.version_id = version.id
        }
      }).catch(error => {
        alert("Cannot load project list. Press F5 to try again: " + error)
      })
    },
    watch: {
      project: function (newVal, oldVal) {
        if (newVal.id > 0) {
          this.$axios.get('/project_validators/' + this.project.id).then(response => {
            let validators = []
            for (let i = 0; i < response.data.data.length; i++) {
              validators.push(response.data.data[i].name)
            }
            this.validators = validators
          }).catch(error => {
            alert("Cannot load validators list. Press F5 to try again: " + error)
          })
        }
      },
      version: function (newVal, oldVal) {
        this.$axios.get('/version_apis/' + newVal.id).then(response => {
          this.apis = response.data.data
          if (this.apis.length > 0) {
            this.loadApi(this.apis[0])
          }
        }).catch(error => {
          alert("Cannot load api list. Press F5 to try again: " + error)
        })
      }
    },
    methods: {
      loadApi(api) {
        if(api.id === this.api.id) {
          return;
        }
        //this.api = api;
        this.$axios.get('api/' + api.id).then(response => {
          if (response.data.status === "success") {
            this.api = response.data.data
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
            this.notice = response.data;
          }
        }).catch(error => {
          alert("Lỗi lấy API: " + error)
        })
      },
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
    padding-right: 20px;
    z-index: 9999;
    border-radius: 0;
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

  blockquote {
    font-size: 20px;
    padding-left: 12px;
    color: #444;
    border-left: .2rem solid #069255;
  }
  pre {
    background: #EEE;
    padding: 10px;
    position: relative;
  }
  .copy {
    position: absolute;
    right: 0;
    top: -1px;
    background: #069255;
    padding: 2px 4px;
    cursor: pointer;
    color: #FFF;
    border-bottom-left-radius: 3px;
  }
</style>
