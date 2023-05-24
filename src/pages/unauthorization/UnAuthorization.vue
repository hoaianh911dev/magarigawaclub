<template>
    <img src="/img/401.jpg" class="w-full"/>

    <div class="group-button mb-30">
        <button @click="$router.push(PATH.login.url)">Login</button>
    </div>

</template>

<script lang="ts">

import { PATH } from '../../constants/path'
export default {
    data() {
        return {
            PATH: PATH
        }
    },
}
</script>