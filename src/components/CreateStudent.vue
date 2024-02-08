<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <h5 class="mb-3">{{ store.isEditing ? 'Edit' : 'Create' }} Student</h5>
                <div class="card">
                    <div class="card-body">
                        <form v-on:submit.prevent="submitForm">
                            <div class="form-group row mb-3">
                                <label for="name" class="col-sm-2 col-form-label">Name: </label>
                                <div class="col-sm-10">
                                    <input v-model="store.studentEdited.name" placeholder="Name" type="text" class="form-control" id="name" name="name" required>
                                </div>
                            </div>
                            <div class="form-group row mb-3">
                                <label for="phone" class="col-sm-2 col-form-label">Phone number:</label>
                                <div class="col-sm-10">
                                    <input v-model="store.studentEdited.phoneNumber" type="text" class="form-control" id="phoneNumber" name="phoneNumber" placeholder="Phone number" required>
                                </div>
                            </div>
                            <div class="form-group row mb-3">
                                <label for="age" class="col-sm-2 col-form-label">Age:</label>
                                <div class="col-sm-10">
                                    <input v-model="store.studentEdited.age" type="number" class="form-control" id="age" name="age" placeholder="Age" required>
                                </div>
                            </div>
                            <div class="form-group row mb-3">
                                <label class="col-sm-2 col-form-label" for="class">Class: </label>
                                <div class="col-sm-10">
                                    <input v-model="store.studentEdited.class_" type="text" class="form-control" id="class" name="class" placeholder="Class">
                                </div>
                            </div>
                            <div class="form-group row mb-3">
                            <label for="gender" class="col-sm-2 col-form-label">Gender:</label>
                            <div class="col-sm-10">
                                <select class="form-group" v-model="store.studentEdited.gender">
                                    <option v-for="(gender, index) in store.genders" :key="index" :value="gender">{{ gender }}</option>
                                </select>
                            </div>
                            </div>
                            <div class="form-group row mb-3">
                                <label for="password" class="col-sm-2 col-form-label">Password:</label>
                                <div class="col-sm-10">
                                    <input v-model="store.studentEdited.password" type="password" class="form-control" id="password" placeholder="Password">
                                </div>
                            </div>
                            <div class="form-group row mt-3">
                            <div class="col-sm-10 offset-sm-2 text-center">
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
                <CircularProgressIndicator v-show="store.isLoading" class="mt-2"/>
                <p class="mt-3" v-if="store.error">{{ store.error }}</p>
            </div>
        </div>
    </div>                
</template>

<script>
    import { useStateStore } from '../stores/state.js'
    import CircularProgressIndicator from './CircularProgressIndicator.vue'

    export default {
        components: {
            CircularProgressIndicator
        },

        data() {
            return {
                store: useStateStore(),
            }
        },

        methods: {
            submitForm() {
                if (this.store.isEditing) {
                    this.store.editStudent(() => {
                        this.$router.go(-1)
                    })
                } else {
                    this.store.createStudent(() => {
                        this.$router.go(-1)
                    })
                }
            }
        }
    }
</script>