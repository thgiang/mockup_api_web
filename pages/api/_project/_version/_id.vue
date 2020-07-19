<template>
  <div class="main">
    <div id="sidebar">
      <div class="api-version-selector">
        <strong class="sidebar-label">Select project & version</strong>
        <div class="form-row p-2">
          <div class="col">
            <select class="form-control custom-project-select" v-model="project">
              <option value="moshop-web">moshop-web</option>
              <option value="moshop-wh">moshop-wh</option>
              <option value="moshop-x">moshop-x</option>
            </select>
          </div>
          <div class="col">
            <select class="form-control custom-project-select" v-model="version">
              <option value="v1.0">v1.0</option>
              <option value="v1.1">v1.1</option>
              <option value="v2.0">v2.0</option>
            </select>
          </div>
        </div>
      </div>
      <div class="sidebar-label">
        <strong>API list</strong>
        <button class="btn btn-success btn-sm float-right" style="line-height: 0.8rem; padding: 3px 10px">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus-circle-fill" fill="currentColor"
               xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4a.5.5 0 0 0-1 0v3.5H4a.5.5 0 0 0 0 1h3.5V12a.5.5 0 0 0 1 0V8.5H12a.5.5 0 0 0 0-1H8.5V4z"/>
          </svg>
          ADD NEW
        </button>
      </div>
      <ul class="api-list">
        <li>
          <span class="method-request method-get">GET</span> users
        </li>
        <li>
          <span class="method-request method-get">GET</span> user/$user_id
        </li>
        <li class="active">
          <span class="method-request method-post">POST</span> user/$user_id
        </li>
        <li>
          <span class="method-request method-get">GET</span> user/$user_id/edit
        </li>
        <li>
          <span class="method-request method-get">GET</span>
          user/$user_id/delete/user/$user_id/delete/user/$user_id/delete
        </li>
        <li>
          <span class="method-request method-get">GET</span> users
        </li>
        <li>
          <span class="method-request method-get">GET</span> user/$user_id
        </li>
        <li>
          <span class="method-request method-get">GET</span> user/$user_id
        </li>
        <li>
          <span class="method-request method-post">POST</span> user/$user_id
        </li>
        <li>
          <span class="method-request method-get">GET</span> users
        </li>
        <li>
          <span class="method-request method-get">GET</span> user/$user_id
        </li>
        <li>
          <span class="method-request method-post">POST</span> user/$user_id
        </li>
        <li>
          <span class="method-request method-get">GET</span> users
        </li>
        <li>
          <span class="method-request method-get">GET</span> user/$user_id
        </li>
        <li>
          <span class="method-request method-post">POST</span> user/$user_id
        </li>
        <li>
          <span class="method-request method-get">GET</span> user/$user_id/edit
        </li>
      </ul>
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
    </div>
    <div class="container pt-3">
      <div class="row justify-content-center">
        <div class="col-md-12">
          <div class="pb-1 mb-2 my-breadcrumb">
            <span>{{project}}</span>
            <svg width="0.6em" height="0.6em" viewBox="0 0 16 16" class="bi bi-caret-right-fill" fill="currentColor"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
            </svg>
            <span>{{version}}</span>
            <svg width="0.6em" height="0.6em" viewBox="0 0 16 16" class="bi bi-caret-right-fill" fill="currentColor"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
            </svg>
            <span v-if="api_id !== 'new' && api_id === api.id">edit</span>
            <span v-else>new api</span>
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
                  <div class="input-group-text">/{{project}}/{{version}}/</div>
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
          {{sendString}}
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
              <tr v-for="(param, index) in params" :key="index">
                <td>
                  <select class="form-control" v-model="param.type">
                    <option value="GET">GET</option>
                    <option value="GET">POST</option>
                    <option value="GET">HEADER</option>
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

  class Api {
    constructor() {
      this.id = 0;
      this.slug = "users";
      this.description = "Mô tả Api users";
      this.request_type = "GET";
      this.response = "Nội dung cần trà về";
    }
  }

  class Param {
    constructor() {
      this.name = "username";
      this.description = "Mô tả username";
      this.type = "GET";
      this.removable = true;
      this.api_id = 0;
      this.required = true;
      this.validators = ['required']
    }
  }

  export default {
    //components: {VueJsonPretty},
    data() {
      return {
        project: this.$route.params.project,
        version: this.$route.params.version,
        api_id: this.$route.params.id,

        tab: "params",
        api: new Api(),
        params: [new Param(), new Param(), new Param()],

        sendString: ""
      }
    },
    mounted() {
    },
    methods: {
      save() {
        this.sendString = JSON.stringify({
          api: this.api,
          params: this.params,
          response: "",
        });

        let self = this;
        let sendData = {"version_id": this.version, "api": this.api, "params": this.params};
        this.$axios.post('http://localhost/mock_api/api/api/save', sendData).then(response => {
          if (response.data.status === "success") {
            console.log("Gọi API lưu thành công");
            console.log(response.data.data)
            //this.$router.push({name: 'blog-id', params: {id: response.data.data.id}});
          } else {
            console.log("Gọi API lưu bị lỗi");
            console.log(response.data.message)
          }
        }).catch(error => {
          alert("Lỗi lưu bài viết: " + error);
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
    padding: 10px;
    padding-right: 12px;
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
