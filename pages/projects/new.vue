<template>
  <div class="container mt-2">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="float-left">Create new project</h1>
        <button type="button" class="mt-2 btn btn-outline-dark col-6 col-md-1 float-right" @click="() => {$router.back()}">Back</button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 offset-md-2">

        <form>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="name"><strong>Project name</strong></label>
              <div class="input-group mb-2 mr-sm-2" :class="{nameError: (!name.available && name.notice !== ''), nameSuccess: name.available}">
                <input type="text" class="form-control" id="name" placeholder="a-zA-Z0-9_-" v-model="project.name"
                       @blur="validateName">
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span v-if="name.available" style="width: 15px; color: green">✓</span>
                    <span v-else style="width: 15px; cursor: pointer;" @click="() => {this.name.notice = ''}">×</span>
                  </div>
                </div>
              </div>
              <span class="form-text text-danger" v-if="name.notice !== ''">{{name.notice}}</span>
            </div>
            <div class="form-group col-md-6">
              <label for="version_name">First version name (optional)</label>
              <input type="text" class="form-control" id="version_name" placeholder="v1.0" v-model="first_version" @blur="validateVersion">
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
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        name: {available: false, notice: ''},
        project: {'id': 0, 'name': "", 'description': "", 'visibility': 0},
        first_version: ''
      }
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
      validateVersion() {
        this.first_version = this.stringToUrl(this.first_version)
      },
      validateName() {
        let str = this.project.name;
        if(str === '') {
          this.name.notice = ''
          this.name.available = false
          return;
        }
        str = this.stringToUrl(str)
        this.project.name = str;

        this.$axios.get('project_by_name/'+str).then(response => {
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
        if(this.project.description === '' || this.project.name === '' || this.project.visibility < 0) {
          this.$notify({
            group: 'notification',
            title: 'Error',
            type: 'error',
            duration: 5000,
            position: 'top right',
            text: "Please fill all fields"
          });
          return;
        }
        let sendData = {"project": this.project, "first_version": this.first_version}
        this.$axios.post('project/save', sendData).then(response => {
          if (response.data.status === "success") {
            this.$notify({
              group: 'notification',
              title: 'Done',
              type: 'success',
              duration: 5000,
              position: 'top right',
              text: 'Project saved'
            });
            this.$router.push({'name': 'projects-page', params: {page: '1'}})
          } else {
            this.$notify({
              group: 'notification',
              title: 'Error',
              type: 'error',
              duration: 5000,
              position: 'top right',
              text: "Save error: " + response.data.message
            });
          }
        }).catch(error => {
          this.$notify({
            group: 'notification',
            title: 'Error',
            type: 'error',
            duration: 5000,
            position: 'top right',
            text: "Save error: " + error
          });
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

</style>
