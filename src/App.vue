<template>
    <v-app>
        <div class="main-content">
            <router-view class="custom-content"></router-view>
        </div>

        <Menu></Menu>
    </v-app>
</template>

<script>
import Menu from '@/components/ComponentMenu';

export default {
    components: {
        Menu
    }
};
</script>

<style>
.main-content {
    padding: 30px;
    padding-left: 90px;
    background-color: rgb(245, 245, 245);
    width: 100%;
    height: 100%;
}
.custom-content {
    margin-top: 30px;
}

@media (max-width: 1263px) {
    .main-content {
        padding-left: 30px;
    }
}
</style>
