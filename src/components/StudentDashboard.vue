<template>
    <div class="container">
        <div class="row justify-content-center">
            <h3 class="mb-4">Welcome back {{ store.currentUser.name }}</h3>
             <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                    <div class="row">
                        <div class="col-6">
                            <p class="mb-0">Name:</p>
                            <p class="mb-0">Phone Number:</p>
                            <p class="mb-0">Age:</p>
                            <p class="mb-0">Class:</p>
                            <p class="mb-0">Gender:</p>
                        </div>
                        <div class="col-6">
                            <p class="mb-0">{{ store.currentUser.name }}</p>
                            <p class="mb-0">{{ store.currentUser.phoneNumber }}</p>
                            <p class="mb-0">{{ store.currentUser.age }}</p>
                            <p class="mb-0">{{ store.currentUser.class }}</p>
                            <p class="mb-0">{{ store.currentUser.gender }}</p>
                        </div>
                    </div>
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