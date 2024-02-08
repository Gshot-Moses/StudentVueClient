<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="d-flex justify-content-start">
                <button class="btn btn-success mb-4" v-on:click="navigateToCreateStudent">Add Student</button>
            </div>
            <button v-show="store.searchMode" type="button" class="btn btn-primary mb-3" v-on:click="exitSearchMode">
                <i class="bi bi-arrow-left"></i>
            </button>
            <div class="col d-flex justify-content-end">
                <SearchForm v-on:onSearch="onSearch"/>
            </div>
            <CircularProgressIndicator v-show="store.isLoading" class="mt-2"/>
          <div class="text-center" v-if="store.error">
            <p>{{ store.error }}</p>
          </div>
          <div class="card mb-2" v-else v-for="(student, index) in students" :key="index">
            <div class="card-body">
                <div class="row mb-2">
                    <div class="col-6">
                        <p>{{ student.name }}</p>
                        <p>{{ student.phoneNumber }}</p>
                    </div>
                    <div class="col-6">
                        <div class="text-right">
                            <div class="btn-group">
                                <button type="button" class="btn btn-primary" v-on:click="editStudent(student)">Edit</button>
                                <button type="button" 
                                    :class="['btn', student.status ? 'btn-warning' : 'btn-success']"  
                                    v-on:click="toggleStudentStatus(student._id, student.status)">
                                    {{ student.status ? 'Disable' : 'Enable' }}
                                </button>
                                <button type="button" class="btn btn-danger" v-on:click="deleteStudent(student._id)">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
          </div>
          <p class="mt-3 text-center" v-if="store.searchMode && students.length === 0">Sorry no record matches your query</p>
        </div>
      </div>
    </div>
  </template>

<script>
    import { useStateStore } from '../stores/state.js'
    import SearchForm from './SearchForm.vue'
    import CircularProgressIndicator from './CircularProgressIndicator.vue'

    export default {
        components: {
            SearchForm,
            CircularProgressIndicator
        },

        data() {
            return {
                store: useStateStore()
            }
        },

        mounted() {
            this.store.getStudents(() => {
            })
            
        },

        computed: {
            students() {
                if (this.store.searchMode) {
                    return this.store.searchResults
                } else {
                    return this.store.students
                }
            }
        },

        methods: {
            navigateToCreateStudent() {
                this.store.enterCreationMode(() => {
                    this.$router.push('/new')
                })
            },

            editStudent(student) {
                this.store.enterEditMode(student, () => {
                    console.log(student)
                    this.$router.push('/new')
                })
            },

            deleteStudent(id) {
                this.store.deleteStudent(id)
            },

            toggleStudentStatus(id, status) {
                this.store.toggleStudentStatus(id, status)
            },

            onSearch(query) {
                console.log(query)
                this.store.search(query[0])
            },

            exitSearchMode() {
                this.store.exitSearchMode()
            }
        }
    }
</script>