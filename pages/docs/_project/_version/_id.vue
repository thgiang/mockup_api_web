<template>
  <div class="main">
    <div id="sidebar">
      <div class="sidebar-label">
        <strong>API list</strong>
      </div>
      <ul class="api-list">
        <li v-for="a in apis" @click="gotoApi(a.id)" :class="{active: $route.params.id === a.id}">
          <span class="method-request method-get">{{a.request_type}}</span> {{a.slug}}
        </li>
      </ul>
      <a class="btn btn-success col-12 api-list-export-button" :href="export_url+'?token='+token"
         target="_blank">
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
            <pre><div class="copy" @click="copyText('#request_'+api.id, $event)">Copy</div><code
              :id="'request_'+api.id">{{api.request_type}} /api/{{api.project.name}}/{{api.version.name}}/{{api.slug}}</code></pre>
          </section>

          <!-- SECTION HEADERS -->
          <section class="section pt-3 section-header" v-if="showHeaders.length > 0">
            <blockquote>
              <p>HEADER</p>
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
              <tr v-for="param in showHeaders">
                <td>{{param.request_type}}</td>
                <td>{{param.name}}</td>
                <td>
                  <template v-if="param.required">Yes</template>
                  <template v-else>No</template>
                </td>
                <td>
                  <template v-if="param.validator">
                    <strong>{{param.validator.name}}</strong>: {{param.validator.description}}
                  </template>
                </td>
                <td>{{param.description}}</td>
              </tr>
              </tbody>
            </table>
          </section>

          <!-- SECTION PARAMS -->
          <section class="section pt-3 section-param" v-if="showParams.length > 0">
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
              <tr v-for="param in showParams">
                <td>{{param.request_type}}</td>
                <td>{{param.name}}</td>
                <td>
                  <template v-if="param.required">Yes</template>
                  <template v-else>No</template>
                </td>
                <td>
                  <template v-if="param.validator">
                    <strong>{{param.validator.name}}</strong>: {{param.validator.description}}
                  </template>
                </td>
                <td>{{param.description}}</td>
              </tr>
              </tbody>
            </table>
          </section>

          <!-- SECTION SUCCESS -->
          <section class="section pt-3 section-success">
            <blockquote>
              <p>SUCCESS RESPONSE</p>
            </blockquote>
            <p>The API will return success by default.</p>
            <pre><div class="copy" @click="copyText('#success_'+api.id, $event)">Copy</div><code
              :id="'success_'+api.id">{{api.response}}</code></pre>
          </section>

          <!-- SECTION SUCCESS -->
          <section class="section pt-3 section-error">
            <blockquote>
              <p>ERROR RESPONSE</p>
            </blockquote>
            <p>If you want to receive error response, add <code style="font-size: 16px">?test_status=error</code> to
              your URL.</p>
            <pre><div class="copy" @click="copyText('#error_'+api.id, $event)">Copy</div><code
              :id="'success_'+api.id">{{api.response_error}}</code></pre>
          </section>

          <!-- SECTION FAIL -->
          <section class="section pt-3 section-fail">
            <blockquote>
              <p>VALIDATE FAIL</p>
            </blockquote>
            <pre><div class="copy" @click="copyText('#fail_'+api.id, $event)">Copy</div><code :id="'fail_'+api.id">{
  "success": false,
  "message": "Invalid request",
  "errors": {
    "param_name_1": ["This field is required"],
    "param_name_2": ["This field must be string"]
  }
}</code></pre>
          </section>

          <!-- SECTION EXAMPLE -->
          <section class="section pt-3 section-example">
            <blockquote>
              <p>EXAMPLE</p>
            </blockquote>
            <pre><div class="copy" @click="copyText('#example_'+api.id, $event)">Copy</div><code
              :id="'example_'+api.id">{{api.example}}</code></pre>
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
      this.description = "API name"
      this.version_id = 0
      this.request_type = "GET"
      this.response = ""
      this.response_error = ""
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
    }
  }

  export default {
    data() {
      return {
        token: '',
        apis: [],
        api: {'project': new Project(), 'version': new Version()},
        params: [],
        export_url: '',
        cacheName: '',
        showHeaders: [],
        showParams: [],
      }
    },
    mounted() {
      this.token = this.$auth.$storage._state['_token.laravelJWT'].replace('Bearer ', '');
      this.cacheName = this.$route.params.project + '_'+this.$route.params.version

      // Load data from cache
      if(localStorage.getItem(this.cacheName)) {
        let cachedData = JSON.parse(localStorage.getItem(this.cacheName))
        if(typeof cachedData.apis !== 'undefined') {
          this.apis = cachedData.apis
        }
        if(typeof cachedData.export_url !== 'undefined') {
          this.export_url = cachedData.export_url
        }
      }

      this.loadApi()
      this.loadApiList()
    },
    watch: {
      params: function (newVal, oldVal) {
        if (newVal) {
          this.showHeaders = this.params.filter(e => e.request_type === 'HEADER')
          this.showParams = this.params.filter(e => e.request_type !== 'HEADER')
        }
      },
    },
    methods: {
      gotoApi(api_id) {
        this.$router.push({
          name: 'docs-project-version-id',
          params: {'project': this.$route.params.project, 'version': this.$route.params.version, 'id': api_id}
        })
      },
      copyText(div_id, $event) {
        $event.target.innerHTML = 'Copied';
        let codeToCopy = document.querySelector(div_id)
        const el = document.createElement('textarea');
        el.value = codeToCopy.textContent;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      },
      loadApiList() {
        this.$axios.get('/list_api/' + this.$route.params.project + '/' +this.$route.params.version).then(response => {
          if(response.data.status === 'success') {
            localStorage.setItem(this.cacheName, JSON.stringify(response.data.data))
            this.apis = response.data.data.apis
            this.export_url = response.data.data.export_url
            let api_id = this.$route.params.id
            if (parseInt(api_id) === 0) {
              if (this.apis.length > 0) {
                this.gotoApi(this.apis[0].id)
              } else {
                this.$notify({
                  group: 'notification',
                  title: 'Error',
                  type: 'error',
                  duration: 5000,
                  position: 'top right',
                  text: "This version has no API"
                });
                this.$router.push({name: 'index'})
              }
            }
          } else {
            this.$notify({
              group: 'notification',
              title: 'Error',
              type: 'error',
              duration: 5000,
              position: 'top right',
              text: response.data.error
            });
            this.$router.push({name: 'index'})
          }
        }).catch(error => {
          this.$notify({
            group: 'notification',
            title: 'Error',
            type: 'error',
            duration: 5000,
            position: 'top right',
            text: "Error: "+error
          });
        })
      },
      loadApi() {
        let api_id = this.$route.params.id
        this.$axios.get('api/' + api_id).then(response => {
          if (response.data.status === "success") {
            this.api = response.data.data
            this.params = response.data.data.params
          }
        }).catch(error => {
          this.$notify({
            group: 'notification',
            title: 'Error',
            type: 'error',
            duration: 5000,
            position: 'top right',
            text: "Cannot get API info. Error: "+error
          });
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
    min-height: 30px;
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
