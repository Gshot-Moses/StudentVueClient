<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h3 class="mb-4">Welcome back {{ store.currentUser.name }}</h3>
                <div class="card">
                    <div class="card-body">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td>Name:</td>
                                    <td>{{ store.currentUser.name }}</td>
                                </tr>
                                <tr>
                                    <td>Phone Number:</td>
                                    <td>{{ store.currentUser.phoneNumber }}</td>
                                </tr>
                                <tr>
                                    <td>Age:</td>
                                    <td>{{ store.currentUser.age }}</td>
                                </tr>
                                <tr>
                                    <td>Class:</td>
                                    <td>{{ store.currentUser.class }}</td>
                                </tr>
                                <tr>
                                    <td>Gender:</td>
                                    <td>{{ store.currentUser.gender }}</td>
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
    import { useStateStore } from '../stores/state.js'

    export default {
        data() {
            return {
                store: useStateStore()
            }
        }
    }
</script>