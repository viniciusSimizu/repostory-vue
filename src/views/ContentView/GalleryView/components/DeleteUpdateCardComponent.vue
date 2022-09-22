<script setup></script>
<template>
    <div class="py-2 d-flex justify-content-end gap-2">
        <button class="card-button btn btn-outline-warning">Update</button>
        <button
            class="card-button btn btn-outline-danger"
            @click="this.$emit('deleteRepository')"
        >
            Delete
        </button>
    </div>
</template>
