<script>
  import { useStateStore } from '../stores/state.js'
  import CircularProgressIndicator from './CircularProgressIndicator.vue'

  export default {
    components: {
      CircularProgressIndicator,
    },

    data() {
      return {
        number: "",
        password: "",
        store: useStateStore()
      }
    },
    methods: {
      submitForm() {
        this.store.authenticate(this.number, this.password, () => {
          if (this.store.currentUserRole === 'Student') {
            this.$router.push('/student')
          } else {
            this.$router.push('/admin')
          }
        })
      }
    }
  }
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h3 class="mb-5">Authenticate to have access to your console</h3>
        <div class="card">
          <div class="card-body">
            <form v-on:submit.prevent="submitForm">
              <div class="form-group row">
                <label for="phoneNumber" class="col-sm-2 col-form-label">Phone</label>
                <div class="col-sm-10">
                  <input v-model="number" type="text" class="form-control" id="phoneNumber" placeholder="Phone number" required>
                </div>
              </div>
              <div class="form-group row mt-3">
                <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                  <input v-model="password" type="password" class="form-control" id="inputPassword3" placeholder="Password" required>
                </div>
              </div>
              <div class="form-group row mt-3">
                <div class="col-sm-10 offset-sm-2 text-center">
                  <button type="submit" class="btn btn-primary">Sign in</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <CircularProgressIndicator v-show="store.isLoading" class="mt-5"/>
  <p v-if="store.error" class="text-center mt-4">{{ store.error }}</p>
</template>

<style scoped>

</style>


<style scoped>
  
</style>
