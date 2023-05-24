<template>
    <img src="/img/401.jpg"/>

    <div class="group-button">
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