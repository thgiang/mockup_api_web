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
    <strong class="sidebar-label">API(s)</strong>
    <ul class="api-list">
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
      <li>
        <span class="method-request method-get">GET</span> user/$user_id/delete/user/$user_id/delete/user/$user_id/delete
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
      <li>
        <span class="method-request method-get">GET</span> user/$user_id/delete
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
  </div>
  <div class="container pt-3">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="pb-1 mb-2 my-breadcrumb">
          <span>{{project}}</span>
          <svg width="0.5em" height="0.5em" viewBox="0 0 16 16" class="bi bi-caret-right" fill="currentColor"
               xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M6 12.796L11.481 8 6 3.204v9.592zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
          </svg>
          <span>{{version}}</span>
        </div>
        <form class="form-inline">
          <label class="sr-only" for="request_type">Request type</label>
          <select name="request_type" id="request_type" class="form-control mb-2 mr-sm-2">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
          </select>

          <label class="sr-only" for="slug">Username</label>
          <div class="input-group mb-2 mr-sm-2">
            <div class="input-group-prepend">
              <div class="input-group-text">https://localhost:8000/api/moshop-web/v1.0/</div>
            </div>
            <input type="text" class="form-control" id="slug" style="width: 685px; max-width: 100%"
                   placeholder="your_url/$param_on_url/blah">
          </div>
          <button type="submit" class="btn btn-success mb-2">Save</button>
          <textarea class="form-control col-12" placeholder="Detail description of this API"></textarea>
        </form>
        <div class="pt-3">
          <ul class="api-tabs">
            <li @click="()=>{tab = 'params'}" :class="{active: tab === 'params'}">Params</li>
            <li @click="()=>{tab = 'response'}" :class="{active: tab === 'response'}">Response</li>
          </ul>
        </div>
        <div class="" v-if="tab === 'response'">
          <textarea rows="4" class="form-control" placeholder="Response content"></textarea>
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
            <tr>
              <td>
                <select class="form-control" value="">
                  <option value="GET">GET</option>
                  <option value="GET">POST</option>
                  <option value="GET">HEADER</option>
                </select>
              </td>
              <td>
                <input class="form-control" value="" placeholder="Parameter name a-zA-Z0-9_-"/>
              </td>
              <td>
                <input class="form-control" value="" placeholder="Description for this field"/>
              </td>
              <td>
                                <textarea class="form-control" value="" rows="1"
                                          placeholder="Type validator name. Ex: numeric|password "></textarea>
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
  class Api {
    constructor() {
      this.slug = "";
      this.description = "";
      this.version_id = 0;
      this.request_type = "GET";
      this.response = "";
    }
  }
  class Param {
    constructor() {
      this.name = "";
      this.description = 0;
      this.type = "GET";
      this.removable = true;
      this.api_id = 0;
      this.required = true;
      this.validators = ['required']
    }
  }
  export default {
    data() {
      return {
        project: this.$route.params.project,
        version: this.$route.params.version,
        api_id: this.$route.params.id,

        tab: "params",
        params: [],
        response: ""
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
    border-right: 1px solid #d8d8d8;
  }
  .sidebar-label {
    background: #f3f3f3;
    text-transform: uppercase;
    font-size: 13px;
    width: 100%;
    display: block;
    color: #6b6b6b;
    padding: 10px;
    border-bottom: 1px solid #069255;
  }
  .api-version-selector {
  }
  .api-list {
    list-style: none;
    padding: 0;
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
  .api-list li:hover{
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
  .method-get {
    background: #069255;
    color: #FFF;
  }

  .method-post {
    background: #ffbc00;
    color: #555;
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
