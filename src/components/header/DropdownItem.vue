<template>
    <li class="nav-link text-white">
        <router-link :to="to">
            {{ nameItem }}
        </router-link>
    </li>
</template>
<script lang="ts">
export default {
    props: {
        nameItem: String,
        to: String
    }
}
</script>