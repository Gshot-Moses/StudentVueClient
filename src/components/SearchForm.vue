<template>
    <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search..." v-model="query">
        <div class="input-group-append">
            <button class="btn btn-outline-success" type="button" v-on:click="$emit('onSearch', [query])">
                <i class="bi bi-search"></i>
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                query: ""
            }
        }
    }
</script>