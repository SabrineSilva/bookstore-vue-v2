<template>
    <div id="inspire">
        <v-app-bar color="primary" dark app>
            <v-app-bar-nav-icon
                class="icone-sidebar2"
                icon
                @click="toggleDrawer"
                style="color: rgb(255, 255, 255)"
            ></v-app-bar-nav-icon>
        </v-app-bar>

        <v-navigation-drawer class="sidebar" v-model="drawer" :mini-variant.sync="mini" app>
            <v-list>
                <v-list-item>
                    <div class="iconesidebar2">
                        <v-app-bar-nav-icon
                            class="icone-sidebar"
                            icon
                            @click.stop="mini = !mini"
                            style="color: rgb(255, 255, 255)"
                        >
                        </v-app-bar-nav-icon>
                    </div>
                    <v-list-item-content>
                        <v-list-item-title class="text-h6 headersidebar">
                            <img class="logo" src="@/assets/Img/LogoWhiteColorful.png" />
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item v-for="item in menuItems" :key="item.title" :to="item.path" link>
                    <v-list-item-icon>
                        <v-icon class="sidebaricon" style="font-size: 20px; color: #5ca8e6">
                            {{ item.icon }}
                        </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="sidebartext">
                            {{ item.title }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<style lang="css">
@import '@/assets/styles/SidebarMenu.css';
</style>

<script>
export default {
    data() {
        return {
            drawer: null,
            menuItems: [
                { title: 'Dashboard', path: '/', icon: 'mdi-view-dashboard-outline ' },
                { title: 'Aluguéis', path: '/Rental', icon: 'mdi-book-search-outline' },
                { title: 'Livros', path: '/Book', icon: 'mdi-book' },
                { title: 'Clientes', path: '/User', icon: 'mdi-account' },
                { title: 'Editoras', path: '/Publisher', icon: 'mdi-home-city-outline' }
            ],
            mini: true
        };
    },
    methods: {
        toggleDrawer() {
            this.mini = false;
            this.drawer = !this.drawer;
        }
    }
};
</script>
