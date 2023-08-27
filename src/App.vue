<template>
  <v-app>
    <v-main class="main">
      <v-container>
        <Menu></Menu>
        <router-view></router-view>
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
import Menu from '@/components/ComponentMenu';

export default {
  components: {
    Menu
  },
};
</script>

<style>
.main {
  background-color: rgb(245, 245, 245);
}

</style>