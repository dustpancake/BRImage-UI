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
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon>dashboard</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Dashboard</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            isNavDrawerVisible: false
        }
    }
    
}
</script>