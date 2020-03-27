<template>
    <nav>        
        <v-app-bar app flat>
            <v-app-bar-nav-icon class="grey--text" @click="isNavDrawerVisible = !isNavDrawerVisible">
            </v-app-bar-nav-icon>

            <v-toolbar-title class="text-uppercase grey--text">
                <span class="font-weight-light">Todo</span>
                <span>BRImage</span>
            </v-toolbar-title>
        </v-app-bar>

        <v-navigation-drawer app v-model="isNavDrawerVisible">
            <v-list>
                <v-list-item v-for="link in navDrawerLinks" :key="link.text" router :to="link.route">
                    <v-list-item-icon>
                        <v-icon>{{ link.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ link.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            isNavDrawerVisible: false,
            navDrawerLinks: [
                { icon: 'dashboard', title: 'Dashboard', route: '/' },
                { icon: 'image', title: 'Library', route: '/library' },
                { icon: 'help', title: 'Help', route: '/help' }
            ]
        }
    }
    
}
</script>